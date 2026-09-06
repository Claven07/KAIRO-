import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  NavigationTab,
  WorkflowNode,
  WorkflowEdge,
  AutomationItem,
  WorkflowTemplate,
  ActivityItem,
  MetricsSummary,
} from '../types';
import {
  initialMetrics,
  defaultDemoNodes,
  defaultDemoEdges,
  initialAutomations,
  libraryTemplates,
  initialActivities,
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AutomationContextType {
  currentTab: NavigationTab;
  navigateTo: (tab: NavigationTab) => void;
  automations: AutomationItem[];
  toggleAutomationStatus: (id: string) => void;
  deleteAutomation: (id: string) => void;
  duplicateAutomation: (id: string) => void;
  activeWorkflowNodes: WorkflowNode[];
  activeWorkflowEdges: WorkflowEdge[];
  selectedNodeId: string | null;
  selectNode: (id: string | null) => void;
  updateNodeConfig: (id: string, updates: Partial<WorkflowNode>) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  isGenerating: boolean;
  generationStep: number;
  generationPrompt: string;
  startAIGeneration: (prompt: string) => void;
  isTestingWorkflow: boolean;
  testActiveStep: number;
  testLogs: string[];
  testWorkflow: () => Promise<void>;
  isActivated: boolean;
  showActivationModal: boolean;
  closeActivationModal: () => void;
  activateWorkflow: () => void;
  templates: WorkflowTemplate[];
  loadTemplate: (template: WorkflowTemplate) => void;
  activities: ActivityItem[];
  metrics: MetricsSummary;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const AutomationContext = createContext<AutomationContextType | undefined>(undefined);

export const AutomationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('landing');
  const [automations, setAutomations] = useState<AutomationItem[]>(initialAutomations);
  const [activeWorkflowNodes, setActiveWorkflowNodes] = useState<WorkflowNode[]>(defaultDemoNodes);
  const [activeWorkflowEdges, setActiveWorkflowEdges] = useState<WorkflowEdge[]>(defaultDemoEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-2');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [generationPrompt, setGenerationPrompt] = useState<string>('');
  const [isTestingWorkflow, setIsTestingWorkflow] = useState<boolean>(false);
  const [testActiveStep, setTestActiveStep] = useState<number>(-1);
  const [testLogs, setTestLogs] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [showActivationModal, setShowActivationModal] = useState<boolean>(false);
  const [templates] = useState<WorkflowTemplate[]>(libraryTemplates);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [metrics, setMetrics] = useState<MetricsSummary>(initialMetrics);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const navigateTo = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectNode = (id: string | null) => {
    setSelectedNodeId(id);
  };

  const updateNodeConfig = (id: string, updates: Partial<WorkflowNode>) => {
    setActiveWorkflowNodes(prev =>
      prev.map(node => (node.id === id ? { ...node, ...updates } : node))
    );
    showToast('Workflow node updated', 'info');
  };

  const updateNodePosition = (id: string, x: number, y: number) => {
    setActiveWorkflowNodes(prev =>
      prev.map(node => (node.id === id ? { ...node, x, y } : node))
    );
  };

  const toggleAutomationStatus = (id: string) => {
    setAutomations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStatus = item.status === 'active' ? 'paused' : 'active';
          showToast(`Automation "${item.title}" ${nextStatus === 'active' ? 'resumed' : 'paused'}`);
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const deleteAutomation = (id: string) => {
    const target = automations.find(a => a.id === id);
    setAutomations(prev => prev.filter(item => item.id !== id));
    showToast(`Deleted automation "${target?.title || ''}"`, 'warning');
  };

  const duplicateAutomation = (id: string) => {
    const target = automations.find(a => a.id === id);
    if (!target) return;
    const duplicated: AutomationItem = {
      ...target,
      id: `auto-${Date.now()}`,
      title: `${target.title} (Copy)`,
      status: 'paused',
      executions: 0,
      lastRun: 'Never',
    };
    setAutomations(prev => [duplicated, ...prev]);
    showToast(`Duplicated "${target.title}"`);
  };

  const loadTemplate = (template: WorkflowTemplate) => {
    setActiveWorkflowNodes(template.nodes.map(n => ({ ...n, status: 'idle' })));
    setActiveWorkflowEdges(template.edges);
    setSelectedNodeId(template.nodes[0]?.id || null);
    setIsActivated(false);
    navigateTo('builder');
    showToast(`Loaded "${template.title}" into canvas`);
  };

  // Primary Demo Flow AI Generation
  const startAIGeneration = (prompt: string) => {
    setGenerationPrompt(prompt);
    setIsGenerating(true);
    setGenerationStep(1);

    // Step 1: Understanding objective
    setTimeout(() => {
      setGenerationStep(2);
    }, 900);

    // Step 2: Identifying trigger
    setTimeout(() => {
      setGenerationStep(3);
    }, 1900);

    // Step 3: Designing automation logic
    setTimeout(() => {
      setGenerationStep(4);
    }, 3000);

    // Step 4: Selecting actions
    setTimeout(() => {
      setGenerationStep(5);
    }, 4100);

    // Step 5: Finished -> transition to Builder
    setTimeout(() => {
      setIsGenerating(false);
      // Reset statuses to idle
      setActiveWorkflowNodes(defaultDemoNodes.map(n => ({ ...n, status: 'idle' })));
      setActiveWorkflowEdges(defaultDemoEdges);
      setSelectedNodeId('node-2');
      navigateTo('builder');
      showToast('Workflow synthesized successfully', 'success');
    }, 5300);
  };

  // Workflow Testing Simulation
  const testWorkflow = async () => {
    if (isTestingWorkflow) return;
    setIsTestingWorkflow(true);
    setTestLogs([]);
    setTestActiveStep(0);

    // Reset all nodes to idle
    setActiveWorkflowNodes(prev => prev.map(n => ({ ...n, status: 'idle' })));

    // Step 1: Node 1 (Trigger)
    setTestLogs(prev => [...prev, '⚡ Simulating incoming webhook from Google Workspace...']);
    setActiveWorkflowNodes(prev =>
      prev.map((n, idx) => (idx === 0 ? { ...n, status: 'running' } : n))
    );

    await new Promise(r => setTimeout(r, 900));
    setActiveWorkflowNodes(prev =>
      prev.map((n, idx) => (idx === 0 ? { ...n, status: 'success' } : n))
    );
    setTestLogs(prev => [
      ...prev,
      '✓ Trigger matched: Email received with high urgency score from Elena Vance',
    ]);
    setTestActiveStep(1);

    // Step 2: Node 2 (AI Processing)
    setActiveWorkflowNodes(prev =>
      prev.map((n, idx) => (idx === 1 ? { ...n, status: 'running' } : n))
    );
    setTestLogs(prev => [...prev, '✦ Kairo Neural Engine analyzing text semantics & urgency...']);

    await new Promise(r => setTimeout(r, 1200));
    setActiveWorkflowNodes(prev =>
      prev.map((n, idx) => (idx === 1 ? { ...n, status: 'success' } : n))
    );
    setTestLogs(prev => [
      ...prev,
      '✓ AI Synthesis complete: Urgency 9/10, 3 contract deliverables extracted (318ms)',
    ]);
    setTestActiveStep(2);

    // Step 3: Node 3 (Logic)
    setActiveWorkflowNodes(prev =>
      prev.map((n, idx) => (idx === 2 ? { ...n, status: 'running' } : n))
    );
    setTestLogs(prev => [...prev, '⚡ Evaluating branching criteria (threshold >= 8)...']);

    await new Promise(r => setTimeout(r, 800));
    setActiveWorkflowNodes(prev =>
      prev.map((n, idx) => (idx === 2 ? { ...n, status: 'success' } : n))
    );
    setTestLogs(prev => [...prev, '✓ Route approved: Urgent VIP Escalation path triggered (15ms)']);
    setTestActiveStep(3);

    // Step 4: Node 4 (Action)
    setActiveWorkflowNodes(prev =>
      prev.map((n, idx) => (idx === 3 ? { ...n, status: 'running' } : n))
    );
    setTestLogs(prev => [...prev, '🔔 Dispatching Slack notification & Push payload...']);

    await new Promise(r => setTimeout(r, 900));
    setActiveWorkflowNodes(prev =>
      prev.map((n, idx) => (idx === 3 ? { ...n, status: 'success' } : n))
    );
    setTestLogs(prev => [
      ...prev,
      '✓ Notification delivered: Slack #exec-updates and Mobile push delivered with receipt (86ms)',
      '✨ Test run finished with 100% success rate (Total: 861ms)',
    ]);
    setTestActiveStep(4);
    setIsTestingWorkflow(false);
  };

  const activateWorkflow = () => {
    setIsActivated(true);
    setShowActivationModal(true);

    // Gentle celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2547D0', '#6366F1', '#10B981', '#F59E0B'],
      });
    } catch {
      // safe fallback
    }

    // Add or update in automations list
    const newAutomation: AutomationItem = {
      id: `auto-${Date.now()}`,
      title: 'Smart Email Triage',
      description: 'When important emails arrive → Analyze priority → Send summary',
      trigger: 'Gmail / Outlook incoming',
      status: 'active',
      lastRun: 'Just now',
      executions: 1,
      successRate: '100%',
      category: 'Communication',
      icon: 'Mail',
      nodesCount: 4,
      createdFromPrompt: generationPrompt || 'When I receive an important email, analyze its priority, summarize it, and notify me.',
    };

    setAutomations(prev => [
      newAutomation,
      ...prev.filter(a => a.title !== 'Smart Email Triage'),
    ]);

    // Add activity log
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: 'Smart Email Triage activated',
      workflowName: 'Smart Email Triage',
      timestamp: 'Just now',
      status: 'success',
      duration: '861ms',
      triggerEvent: 'Workflow activated by Omansh',
      reasoningSummary: 'Workflow validated against live mail stream rules. Standby mode initialized.',
      payloadSummary: 'Listening for incoming messages with priority headers.',
      dataProcessed: 'Configuration verified & locked',
    };

    setActivities(prev => [newActivity, ...prev]);
    setMetrics(prev => ({
      ...prev,
      activeAutomations: prev.activeAutomations + 1,
    }));
  };

  const closeActivationModal = () => {
    setShowActivationModal(false);
  };

  return (
    <AutomationContext.Provider
      value={{
        currentTab,
        navigateTo,
        automations,
        toggleAutomationStatus,
        deleteAutomation,
        duplicateAutomation,
        activeWorkflowNodes,
        activeWorkflowEdges,
        selectedNodeId,
        selectNode,
        updateNodeConfig,
        updateNodePosition,
        isGenerating,
        generationStep,
        generationPrompt,
        startAIGeneration,
        isTestingWorkflow,
        testActiveStep,
        testLogs,
        testWorkflow,
        isActivated,
        showActivationModal,
        closeActivationModal,
        activateWorkflow,
        templates,
        loadTemplate,
        activities,
        metrics,
        toasts,
        showToast,
        sidebarCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </AutomationContext.Provider>
  );
};

export const useAutomation = (): AutomationContextType => {
  const context = useContext(AutomationContext);
  if (!context) {
    throw new Error('useAutomation must be used within an AutomationProvider');
  }
  return context;
};
