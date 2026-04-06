'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { docsNav } from '@/lib/docs-nav'
import Footer from './Footer'


function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  return (
    <div style={{
      width: '260px', minWidth: '260px',
      height: 'calc(100vh - 60px)',
      position: 'sticky', top: '60px',
      overflowY: 'auto',
      background: '#FAFBFF',
      borderRight: '1px solid #E5E9F2',
      padding: '1.25rem 0.875rem',
      flexShrink: 0,
    }}>
      {docsNav.map((section) => (
        <div key={section.section} style={{ marginBottom: '1.25rem' }}>
          <p style={{
            fontSize: '0.625rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#9CA3AF', marginBottom: '0.4rem',
            paddingLeft: '0.5rem', margin: '0 0 0.4rem 0',
          }}>
            {section.section}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0 0' }}>
            {section.items.map((item) => {
              const active = pathname === `/docs/${item.slug}`
              return (
                <li key={item.slug}>
                  <Link href={`/docs/${item.slug}`} onClick={onClose} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.3rem 0.5rem', borderRadius: '6px',
                    fontSize: '0.8rem', fontWeight: active ? 600 : 400,
                    color: active ? '#0057FF' : '#4B5563',
                    background: active ? '#E8F0FF' : 'transparent',
                    textDecoration: 'none',
                  }}>
                    <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>{item.icon}</span>
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
       </div>
      <Footer/>
    </div>
    )
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const searchResults = searchQ.length > 1
    ? docsNav.flatMap(s => s.items).filter(i =>
        i.title.toLowerCase().includes(searchQ.toLowerCase())
      ).slice(0, 8)
    : []

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* TOP NAV */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#ffffff',
        borderBottom: '1px solid #E5E9F2',
        height: '60px',
        display: 'flex', alignItems: 'center',
        padding: '0 1.5rem', gap: '1rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#4B5563', display: 'none' }}
          className="mobile-ham">
          ☰
        </button>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #0057FF, #3B82F6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 15,
          }}>N</div>
          <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#0A0F1E' }}>
            Nex<span style={{ color: '#0057FF' }}>Plan</span>
          </span>
          <span style={{
            fontSize: '0.6875rem', color: '#9CA3AF',
            paddingLeft: '0.5rem', marginLeft: '0.25rem',
            borderLeft: '1px solid #E5E9F2',
          }}>Docs</span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
          {['NexPlan IT Infra PM', 'Resources'].map(label => (
            <span key={label} style={{
              fontSize: '0.8375rem', fontWeight: 500, color: '#374151',
              padding: '0.375rem 0.75rem', borderRadius: '6px', cursor: 'pointer',
            }}>{label}</span>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>

          {/* Search button */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setSearchOpen(v => !v)} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 0.875rem',
              border: '1px solid #E5E9F2', borderRadius: '8px',
              background: '#F8FAFF', cursor: 'pointer',
              fontSize: '0.8rem', color: '#9CA3AF', minWidth: '180px',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Search docs...
              <span style={{ marginLeft: 'auto', fontSize: '0.625rem', background: '#E5E9F2', padding: '0.125rem 0.375rem', borderRadius: '4px', color: '#6B7280' }}>⌘K</span>
            </button>

            {/* Search dropdown */}
            {searchOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                width: '320px', background: '#fff',
                border: '1px solid #E5E9F2', borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)', zIndex: 100, overflow: 'hidden',
              }}>
                <div style={{ padding: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
                  <input autoFocus value={searchQ} onChange={e => setSearchQ(e.target.value)}
                    placeholder="Search documentation..."
                    style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.875rem', color: '#0A0F1E', background: 'transparent' }}
                  />
                </div>
                <div>
                  {searchQ.length > 1 ? (
                    searchResults.length === 0
                      ? <p style={{ padding: '1rem', fontSize: '0.8125rem', color: '#9CA3AF', textAlign: 'center' }}>No results</p>
                      : searchResults.map(item => (
                          <Link key={item.slug} href={`/docs/${item.slug}`}
                            onClick={() => { setSearchOpen(false); setSearchQ('') }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.875rem', textDecoration: 'none', color: '#0A0F1E', fontSize: '0.8125rem', fontWeight: 500, borderBottom: '1px solid #F9FAFB' }}>
                            <span>{item.icon}</span>{item.title}
                          </Link>
                        ))
                  ) : (
                    <div style={{ padding: '0.75rem' }}>
                      <p style={{ fontSize: '0.625rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Quick Links</p>
                      {docsNav[0].items.slice(0, 4).map(item => (
                        <Link key={item.slug} href={`/docs/${item.slug}`} onClick={() => setSearchOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.25rem', textDecoration: 'none', color: '#4B5563', fontSize: '0.8125rem' }}>
                          <span>{item.icon}</span>{item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <a href="https://nexplan.io" target="_blank" rel="noopener noreferrer" style={{
            padding: '0.4rem 1rem', borderRadius: '8px',
            background: '#0057FF', color: '#fff',
            fontSize: '0.8125rem', fontWeight: 600,
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            Open App →
          </a>
        </div>
      </header>

      {/* Search backdrop */}
      {searchOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setSearchOpen(false)} />}

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.4)' }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: 'fixed', left: 0, top: '60px', bottom: 0, zIndex: 45, overflowY: 'auto', background: '#FAFBFF', width: '260px', boxShadow: '4px 0 16px rgba(0,0,0,0.1)' }}>
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* BODY */}
      <div style={{ display: 'flex' }}>
        {/* Sidebar — always visible on desktop */}
        <Sidebar />

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0, padding: '2.5rem 3rem', maxWidth: '800px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
