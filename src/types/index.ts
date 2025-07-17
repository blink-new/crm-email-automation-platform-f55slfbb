export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  position?: string
  leadScore: number
  status: 'lead' | 'prospect' | 'customer' | 'lost'
  source: string
  createdAt: string
  lastActivity?: string
  userId: string
}

export interface EmailCampaign {
  id: string
  name: string
  subject: string
  content: string
  status: 'draft' | 'scheduled' | 'sent' | 'paused'
  sentCount: number
  openRate: number
  clickRate: number
  createdAt: string
  scheduledAt?: string
  userId: string
}

export interface Workflow {
  id: string
  name: string
  description: string
  trigger: string
  actions: WorkflowAction[]
  isActive: boolean
  contactsEnrolled: number
  createdAt: string
  userId: string
}

export interface WorkflowAction {
  id: string
  type: 'email' | 'delay' | 'tag' | 'score'
  config: Record<string, any>
  order: number
}

export interface Activity {
  id: string
  contactId: string
  type: 'email_sent' | 'email_opened' | 'email_clicked' | 'call' | 'meeting' | 'note'
  description: string
  createdAt: string
  userId: string
}