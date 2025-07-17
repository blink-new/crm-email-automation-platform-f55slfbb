import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'

interface ActivityItem {
  id: string
  type: 'email' | 'call' | 'meeting' | 'note'
  contact: string
  description: string
  timestamp: Date
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'email',
    contact: 'Sarah Johnson',
    description: 'Opened welcome email campaign',
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: '2',
    type: 'call',
    contact: 'Mike Chen',
    description: 'Completed discovery call',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: '3',
    type: 'meeting',
    contact: 'Emily Davis',
    description: 'Scheduled demo for next week',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
  },
  {
    id: '4',
    type: 'note',
    contact: 'John Smith',
    description: 'Added follow-up note',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
  },
  {
    id: '5',
    type: 'email',
    contact: 'Lisa Wang',
    description: 'Clicked pricing page link',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
  }
]

const getActivityColor = (type: string) => {
  switch (type) {
    case 'email': return 'bg-blue-100 text-blue-800'
    case 'call': return 'bg-green-100 text-green-800'
    case 'meeting': return 'bg-purple-100 text-purple-800'
    case 'note': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.contact.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900">{activity.contact}</p>
                  <Badge variant="secondary" className={getActivityColor(activity.type)}>
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}