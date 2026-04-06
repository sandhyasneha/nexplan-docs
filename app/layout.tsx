import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NexPlan Docs — AI IT Project Management',
  description: 'Complete documentation for NexPlan — the AI-powered IT Project Management platform for infrastructure teams.',
  metadataBase: new URL('https://docs.nexplan.io'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
