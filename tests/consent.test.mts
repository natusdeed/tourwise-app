import assert from 'node:assert/strict'
import test from 'node:test'
import vm from 'node:vm'
import {
  CONSENT_BOOT_SCRIPT,
  nonEssentialFirstPartyCookieNames,
  parseConsentCookieHeader,
  parseConsentValue,
} from '../lib/consent.ts'

test('known consent values are kept', () => {
  assert.equal(parseConsentValue('accepted'), 'accepted')
  assert.equal(parseConsentValue('declined'), 'declined')
  assert.equal(parseConsentCookieHeader('tourwise_consent=accepted'), 'accepted')
  assert.equal(parseConsentCookieHeader('other=1; tourwise_consent=declined'), 'declined')
})

test('a malformed consent cookie is no choice and does not throw', () => {
  for (const raw of ['%', '%ZZ', '%E0%A4%A', 'accepted%', '100%']) {
    assert.doesNotThrow(() => parseConsentValue(raw))
    assert.equal(parseConsentValue(raw), null)
    assert.equal(parseConsentCookieHeader(`tourwise_consent=${raw}`), null)
    assert.equal(parseConsentCookieHeader(`a=1; tourwise_consent=${raw}; b=2`), null)
  }
})

test('an unknown consent value is no choice', () => {
  for (const raw of ['', 'yes', 'Accepted', 'rejected', '1']) {
    assert.equal(parseConsentValue(raw), null)
  }
  assert.equal(parseConsentValue(undefined), null)
  assert.equal(parseConsentCookieHeader(''), null)
  assert.equal(parseConsentCookieHeader('tourwise_consent='), null)
  assert.equal(parseConsentCookieHeader('unrelated=accepted'), null)
})

test('the head script hides only a known choice and survives a stray percent', () => {
  function boot(cookie: string) {
    const document = {
      cookie,
      documentElement: {
        attrs: {} as Record<string, string>,
        setAttribute(name: string, value: string) {
          this.attrs[name] = value
        },
      },
    }
    vm.runInNewContext(CONSENT_BOOT_SCRIPT, { document })
    return document.documentElement.attrs['data-consent'] ?? null
  }

  assert.equal(boot('tourwise_consent=accepted'), '1')
  assert.equal(boot('tourwise_consent=declined'), '1')
  assert.equal(boot('tourwise_consent=%'), null)
  assert.equal(boot('tourwise_consent=%ZZ'), null)
  assert.equal(boot('tourwise_consent=yes'), null)
  assert.equal(boot(''), null)
  assert.doesNotThrow(() => boot('tourwise_consent=%'))
})

test('clearing non-essential cookies keeps the consent choice', () => {
  assert.deepEqual(
    nonEssentialFirstPartyCookieNames('tourwise_consent=accepted; tp_session=1; other=2'),
    ['tp_session', 'other'],
  )
  assert.deepEqual(nonEssentialFirstPartyCookieNames('tourwise_consent=declined'), [])
  assert.deepEqual(nonEssentialFirstPartyCookieNames(''), [])
})
