import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Search,
  Workflow as WorkflowIcon,
  Mail,
  Clock,
  Tag,
  TrendingUp,
  Users
} from 'lucide-react'
import { Workflow } from '@/types'

interface WorkflowBuilderProps {
  onNewWorkflow: () => void
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Welcome Email Sequence',
    description: 'Automated welcome series for new leads',
    trigger: 'Contact created with status "lead"',
    actions: [
      { id: '1', type: 'email', config: { template: 'welcome', delay: 0 }, order: 1 },
      { id: '2', type: 'delay', config: { duration: 3, unit: 'days' }, order: 2 },
      { id: '3', type: 'email', config: { template: 'follow_up', delay: 0 }, order: 3 },
      { id: '4', type: 'delay', config: { duration: 7, unit: 'days' }, order: 4 },
      { id: '5', type: 'score', config: { points: 10, reason: 'Completed welcome sequence' }, order: 5 }
    ],
    isActive: true,
    contactsEnrolled: 234,
    createdAt: '2024-01-10T10:00:00Z',
    userId: 'user1'
  },
  {
    id: '2',
    name: 'Lead Nurturing Campaign',
    description: 'Nurture prospects with educational content',
    trigger: 'Contact status changed to "prospect"',
    actions: [
      { id: '1', type: 'tag', config: { tag: 'nurturing' }, order: 1 },
      { id: '2', type: 'email', config: { template: 'educational_1' }, order: 2 },
      { id: '3', type: 'delay', config: { duration: 5, unit: 'days' }, order: 3 },
      { id: '4', type: 'email', config: { template: 'educational_2' }, order: 4 }
    ],
    isActive: true,
    contactsEnrolled: 156,
    createdAt: '2024-01-12T14:30:00Z',
    userId: 'user1'
  },
  {
    id: '3',
    name: 'Re-engagement Workflow',
    description: 'Win back inactive contacts',
    trigger: 'No email activity for 30 days',
    actions: [
      { id: '1', type: 'email', config: { template: 'reengagement' }, order: 1 },
      { id: '2', type: 'delay', config: { duration: 7, unit: 'days' }, order: 2 },
      { id: '3', type: 'email', config: { template: 'special_offer' }, order: 3 }
    ],
    isActive: false,
    contactsEnrolled: 89,
    createdAt: '2024-01-08T09:15:00Z',
    userId: 'user1'
  }
]

const getActionIcon = (type: string) => {
  switch (type) {
    case 'email': return <Mail className="h-4 w-4" />
    case 'delay': return <Clock className="h-4 w-4" />
    case 'tag': return <Tag className="h-4 w-4" />
    case 'score': return <TrendingUp className="h-4 w-4" />
    default: return <WorkflowIcon className="h-4 w-4" />
  }
}

const formatActionDescription = (action: any) => {
  switch (action.type) {
    case 'email':
      return `Send "${action.config.template}" email`
    case 'delay':
      return `Wait ${action.config.duration} ${action.config.unit}`
    case 'tag':
      return `Add tag "${action.config.tag}"`
    case 'score':
      return `Add ${action.config.points} points`
    default:
      return 'Unknown action'
  }
}

export function WorkflowBuilder({ onNewWorkflow }: WorkflowBuilderProps) {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows(workflows.map(workflow =>
      workflow.id === workflowId
        ? { ...workflow, isActive: !workflow.isActive }
        : workflow
    ))
  }

  return (
    <div className="space-y-6">
      {/* Workflow Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <WorkflowIcon className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{workflows.length}</p>
                <p className="text-sm text-gray-600">Total Workflows</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{workflows.filter(w => w.isActive).length}</p>
                <p className="text-sm text-gray-600">Active Workflows</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {workflows.reduce((sum, w) => sum + w.contactsEnrolled, 0)}
                </p>
                <p className="text-sm text-gray-600">Contacts Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflows Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Automation Workflows</CardTitle>
            <Button onClick={onNewWorkflow} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredWorkflows.length === 0 ? (
            <div className="text-center py-8">
              <WorkflowIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No workflows found</p>
              <Button onClick={onNewWorkflow} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Workflow
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWorkflows.map((workflow) => (
                <Card key={workflow.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{workflow.name}</h3>
                          <Badge variant={workflow.isActive ? "default" : "secondary"}>
                            {workflow.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{workflow.description}</p>
                        
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Trigger:</p>
                          <Badge variant="outline" className="text-xs">
                            {workflow.trigger}
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Actions:</p>
                          <div className="flex flex-wrap gap-2">
                            {workflow.actions.map((action, index) => (
                              <div key={action.id} className="flex items-center space-x-1">
                                <Badge variant="outline" className="text-xs flex items-center space-x-1">
                                  {getActionIcon(action.type)}
                                  <span>{formatActionDescription(action)}</span>
                                </Badge>
                                {index < workflow.actions.length - 1 && (
                                  <span className="text-gray-400">→</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{workflow.contactsEnrolled} contacts enrolled</span>
                          <span>Created {new Date(workflow.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={workflow.isActive}
                            onCheckedChange={() => toggleWorkflow(workflow.id)}
                          />
                          <span className="text-sm text-gray-600">
                            {workflow.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}