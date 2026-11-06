import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const ROOT = path.resolve(import.meta.dirname, '..')

const SCAN_ROOTS = ['components', 'src', 'lib']

/**
 * Unsupported claims from the 2026-11-06 inventory that this change removes.
 * A match is a failure. Wording that only tells the model not to say these
 * things is kept out of this list on purpose.
 */
const FORBIDDEN = [
  'originalPrice',
  'salePrice',
  'spotsLeft',
  'expiresIn',
  'spots left',
  'Limited-Time',
  'unbeatable',
  '$347',
  '50% Off',
  'LIVE DEAL',
  'InStock',
  'Real-time price',
  'live deal',
  'real-time price',
  'cheapest available',
  'typical cost for this route',
  'two free checked bags',
  'two free bags',
  'bags included',
  'Exclusive subscriber-only',
  '500+ airlines',
  'never overpay',
  'price drop alerts',
  'act fast!',
]

function sourceFiles(dir: string): string[] {
  const found: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    const info = statSync(full)
    if (info.isDirectory()) {
      if (entry === 'node_modules' || entry === '.next') continue
      found.push(...sourceFiles(full))
      continue
    }
    if (/\.(ts|tsx|js|jsx|md)$/.test(entry)) found.push(full)
  }
  return found
}

test('unsupported package, scarcity, live-fare, and bag claims are gone', () => {
  assert.equal(existsSync(path.join(ROOT, 'components/DealsSection.tsx')), false)
  const hits: string[] = []
  for (const root of SCAN_ROOTS) {
    for (const file of sourceFiles(path.join(ROOT, root))) {
      const text = readFileSync(file, 'utf8')
      const lines = text.split('\n')
      lines.forEach((line, index) => {
        for (const phrase of FORBIDDEN) {
          if (line.includes(phrase)) {
            hits.push(`${path.relative(ROOT, file)}:${index + 1}: ${phrase}`)
          }
        }
      })
    }
  }
  assert.deepEqual(hits, [])
})

test('monthly samples are labelled indicative', () => {
  const files = [
    'lib/flights.ts',
    'src/components/LiveFaresSection.tsx',
    'src/components/CheapestDatesSection.tsx',
    'src/app/api/gemini/route.ts',
  ]
  for (const file of files) {
    const text = readFileSync(path.join(ROOT, file), 'utf8')
    assert.match(text, /[Ii]ndicative/, file)
    assert.equal(text.includes('LIVE DEAL'), false, file)
    assert.equal(text.includes('InStock'), false, file)
  }
})
