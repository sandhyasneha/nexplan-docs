import { docsContent, docsContentExtra, docsContentOrg, docsContentIA } from '@/lib/docs-content'
import { docsNav } from '@/lib/docs-nav'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [...docsContent, ...docsContentExtra, ...docsContentOrg, ...docsContentIA].map(doc => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const allDocs = [...docsContent, ...docsContentExtra, ...docsContentOrg, ...docsContentIA]
  const doc = allDocs.find(d => d.slug === params.slug)
  if (!doc) return {}
  return {
    title: `${doc.title} — NexPlan Docs`,
    description: doc.description,
  }
}

function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>)
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} style={{ borderLeft: '3px solid #0057FF', paddingLeft: '1rem', margin: '1rem 0', color: '#4B5563', fontStyle: 'italic' }}>
          {line.slice(2)}
        </blockquote>
      )
    } else if (line.startsWith('<div class="callout">')) {
      // Find closing div
      let j = i
      let calloutLines = []
      while (j < lines.length && !lines[j].includes('</div>')) {
        calloutLines.push(lines[j])
        j++
      }
      const text = calloutLines.join(' ').replace(/<[^>]+>/g, '').replace(/p>/g, '')
      elements.push(
        <div key={i} style={{
          background: '#E8F0FF', borderLeft: '3px solid #0057FF',
          borderRadius: '0 8px 8px 0', padding: '0.875rem 1.125rem', margin: '1.5rem 0'
        }}>
          <p style={{ margin: 0, color: '#003DB3', fontSize: '0.875rem' }} dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      )
      i = j
    } else if (line.startsWith('- ')) {
      // Collect list items
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ margin: '0.75rem 0 1rem', padding: 0, listStyle: 'none' }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginBottom: '0.375rem', color: '#4B5563', fontSize: '0.9375rem', lineHeight: 1.7 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#0057FF', flexShrink: 0, marginTop: '0.6rem' }} />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      )
      continue
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} style={{ margin: '0.75rem 0 1rem', paddingLeft: '1.5rem' }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ color: '#4B5563', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '0.375rem' }}>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ol>
      )
      continue
    } else if (line.startsWith('| ')) {
      // Table
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        if (!lines[i].includes('---')) {
          rows.push(lines[i].split('|').filter(c => c.trim()).map(c => c.trim()))
        }
        i++
      }
      elements.push(
        <div key={`table-${i}`} style={{ overflowX: 'auto', margin: '1rem 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                {rows[0]?.map((cell, ci) => (
                  <th key={ci} style={{ textAlign: 'left', padding: '0.625rem 1rem', background: '#F8FAFF', borderBottom: '2px solid #E5E9F2', color: '#0A0F1E', fontWeight: 600 }}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.625rem 1rem', color: '#4B5563' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    } else if (line.trim() === '') {
      // skip empty
    } else {
      elements.push(
        <p key={i} style={{ color: '#4B5563', lineHeight: 1.75, marginBottom: '0.875rem', fontSize: '0.9375rem' }}
          dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      )
    }
    i++
  }

  return elements
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#0A0F1E;font-weight:600">$1</strong>')
    .replace(/`(.+?)`/g, '<code style="font-family:monospace;font-size:0.8125rem;background:#E8F0FF;color:#003DB3;padding:0.125rem 0.375rem;border-radius:4px">$1</code>')
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const allDocs = [...docsContent, ...docsContentExtra, ...docsContentOrg, ...docsContentIA]
  const doc = allDocs.find(d => d.slug === params.slug)
  if (!doc) notFound()

  // Find prev/next
  const allItems = docsNav.flatMap(s => s.items)
  const currentIdx = allItems.findIndex(i => i.slug === params.slug)
  const prev = currentIdx > 0 ? allItems[currentIdx - 1] : null
  const next = currentIdx < allItems.length - 1 ? allItems[currentIdx + 1] : null

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.5rem', fontSize: '0.8125rem', color: '#9CA3AF' }}>
        <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none', hover: { color: '#0057FF' } }}>Docs</Link>
        <span>/</span>
        <span style={{ color: '#4B5563' }}>{doc.title}</span>
      </div>

      {/* Role badges */}
      {doc.roles && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {doc.roles.map(role => (
            <span key={role} style={{
              fontSize: '0.6875rem', fontWeight: 600, padding: '0.2rem 0.625rem',
              borderRadius: '999px', background: role === 'Admin' ? '#FEF3C7' : role === 'Pro' ? '#E8F0FF' : '#F0FDF4',
              color: role === 'Admin' ? '#92400E' : role === 'Pro' ? '#0057FF' : '#166534',
              border: `1px solid ${role === 'Admin' ? '#FDE68A' : role === 'Pro' ? '#BFDBFE' : '#BBF7D0'}`,
            }}>
              {role}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.25rem', fontWeight: 400, color: '#0A0F1E', marginBottom: '0.5rem', lineHeight: 1.2 }}>
        {doc.title}
      </h1>
      <p style={{ fontSize: '1rem', color: '#6B7280', marginBottom: '2.5rem', lineHeight: 1.6 }}>
        {doc.description}
      </p>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #E5E9F2', marginBottom: '2rem' }} />

      {/* Content */}
      <div style={{ maxWidth: '720px' }}>
        {renderContent(doc.content)}
      </div>

      {/* Prev / Next */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #E5E9F2' }}>
        {prev ? (
          <Link href={`/docs/${prev.slug}`} style={{
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.875rem 1.25rem', border: '1px solid #E5E9F2',
            borderRadius: '12px', textDecoration: 'none', color: '#0A0F1E',
            fontSize: '0.875rem', fontWeight: 500, flex: 1, maxWidth: '240px',
          }}>
            <span style={{ color: '#9CA3AF' }}>←</span>
            <div>
              <p style={{ fontSize: '0.6875rem', color: '#9CA3AF', marginBottom: '0.125rem' }}>Previous</p>
              <p style={{ margin: 0, fontWeight: 600 }}>{prev.title}</p>
            </div>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`/docs/${next.slug}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.625rem',
            padding: '0.875rem 1.25rem', border: '1px solid #E5E9F2',
            borderRadius: '12px', textDecoration: 'none', color: '#0A0F1E',
            fontSize: '0.875rem', fontWeight: 500, flex: 1, maxWidth: '240px',
            textAlign: 'right',
          }}>
            <div>
              <p style={{ fontSize: '0.6875rem', color: '#9CA3AF', marginBottom: '0.125rem' }}>Next</p>
              <p style={{ margin: 0, fontWeight: 600 }}>{next.title}</p>
            </div>
            <span style={{ color: '#9CA3AF' }}>→</span>
          </Link>
        ) : <div />}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: '#F8FAFF', borderRadius: '12px', border: '1px solid #E5E9F2' }}>
        <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0 }}>
          Was this page helpful? Send feedback to{' '}
          <a href="mailto:info@nexplan.io" style={{ color: '#0057FF', textDecoration: 'none', fontWeight: 500 }}>info@nexplan.io</a>
        </p>
      </div>
    </div>
  )
}
