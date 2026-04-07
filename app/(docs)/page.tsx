import Link from 'next/link'
import { docsNav } from '@/lib/docs-nav'

export default function DocsHome() {
  const quickStart = [
    { title: 'What is NexPlan?', slug: 'what-is-nexplan', icon: '🚀', desc: 'Overview of the platform' },
    { title: 'How to Sign Up', slug: 'how-to-sign-up', icon: '✍️', desc: 'Create your account' },
    { title: 'Creating a Project', slug: 'creating-a-project', icon: '📁', desc: 'Start your first project' },
    { title: 'Kanban Board', slug: 'kanban-board', icon: '📋', desc: 'Understand the board' },
    { title: 'Infra Impact Analyzer', slug: 'infra-impact-analyzer', icon: '🔍', desc: 'AI change impact analysis' },
    { title: 'Installing PWA', slug: 'pwa-install', icon: '📱', desc: 'Install on your device' },
  ]

  return (
    <div className="max-w-4xl">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-600 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Documentation
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.75rem', fontWeight: 400, lineHeight: 1.15, color: '#0A0F1E', marginBottom: '1rem' }}>
          Welcome to NexPlan Docs
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#4B5563', lineHeight: 1.7, maxWidth: '600px' }}>
          Everything you need to know about using NexPlan — the AI-powered IT Project Management platform built for infrastructure teams.
        </p>
      </div>

      {/* Quick Start */}
      <div className="mb-12">
        <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '1rem' }}>
          Quick Start
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickStart.map((item) => (
            <Link key={item.slug} href={`/docs/${item.slug}`}
              className="group flex items-start gap-3 p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-150">
              <span className="text-2xl mt-0.5">{item.icon}</span>
              <div>
                <p className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All Sections */}
      <div>
        <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '1.5rem' }}>
          All Documentation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {docsNav.map((section) => (
            <div key={section.section}>
              <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0057FF', marginBottom: '0.75rem' }}>
                {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/docs/${item.slug}`}
                      className="flex items-center gap-2 py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <span className="text-base">{item.icon}</span>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
