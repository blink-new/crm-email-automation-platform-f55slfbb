import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserPlus, Mail, TrendingUp } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  trend: 'up' | 'down'
}

function StatsCard({ title, value, change, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
          <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
          {change} from last month
        </p>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Contacts"
        value="2,847"
        change="+12.5%"
        trend="up"
        icon={<Users className="h-4 w-4" />}
      />
      <StatsCard
        title="New Leads"
        value="156"
        change="+8.2%"
        trend="up"
        icon={<UserPlus className="h-4 w-4" />}
      />
      <StatsCard
        title="Email Campaigns"
        value="24"
        change="+4.1%"
        trend="up"
        icon={<Mail className="h-4 w-4" />}
      />
      <StatsCard
        title="Conversion Rate"
        value="3.2%"
        change="-0.3%"
        trend="down"
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  )
}