import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { LeadsPipeline } from '@/components/dashboard/LeadsPipeline'
import { ContactsTable } from '@/components/contacts/ContactsTable'
import { NewContactModal } from '@/components/contacts/NewContactModal'
import { EmailCampaigns } from '@/components/campaigns/EmailCampaigns'
import { NewCampaignModal } from '@/components/campaigns/NewCampaignModal'
import { WorkflowBuilder } from '@/components/workflows/WorkflowBuilder'
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard'
import { blink } from '@/blink/client'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showNewContactModal, setShowNewContactModal] = useState(false)
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false)
  const [showNewWorkflowModal, setShowNewWorkflowModal] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleNewContact = () => {
    setShowNewContactModal(true)
    setActiveTab('contacts')
  }

  const handleNewCampaign = () => {
    setShowNewCampaignModal(true)
    setActiveTab('campaigns')
  }

  const handleNewWorkflow = () => {
    setShowNewWorkflowModal(true)
    setActiveTab('workflows')
  }

  const handleContactCreated = () => {
    // Refresh contacts if we're on the contacts tab
    if (activeTab === 'contacts') {
      window.location.reload() // Simple refresh for now
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <p className="text-gray-600">Loading CRM...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CRM Pro</h1>
          <p className="text-gray-600 mb-6">Please sign in to access your CRM dashboard</p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
            </div>
            <DashboardStats />
            <div className="grid gap-6 lg:grid-cols-2">
              <LeadsPipeline />
              <RecentActivity />
            </div>
          </div>
        )
      case 'contacts':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
              <p className="text-gray-600">Manage your contacts and track their journey.</p>
            </div>
            <ContactsTable onNewContact={() => setShowNewContactModal(true)} />
          </div>
        )
      case 'leads':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
              <p className="text-gray-600">Track and nurture your sales opportunities.</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Leads management coming soon...</p>
            </div>
          </div>
        )
      case 'campaigns':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
              <p className="text-gray-600">Create and manage your email marketing campaigns.</p>
            </div>
            <EmailCampaigns onNewCampaign={() => setShowNewCampaignModal(true)} />
          </div>
        )
      case 'workflows':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
              <p className="text-gray-600">Automate your marketing and sales processes.</p>
            </div>
            <WorkflowBuilder onNewWorkflow={() => setShowNewWorkflowModal(true)} />
          </div>
        )
      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600">Track your performance and gain insights.</p>
            </div>
            <AnalyticsDashboard />
          </div>
        )
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Configure your CRM preferences.</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Settings panel coming soon...</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header onNewContact={handleNewContact} onNewCampaign={handleNewCampaign} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
      <NewContactModal
        open={showNewContactModal}
        onOpenChange={setShowNewContactModal}
        onContactCreated={handleContactCreated}
      />
      <NewCampaignModal
        open={showNewCampaignModal}
        onOpenChange={setShowNewCampaignModal}
        onCampaignCreated={() => {
          // Refresh campaigns if we're on the campaigns tab
          if (activeTab === 'campaigns') {
            window.location.reload()
          }
        }}
      />
    </div>
  )
}

export default App