import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Users, Calendar, Settings } from 'lucide-react'

interface NewCampaignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCampaignCreated: () => void
}

const emailTemplates = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to {{company_name}}!',
    content: `Hi {{first_name}},

Welcome to {{company_name}}! We're excited to have you on board.

Here's what you can expect:
• Personalized onboarding experience
• Access to our knowledge base
• 24/7 customer support

Get started by exploring your dashboard.

Best regards,
The {{company_name}} Team`
  },
  {
    id: 'follow_up',
    name: 'Follow-up Email',
    subject: 'Following up on our conversation',
    content: `Hi {{first_name}},

I wanted to follow up on our recent conversation about {{topic}}.

Based on our discussion, I think {{company_name}} could be a great fit for {{contact_company}}.

Would you be available for a quick 15-minute call this week to discuss next steps?

Best regards,
{{sender_name}}`
  },
  {
    id: 'newsletter',
    name: 'Newsletter Template',
    subject: 'Your monthly industry insights',
    content: `Hi {{first_name}},

Here are this month's top insights for your industry:

📈 Trend #1: [Insert trend]
💡 Tip #2: [Insert tip]
🚀 Update #3: [Insert update]

Read the full newsletter: {{newsletter_link}}

Best regards,
The {{company_name}} Team`
  }
]

export function NewCampaignModal({ open, onOpenChange, onCampaignCreated }: NewCampaignModalProps) {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('details')
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    template: '',
    audience: 'all_contacts',
    scheduleType: 'now'
  })

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId)
    if (template) {
      setFormData({
        ...formData,
        template: templateId,
        subject: template.subject,
        content: template.content
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate campaign creation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onCampaignCreated()
      onOpenChange(false)
      setFormData({
        name: '',
        subject: '',
        content: '',
        template: '',
        audience: 'all_contacts',
        scheduleType: 'now'
      })
    } catch (error) {
      console.error('Failed to create campaign:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Email Campaign</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Details</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Audience</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="mt-6">
            <TabsContent value="details" className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="e.g., Welcome Series - New Leads"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Email Template</Label>
                <div className="grid gap-3 mt-2">
                  {emailTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-colors ${
                        formData.template === template.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-sm text-gray-600">{template.subject}</p>
                          </div>
                          {formData.template === template.id && (
                            <Badge className="bg-orange-500">Selected</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject line"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use variables like {{first_name}}, {{company_name}}, {{contact_company}}
                </p>
              </div>

              <div>
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your email content here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Personalize with variables and keep it engaging!
                </p>
              </div>
            </TabsContent>

            <TabsContent value="audience" className="space-y-4">
              <div>
                <Label>Target Audience</Label>
                <Select value={formData.audience} onValueChange={(value) => setFormData({ ...formData, audience: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_contacts">All Contacts (2,847)</SelectItem>
                    <SelectItem value="leads">Leads Only (1,234)</SelectItem>
                    <SelectItem value="prospects">Prospects Only (856)</SelectItem>
                    <SelectItem value="customers">Customers Only (757)</SelectItem>
                    <SelectItem value="high_score">High Lead Score (&gt;75) (423)</SelectItem>
                    <SelectItem value="recent">Recent Contacts (Last 30 days) (156)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Audience Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    {formData.audience === 'all_contacts' && 'This campaign will be sent to all 2,847 contacts in your database.'}
                    {formData.audience === 'leads' && 'This campaign will be sent to 1,234 contacts with "Lead" status.'}
                    {formData.audience === 'prospects' && 'This campaign will be sent to 856 contacts with "Prospect" status.'}
                    {formData.audience === 'customers' && 'This campaign will be sent to 757 contacts with "Customer" status.'}
                    {formData.audience === 'high_score' && 'This campaign will be sent to 423 contacts with lead score above 75.'}
                    {formData.audience === 'recent' && 'This campaign will be sent to 156 contacts added in the last 30 days.'}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div>
                <Label>Send Schedule</Label>
                <Select value={formData.scheduleType} onValueChange={(value) => setFormData({ ...formData, scheduleType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Send Immediately</SelectItem>
                    <SelectItem value="schedule">Schedule for Later</SelectItem>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.scheduleType === 'schedule' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduleDate">Date</Label>
                    <Input
                      id="scheduleDate"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="scheduleTime">Time</Label>
                    <Input
                      id="scheduleTime"
                      type="time"
                    />
                  </div>
                </div>
              )}

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm">
                    <p className="font-medium mb-2">Campaign Summary:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Campaign: {formData.name || 'Untitled Campaign'}</li>
                      <li>• Subject: {formData.subject || 'No subject'}</li>
                      <li>• Audience: {
                        formData.audience === 'all_contacts' ? '2,847 contacts' :
                        formData.audience === 'leads' ? '1,234 leads' :
                        formData.audience === 'prospects' ? '856 prospects' :
                        formData.audience === 'customers' ? '757 customers' :
                        formData.audience === 'high_score' ? '423 high-score contacts' :
                        '156 recent contacts'
                      }</li>
                      <li>• Schedule: {
                        formData.scheduleType === 'now' ? 'Send immediately' :
                        formData.scheduleType === 'schedule' ? 'Scheduled for later' :
                        'Save as draft'
                      }</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-between pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <div className="flex space-x-2">
                {activeTab !== 'details' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const tabs = ['details', 'content', 'audience', 'schedule']
                      const currentIndex = tabs.indexOf(activeTab)
                      if (currentIndex > 0) {
                        setActiveTab(tabs[currentIndex - 1])
                      }
                    }}
                  >
                    Previous
                  </Button>
                )}
                {activeTab !== 'schedule' ? (
                  <Button
                    type="button"
                    onClick={() => {
                      const tabs = ['details', 'content', 'audience', 'schedule']
                      const currentIndex = tabs.indexOf(activeTab)
                      if (currentIndex < tabs.length - 1) {
                        setActiveTab(tabs[currentIndex + 1])
                      }
                    }}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600">
                    {loading ? 'Creating...' : 
                     formData.scheduleType === 'draft' ? 'Save Draft' :
                     formData.scheduleType === 'schedule' ? 'Schedule Campaign' :
                     'Send Campaign'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}