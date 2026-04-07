export type DocItem = {
  title: string
  slug: string
  icon?: string
}

export type DocSection = {
  section: string
  items: DocItem[]
}

export const docsNav: DocSection[] = [
  {
    section: 'Getting Started',
    items: [
      { title: 'What is NexPlan?', slug: 'what-is-nexplan', icon: '🚀' },
      { title: 'How to Sign Up', slug: 'how-to-sign-up', icon: '✍️' },
      { title: 'How to Sign In', slug: 'how-to-sign-in', icon: '🔐' },
      { title: 'Account Settings', slug: 'account-settings', icon: '⚙️' },
      { title: 'Plans & Pricing', slug: 'plans-pricing', icon: '💳' },
    ],
  },
  {
    section: 'Projects',
    items: [
      { title: 'Creating a Project', slug: 'creating-a-project', icon: '📁' },
      { title: 'Project Settings', slug: 'project-settings', icon: '🛠️' },
      { title: 'AI Project Generator', slug: 'ai-project-generator', icon: '🤖' },
      { title: 'Project Dates & Timeline', slug: 'project-dates', icon: '📅' },
      { title: 'Budget Tracker', slug: 'budget-tracker', icon: '💰' },
    ],
  },
  {
    section: 'Kanban Board',
    items: [
      { title: 'What is the Kanban Board?', slug: 'kanban-board', icon: '📋' },
      { title: 'Columns & Statuses', slug: 'kanban-columns', icon: '🗂️' },
      { title: 'What is a Card?', slug: 'kanban-card', icon: '🃏' },
      { title: 'What is a Task?', slug: 'what-is-a-task', icon: '✅' },
      { title: 'Adding Tasks', slug: 'adding-tasks', icon: '➕' },
      { title: 'Editing Tasks', slug: 'editing-tasks', icon: '✏️' },
      { title: 'Assigning Tasks', slug: 'assigning-tasks', icon: '👤' },
      { title: 'Drag & Drop', slug: 'drag-drop', icon: '↕️' },
      { title: 'Task Activity Log', slug: 'task-activity', icon: '📊' },
    ],
  },
  {
    section: 'My Tasks',
    items: [
      { title: 'My Tasks Overview', slug: 'my-tasks', icon: '☑️' },
      { title: 'Filtering & Grouping', slug: 'my-tasks-filters', icon: '🔍' },
      { title: 'Quick Status Update', slug: 'quick-status-update', icon: '⚡' },
    ],
  },
  {
    section: 'Timeline & Gantt',
    items: [
      { title: 'Timeline View', slug: 'timeline-view', icon: '📆' },
      { title: 'Gantt Chart', slug: 'gantt-chart', icon: '📉' },
      { title: 'Critical Path', slug: 'critical-path', icon: '🔴' },
      { title: 'Exporting Gantt', slug: 'exporting-gantt', icon: '📤' },
    ],
  },
  {
    section: 'Team & Organisation',
    items: [
      { title: 'Inviting Team Members', slug: 'inviting-members', icon: '📨' },
      { title: 'Roles & Permissions', slug: 'roles-permissions', icon: '🔑' },
      { title: 'Organisation Dashboard', slug: 'org-dashboard', icon: '🏢' },
      { title: 'Workspaces', slug: 'workspaces', icon: '🗃️' },
    ],
  },
  {
    section: 'AI Features',
    items: [
      { title: 'Infra Impact Analyzer', slug: 'infra-impact-analyzer', icon: '🔍' },
      { title: 'AI Knowledge Base', slug: 'ai-knowledge-base', icon: '🧠' },
      { title: 'AI Project Manager', slug: 'ai-project-manager', icon: '🤖' },
      { title: 'AI Status Reports', slug: 'ai-status-reports', icon: '📝' },
      { title: 'AI Follow-up Emails', slug: 'ai-followup', icon: '📧' },
    ],
  },
  {
    section: 'Risk & Change',
    items: [
      { title: 'Risk Register', slug: 'risk-register', icon: '⚠️' },
      { title: 'Project Change Requests (PCR)', slug: 'pcr', icon: '🔄' },
      { title: 'Change Freeze Calendar', slug: 'change-freeze', icon: '🧊' },
      { title: 'Post Mortem Generator', slug: 'post-mortem', icon: '🔎' },
    ],
  },
  {
    section: 'Reports & Analytics',
    items: [
      { title: 'Reports Overview', slug: 'reports', icon: '📈' },
      { title: 'Analytics Dashboard', slug: 'analytics', icon: '🔬' },
      { title: 'Export to Excel', slug: 'export-excel', icon: '📊' },
      { title: 'Export to PDF', slug: 'export-pdf', icon: '📄' },
      { title: 'Export to PowerPoint', slug: 'export-ppt', icon: '🖥️' },
    ],
  },
  {
    section: 'Network Diagram',
    items: [
      { title: 'Network Diagram Overview', slug: 'network-diagram', icon: '🗺️' },
      { title: 'AI Network Generator', slug: 'ai-network-generator', icon: '🤖' },
    ],
  },
  {
    section: 'Notifications',
    items: [
      { title: 'Email Notifications', slug: 'email-notifications', icon: '📧' },
      { title: 'Push Notifications', slug: 'push-notifications', icon: '🔔' },
      { title: 'Task Reminders', slug: 'task-reminders', icon: '⏰' },
    ],
  },
  {
    section: 'Mobile & PWA',
    items: [
      { title: 'Installing NexPlan (PWA)', slug: 'pwa-install', icon: '📱' },
      { title: 'Mobile Kanban', slug: 'mobile-kanban', icon: '📲' },
    ],
  },
  {
    section: 'Organisation',
    items: [
      { title: 'Organisation Overview', slug: 'organisation-overview', icon: '🏢' },
      { title: 'Inviting Members', slug: 'inviting-members', icon: '📨' },
      { title: 'Roles & Permissions', slug: 'roles-permissions', icon: '🔑' },
      { title: 'Organisation Dashboard', slug: 'org-dashboard', icon: '📊' },
      { title: 'Workspaces', slug: 'workspaces', icon: '🗃️' },
      { title: 'Client Portal', slug: 'client-portal', icon: '👁️' },
    ],
  },
  {
    section: 'Admin',
    items: [
      { title: 'Admin Panel Overview', slug: 'admin-panel', icon: '🔐' },
      { title: 'Managing Users', slug: 'managing-users', icon: '👥' },
      { title: 'Audit Logs', slug: 'audit-logs', icon: '📋' },
      { title: 'Subscriptions', slug: 'subscriptions', icon: '💳' },
    ],
  },
]
