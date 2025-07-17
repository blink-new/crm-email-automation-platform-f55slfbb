import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Lead {
  id: string
  name: string
  company: string
  value: number
  stage: string
}

const pipelineStages = [
  { name: 'New Leads', leads: [
    { id: '1', name: 'Sarah Johnson', company: 'TechCorp', value: 15000, stage: 'new' },
    { id: '2', name: 'Mike Chen', company: 'StartupXYZ', value: 8500, stage: 'new' }
  ]},
  { name: 'Qualified', leads: [
    { id: '3', name: 'Emily Davis', company: 'BigCorp', value: 25000, stage: 'qualified' },
    { id: '4', name: 'John Smith', company: 'MediumCo', value: 12000, stage: 'qualified' }
  ]},
  { name: 'Proposal', leads: [
    { id: '5', name: 'Lisa Wang', company: 'Enterprise Inc', value: 45000, stage: 'proposal' }
  ]},
  { name: 'Negotiation', leads: [
    { id: '6', name: 'David Brown', company: 'Global Ltd', value: 32000, stage: 'negotiation' }
  ]}
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function LeadsPipeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStages.map((stage, index) => (
            <div key={stage.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-gray-700">{stage.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  {stage.leads.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {stage.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-200 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {lead.name}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {lead.company}
                        </p>
                        <p className="text-sm font-semibold text-green-600 mt-1">
                          {formatCurrency(lead.value)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}