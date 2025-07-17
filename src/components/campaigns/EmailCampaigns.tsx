import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Plus, Mail, Eye, Edit, Trash2, Play, Pause } from 'lucide-react'
import { EmailCampaign } from '@/types'

interface EmailCampaignsProps {
  onNewCampaign: () => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'scheduled': return 'bg-blue-100 text-blue-800'
    case 'sent': return 'bg-green-100 text-green-800'
    case 'paused': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Mock data for demonstration
const mockCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'Welcome Series - New Leads',
    subject: 'Welcome to our platform!',
    content: 'Thank you for joining us...',
    status: 'sent',
    sentCount: 245,
    openRate: 24.5,
    clickRate: 3.2,
    createdAt: '2024-01-15T10:00:00Z',
    userId: 'user1'
  },
  {
    id: '2',
    name: 'Product Demo Follow-up',
    subject: 'Ready to see our product in action?',
    content: 'Schedule your personalized demo...',
    status: 'scheduled',
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: '2024-01-16T14:30:00Z',
    scheduledAt: '2024-01-20T09:00:00Z',
    userId: 'user1'
  },
  {
    id: '3',
    name: 'Monthly Newsletter',
    subject: 'Your monthly industry insights',
    content: 'Here are this month\'s top trends...',
    status: 'draft',
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: '2024-01-17T16:45:00Z',
    userId: 'user1'
  },
  {
    id: '4',
    name: 'Re-engagement Campaign',
    subject: 'We miss you! Come back for exclusive offers',
    content: 'It\'s been a while since we last heard from you...',
    status: 'paused',
    sentCount: 156,
    openRate: 18.7,
    clickRate: 2.1,
    createdAt: '2024-01-10T11:20:00Z',
    userId: 'user1'
  }
]

export function EmailCampaigns({ onNewCampaign }: EmailCampaignsProps) {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusChange = (campaignId: string, newStatus: EmailCampaign['status']) => {
    setCampaigns(campaigns.map(campaign =>
      campaign.id === campaignId
        ? { ...campaign, status: newStatus }
        : campaign
    ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Email Campaigns</CardTitle>
            <Button onClick={onNewCampaign} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No email campaigns found</p>
              <Button onClick={onNewCampaign} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Campaign
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Open Rate</TableHead>
                  <TableHead>Click Rate</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-sm text-gray-600">{campaign.subject}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{campaign.sentCount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{campaign.openRate}%</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{campaign.clickRate}%</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {formatDate(campaign.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {campaign.status === 'draft' || campaign.status === 'paused' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(campaign.id, 'scheduled')}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : campaign.status === 'scheduled' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(campaign.id, 'paused')}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : null}
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}