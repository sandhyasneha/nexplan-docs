import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</p>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2rem', fontWeight: 400, color: '#0A0F1E', marginBottom: '0.75rem' }}>
        Page not found
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
        ThThis documentation page does not exist yet.
      </p>
      <Link href="/" style={{
        display: 'inline-block', padding: '0.625rem 1.5rem',
        background: '#0057FF', color: '#fff', borderRadius: '8px',
        textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600,
      }}>
        Back to Docs Home
      </Link>
    </div>
  )
}
