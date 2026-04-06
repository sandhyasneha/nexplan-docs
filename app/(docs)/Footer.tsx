export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #E5E9F2', padding: '1.5rem 3rem', background: '#FAFBFF' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', margin: 0 }}>
          © 2026 NexPlan · AI-Powered IT Project Management
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="https://nexplan.io" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.8125rem', color: '#0057FF', textDecoration: 'none', fontWeight: 500 }}>
            nexplan.io
          </a>
          <a href="https://www.youtube.com/@Nexplan-PM" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.8125rem', color: '#FF0000', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
          <a href="mailto:info@nexplan.io"
            style={{ fontSize: '0.8125rem', color: '#9CA3AF', textDecoration: 'none' }}>
            info@nexplan.io
          </a>
        </div>
      </div>
    </footer>
  )
}
