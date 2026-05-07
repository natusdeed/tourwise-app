type Column = { key: string; label: string; align?: 'left' | 'center' | 'right' }

type Props = {
  title?: string
  columns: Column[]
  rows: Record<string, string | number | boolean | null | undefined>[]
  caption?: string
}

export default function ComparisonTable({ title, columns, rows, caption }: Props) {
  return (
    <div className="glass-strong border border-neon-cyan/20 rounded-xl overflow-hidden">
      {title ? (
        <div className="px-4 py-3 border-b border-white/10">
          <h3 className="text-base md:text-lg font-semibold text-white heading-robotic">
            {title}
          </h3>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white/85">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="bg-white/5 text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3 font-semibold ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row, idx) => (
              <tr key={idx} className="even:bg-white/[0.03]">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 align-top ${
                      col.align === 'right'
                        ? 'text-right'
                        : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                    }`}
                  >
                    {formatCell(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatCell(value: string | number | boolean | null | undefined) {
  if (value === true) return <span className="text-neon-cyan font-medium">Yes</span>
  if (value === false) return <span className="text-white/40">No</span>
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}
