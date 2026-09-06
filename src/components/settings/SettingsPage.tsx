import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  Settings as SettingsIcon,
  User,
  Building,
  Bell,
  Sparkles,
  Link,
  Sun,
  Shield,
  Check,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { showToast } = useAutomation();
  const [activeSection, setActiveSection] = useState('profile');

  // Interactive settings state
  const [profileName, setProfileName] = useState('Omansh Bhatnagar');
  const [profileEmail, setProfileEmail] = useState('omansh@kairo.ai');
  const [workspaceName, setWorkspaceName] = useState('Omansh Studio');
  const [aiModel, setAiModel] = useState('kairo-neural-v2');
  const [autoApproveLowRisk, setAutoApproveLowRisk] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);

  // Connected integrations
  const [connectedServices, setConnectedServices] = useState({
    gmail: true,
    slack: true,
    notion: true,
    github: false,
  });

  const toggleService = (key: keyof typeof connectedServices) => {
    setConnectedServices(prev => {
      const next = !prev[key];
      showToast(`${key.toUpperCase()} integration ${next ? 'connected' : 'disconnected'}`);
      return { ...prev, [key]: next };
    });
  };

  const handleSave = () => {
    showToast('Settings saved successfully', 'success');
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'workspace', label: 'Workspace', icon: Building },
    { id: 'ai', label: 'AI Preferences', icon: Sparkles },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Sun },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8 select-none">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-[#2547D0] border border-blue-100 mb-1">
          <SettingsIcon className="w-3 h-3 text-[#2547D0]" />
          <span>System Settings</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Preferences & Environment
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage identity, linked platform accounts, inference engines, and security thresholds.
        </p>
      </div>

      {/* Two-Column Settings Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Navigation Sub-Sidebar */}
        <div className="space-y-1">
          {sections.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-control text-xs font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Form Container */}
        <div className="md:col-span-3 bg-white rounded-panel border border-black/[0.07] p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">Profile Information</h3>
                <p className="text-slate-500 mt-0.5">Your personal credentials inside Kairo.</p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border border-black/[0.08] flex items-center justify-center text-slate-700 font-bold text-base">
                  OB
                </div>
                <div>
                  <button
                    onClick={() => showToast('Avatar upload simulated', 'info')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-control font-medium text-slate-700 transition-colors"
                  >
                    Change avatar
                  </button>
                  <p className="text-[11px] text-slate-400 mt-1">JPG or PNG under 2MB</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-900 focus:outline-none focus:border-[#2547D0]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={e => setProfileEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-900 focus:outline-none focus:border-[#2547D0]"
                />
              </div>
            </div>
          )}

          {/* Workspace Section */}
          {activeSection === 'workspace' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">Workspace Settings</h3>
                <p className="text-slate-500 mt-0.5">Control organization name and team isolation.</p>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={e => setWorkspaceName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-900 focus:outline-none focus:border-[#2547D0]"
                />
              </div>

              <div className="p-3 bg-[#FAFBFD] rounded-control border border-black/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Plan: Enterprise Autonomous</div>
                  <div className="text-[11px] text-slate-500">Unlimited workflow executions & continuous model reasoning</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          )}

          {/* AI Preferences */}
          {activeSection === 'ai' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">AI Model Preferences</h3>
                <p className="text-slate-500 mt-0.5">Default inference models and reasoning guardrails.</p>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Default Workflow Synthesis Engine
                </label>
                <select
                  value={aiModel}
                  onChange={e => setAiModel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-800 font-medium focus:outline-none focus:border-[#2547D0]"
                >
                  <option value="kairo-neural-v2">Kairo Neural Engine v2.4 (Ultra Fast, Zero Latency)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Extreme 1M token context)</option>
                  <option value="claude-3.5-sonnet">Claude 3.5 Sonnet (Advanced Logic & Code)</option>
                </select>
              </div>

              <div className="p-4 bg-[#FAFBFD] rounded-control border border-black/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Autonomous Low-Risk Execution</div>
                  <div className="text-[11px] text-slate-500">Automatically run logic when model confidence is &gt; 92% without requiring manual confirmation.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoApproveLowRisk(!autoApproveLowRisk)}
                  className="text-[#2547D0] hover:text-[#1D3BB5]"
                >
                  {autoApproveLowRisk ? (
                    <ToggleRight className="w-7 h-7" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-slate-300" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeSection === 'integrations' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">Connected Services</h3>
                <p className="text-slate-500 mt-0.5">Authorize access to cloud platforms used in workflow triggers and actions.</p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Gmail / Workspace */}
                <div className="p-3.5 bg-[#FAFBFD] rounded-control border border-black/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-control bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      G
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Google Workspace (Gmail & Drive)</div>
                      <div className="text-[11px] text-slate-500">Allows reading incoming messages & uploading files</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('gmail')}
                    className={`px-3 py-1 text-xs font-semibold rounded-control transition-colors ${
                      connectedServices.gmail
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {connectedServices.gmail ? 'Connected' : 'Connect'}
                  </button>
                </div>

                {/* Slack */}
                <div className="p-3.5 bg-[#FAFBFD] rounded-control border border-black/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-control bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Slack Workspace</div>
                      <div className="text-[11px] text-slate-500">Allows sending smart summaries & executive alerts</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('slack')}
                    className={`px-3 py-1 text-xs font-semibold rounded-control transition-colors ${
                      connectedServices.slack
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {connectedServices.slack ? 'Connected' : 'Connect'}
                  </button>
                </div>

                {/* Notion */}
                <div className="p-3.5 bg-[#FAFBFD] rounded-control border border-black/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-control bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs">
                      N
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Notion Workspace</div>
                      <div className="text-[11px] text-slate-500">Syncs extracted notes, tasks, and document tables</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('notion')}
                    className={`px-3 py-1 text-xs font-semibold rounded-control transition-colors ${
                      connectedServices.notion
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {connectedServices.notion ? 'Connected' : 'Connect'}
                  </button>
                </div>

                {/* GitHub */}
                <div className="p-3.5 bg-[#FAFBFD] rounded-control border border-black/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-control bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      GH
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">GitHub Enterprise</div>
                      <div className="text-[11px] text-slate-500">Trigger workflows on pull requests, issues, and deployments</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('github')}
                    className={`px-3 py-1 text-xs font-semibold rounded-control transition-colors ${
                      connectedServices.github
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {connectedServices.github ? 'Connected' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">Notification Routing</h3>
                <p className="text-slate-500 mt-0.5">Control where error alerts and milestone reports are dispatched.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-[#FAFBFD] rounded-control border border-black/[0.06] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">Email Digest Notifications</div>
                    <div className="text-[11px] text-slate-500">Receive summary of daily tasks automated every evening.</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className="text-[#2547D0]"
                  >
                    {emailAlerts ? (
                      <ToggleRight className="w-7 h-7" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-300" />
                    )}
                  </button>
                </div>

                <div className="p-3.5 bg-[#FAFBFD] rounded-control border border-black/[0.06] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">Slack Instant Alerts for Attention Items</div>
                    <div className="text-[11px] text-slate-500">Receive an urgent notification whenever a workflow requires human review.</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSlackAlerts(!slackAlerts)}
                    className="text-[#2547D0]"
                  >
                    {slackAlerts ? (
                      <ToggleRight className="w-7 h-7" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-300" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === 'appearance' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">Design System & Theme</h3>
                <p className="text-slate-500 mt-0.5">Visual personality of your Kairo workspace.</p>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-control border border-blue-100 flex items-start gap-3">
                <Sun className="w-5 h-5 text-[#2547D0] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Light Mode Design Standard</div>
                  <div className="text-slate-600 mt-1 leading-relaxed">
                    Kairo is deliberately architected using a calm, high-precision light theme grounded in Apple Human Interface Guidelines and modern SaaS principles.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action footer */}
          <div className="pt-4 border-t border-black/[0.05] flex justify-end">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2547D0] hover:bg-[#1D3BB5] rounded-control shadow-xs transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
