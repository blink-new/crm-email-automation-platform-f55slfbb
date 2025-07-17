import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Mail, 
  Users, 
  MousePointer, 
  Eye,
  Calendar,
  Download
} from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
}

function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
          {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
          {change} from last period
        </p>
      </CardContent>
    </Card>
  )
}

const campaignPerformance = [
  {
    name: 'Welcome Series - New Leads',
    sent: 245,
    delivered: 242,
    opened: 59,
    clicked: 8,
    openRate: 24.4,
    clickRate: 3.3,
    status: 'active'
  },
  {
    name: 'Product Demo Follow-up',
    sent: 156,
    delivered: 154,
    opened: 31,
    clicked: 5,
    openRate: 20.1,
    clickRate: 3.2,
    status: 'completed'
  },
  {
    name: 'Monthly Newsletter',
    sent: 1247,
    delivered: 1235,
    opened: 198,
    clicked: 23,
    openRate: 16.0,
    clickRate: 1.9,
    status: 'active'
  },
  {
    name: 'Re-engagement Campaign',
    sent: 89,
    delivered: 87,
    opened: 12,
    clicked: 2,
    openRate: 13.8,
    clickRate: 2.2,
    status: 'paused'
  }
]

const leadSourceData = [
  { source: 'Website', leads: 156, percentage: 35.2 },
  { source: 'Social Media', leads: 89, percentage: 20.1 },
  { source: 'Email Campaign', leads: 67, percentage: 15.1 },
  { source: 'Referral', leads: 45, percentage: 10.2 },
  { source: 'Direct', leads: 34, percentage: 7.7 },
  { source: 'Other', leads: 52, percentage: 11.7 }
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Time Period Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
          <p className="text-sm text-gray-600">Track your CRM and email marketing performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Contacts"
          value="2,847"
          change="+12.5%"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Email Sent"
          value="1,737"
          change="+8.2%"
          trend="up"
          icon={<Mail className="h-4 w-4" />}
        />
        <MetricCard
          title="Open Rate"
          value="18.7%"
          change="+2.1%"
          trend="up"
          icon={<Eye className="h-4 w-4" />}
        />
        <MetricCard
          title="Click Rate"
          value="2.8%"
          change="-0.3%"
          trend="down"
          icon={<MousePointer className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignPerformance.map((campaign, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{campaign.name}</h4>
                    <Badge 
                      variant={campaign.status === 'active' ? 'default' : 
                              campaign.status === 'completed' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Sent</p>
                      <p className="font-medium">{campaign.sent}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Opened</p>
                      <p className="font-medium">{campaign.opened}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Open Rate</p>
                      <p className="font-medium">{campaign.openRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Click Rate</p>
                      <p className="font-medium">{campaign.clickRate}%</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${campaign.openRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadSourceData.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{source.leads} leads</span>
                    <span className="text-sm font-medium">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 rounded-lg p-4 mb-2">
                  <Users className="h-6 w-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <p className="text-sm text-gray-600">Total Contacts</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-800 rounded-lg p-4 mb-2">
                  <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <p className="text-sm text-gray-600">Qualified Leads</p>
                <p className="text-xs text-gray-500">43.3%</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 text-yellow-800 rounded-lg p-4 mb-2">
                  <Calendar className="h-6 w-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold">456</p>
                </div>
                <p className="text-sm text-gray-600">Opportunities</p>
                <p className="text-xs text-gray-500">37.0%</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 text-purple-800 rounded-lg p-4 mb-2">
                  <BarChart3 className="h-6 w-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold">123</p>
                </div>
                <p className="text-sm text-gray-600">Proposals</p>
                <p className="text-xs text-gray-500">27.0%</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 text-orange-800 rounded-lg p-4 mb-2">
                  <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold">67</p>
                </div>
                <p className="text-sm text-gray-600">Customers</p>
                <p className="text-xs text-gray-500">54.5%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}