export type NavigationTab =
  | 'landing'
  | 'overview'
  | 'create'
  | 'builder'
  | 'library'
  | 'automations'
  | 'analytics'
  | 'activity'
  | 'settings';

export type NodeType = 'TRIGGER' | 'AI_PROCESSING' | 'LOGIC' | 'ACTION';

export type NodeExecutionStatus = 'idle' | 'running' | 'success' | 'warning' | 'error';

export interface WorkflowNode {
  id: string;
  title: string;
  subtitle: string;
  type: NodeType;
  icon: string;
  status: NodeExecutionStatus;
  x: number;
  y: number;
  config: {
    sourceApp?: string;
    model?: string;
    promptTemplate?: string;
    temperature?: number;
    decisionRules?: string[];
    actionChannel?: string;
    recipients?: string;
    customParams?: Record<string, string>;
  };
  executionLatency?: string;
  executionOutput?: string;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface AutomationItem {
  id: string;
  title: string;
  description: string;
  trigger: string;
  status: 'active' | 'paused' | 'attention';
  lastRun: string;
  executions: number;
  successRate: string;
  category: string;
  icon: string;
  nodesCount: number;
  createdFromPrompt?: string;
}

export interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Communication' | 'Productivity' | 'Documents' | 'Analytics' | 'AI Intelligence' | 'Scheduling';
  timeSaved: string;
  complexity: 'Simple' | 'Intermediate' | 'Advanced';
  icon: string;
  popular?: boolean;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface ActivityItem {
  id: string;
  title: string;
  workflowName: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  duration: string;
  triggerEvent: string;
  reasoningSummary: string;
  payloadSummary: string;
  dataProcessed: string;
}

export interface MetricsSummary {
  activeAutomations: number;
  tasksCompleted: number;
  timeSaved: string;
  successRate: string;
  aiDecisions: number;
}
