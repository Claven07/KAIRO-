import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  User,
  Building,
  Bell,
  Sparkles,
  Link as LinkIcon,
  Sun,
  Check,
} from 'lucide-react';

const Switch: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${
      checked ? 'bg-[#18181B]' : 'bg-black/[0.12]'
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-150 ease-in-out ${
        checked ? 'translate-x-4' : 'translate-x-0'
      }`}
    />
  </button>
);

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
    showToast('Preferences saved successfully', 'success');
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'workspace', label: 'Workspace', icon: Building },
    { id: 'ai', label: 'AI preferences', icon: Sparkles },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Sun },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#18181B]">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#71717A] mt-0.5">
          Manage identity, linked platform accounts, inference engines, and notifications.
        </p>
      </div>

      {/* Two-Column Settings Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
        {/* Left Navigation Sub-Sidebar */}
        <div className="space-y-0.5">
          {sections.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-black/[0.06] text-[#18181B]'
                    : 'text-[#71717A] hover:text-[#18181B] hover:bg-black/[0.03]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Form Container */}
        <div className="md:col-span-3 bg-white rounded-xl border border-black/[0.07] p-6 sm:p-7 shadow-sm space-y-6">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-sm font-semibold text-[#18181B]">Profile</h3>
                <p className="text-[#71717A] text-xs mt-0.5">Personal details and account credentials.</p>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <div className="w-12 h-12 rounded-full bg-[#FAF9F7] border border-black/[0.08] flex items-center justify-center text-[#18181B] font-semibold text-sm">
                  OB
                </div>
                <div>
                  <button
                    onClick={() => showToast('Avatar upload simulated', 'info')}
                    className="px-3 py-1.5 bg-black/[0.04] hover:bg-black/[0.07] rounded-md font-medium text-xs text-[#18181B] transition-colors"
                  >
                    Change avatar
                  </button>
                  <p className="text-[11px] text-[#A1A1AA] mt-1">Square JPG, PNG, or GIF up to 2MB</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-medium text-[#52525B]">
                  Full name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-black/[0.08] text-xs text-[#18181B] focus:outline-none focus:border-black/[0.2] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#52525B]">
                  Email address
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={e => setProfileEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-black/[0.08] text-xs text-[#18181B] focus:outline-none focus:border-black/[0.2] transition-colors"
                />
              </div>
            </div>
          )}

          {/* Workspace Section */}
          {activeSection === 'workspace' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-sm font-semibold text-[#18181B]">Workspace</h3>
                <p className="text-[#71717A] text-xs mt-0.5">Manage team namespace and subscription tier.</p>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-medium text-[#52525B]">
                  Workspace name
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={e => setWorkspaceName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-black/[0.08] text-xs text-[#18181B] focus:outline-none focus:border-black/[0.2] transition-colors"
                />
              </div>

              <div className="p-3.5 bg-[#FAF9F7] rounded-lg border border-black/[0.05] flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#18181B]">Enterprise autonomous tier</div>
                  <div className="text-[11px] text-[#71717A]">Unlimited workflow executions & continuous model reasoning</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          )}

          {/* AI Preferences */}
          {activeSection === 'ai' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-sm font-semibold text-[#18181B]">AI preferences</h3>
                <p className="text-[#71717A] text-xs mt-0.5">Default inference models and reasoning guardrails.</p>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-medium text-[#52525B]">
                  Default synthesis engine
                </label>
                <select
                  value={aiModel}
                  onChange={e => setAiModel(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-black/[0.08] text-xs text-[#18181B] font-medium focus:outline-none focus:border-black/[0.2] transition-colors"
                >
                  <option value="kairo-neural-v2">Kairo Neural Engine v2.4 (Ultra-fast, zero-latency inference)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Extreme 1M token context)</option>
                  <option value="claude-3.5-sonnet">Claude 3.5 Sonnet (Advanced code & reasoning)</option>
                </select>
              </div>

              <div className="p-4 bg-[#FAF9F7] rounded-lg border border-black/[0.05] flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-[#18181B]">Autonomous low-risk execution</div>
                  <div className="text-[11px] text-[#71717A] mt-0.5 leading-relaxed">
                    Automatically execute actions when model confidence exceeds 92% without requiring manual confirmation.
                  </div>
                </div>
                <Switch
                  checked={autoApproveLowRisk}
                  onChange={setAutoApproveLowRisk}
                />
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeSection === 'integrations' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-sm font-semibold text-[#18181B]">Connected integrations</h3>
                <p className="text-[#71717A] text-xs mt-0.5">Authorize access to cloud platforms used in workflow triggers and actions.</p>
              </div>

              <div className="space-y-2.5 pt-1">
                {/* Gmail / Workspace */}
                <div className="p-3.5 bg-[#FAF9F7] rounded-lg border border-black/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-white border border-black/[0.06] text-[#2D44D8] flex items-center justify-center font-semibold text-xs">
                      G
                    </div>
                    <div>
                      <div className="font-medium text-[#18181B]">Google Workspace</div>
                      <div className="text-[11px] text-[#71717A]">Gmail inbound triggers & Drive document storage</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('gmail')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      connectedServices.gmail
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : 'text-[#52525B] bg-white border border-black/[0.08] hover:bg-black/[0.03]'
                    }`}
                  >
                    {connectedServices.gmail ? 'Connected' : 'Connect'}
                  </button>
                </div>

                {/* Slack */}
                <div className="p-3.5 bg-[#FAF9F7] rounded-lg border border-black/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-white border border-black/[0.06] text-purple-600 flex items-center justify-center font-semibold text-xs">
                      S
                    </div>
                    <div>
                      <div className="font-medium text-[#18181B]">Slack</div>
                      <div className="text-[11px] text-[#71717A]">Channel alerts, thread summaries, and notifications</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('slack')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      connectedServices.slack
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : 'text-[#52525B] bg-white border border-black/[0.08] hover:bg-black/[0.03]'
                    }`}
                  >
                    {connectedServices.slack ? 'Connected' : 'Connect'}
                  </button>
                </div>

                {/* Notion */}
                <div className="p-3.5 bg-[#FAF9F7] rounded-lg border border-black/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-white border border-black/[0.06] text-[#18181B] flex items-center justify-center font-semibold text-xs">
                      N
                    </div>
                    <div>
                      <div className="font-medium text-[#18181B]">Notion</div>
                      <div className="text-[11px] text-[#71717A]">Sync structured database entries & meeting notes</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('notion')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      connectedServices.notion
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : 'text-[#52525B] bg-white border border-black/[0.08] hover:bg-black/[0.03]'
                    }`}
                  >
                    {connectedServices.notion ? 'Connected' : 'Connect'}
                  </button>
                </div>

                {/* GitHub */}
                <div className="p-3.5 bg-[#FAF9F7] rounded-lg border border-black/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-white border border-black/[0.06] text-[#18181B] flex items-center justify-center font-semibold text-xs">
                      GH
                    </div>
                    <div>
                      <div className="font-medium text-[#18181B]">GitHub</div>
                      <div className="text-[11px] text-[#71717A]">Triggers on PRs, release tags, and CI runs</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('github')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      connectedServices.github
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : 'text-[#52525B] bg-white border border-black/[0.08] hover:bg-black/[0.03]'
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
                <h3 className="text-sm font-semibold text-[#18181B]">Notifications</h3>
                <p className="text-[#71717A] text-xs mt-0.5">Control where alerts and milestone reports are dispatched.</p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="p-4 bg-[#FAF9F7] rounded-lg border border-black/[0.05] flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-[#18181B]">Daily executive digest</div>
                    <div className="text-[11px] text-[#71717A] mt-0.5">Summary of all automated tasks delivered each evening.</div>
                  </div>
                  <Switch
                    checked={emailAlerts}
                    onChange={setEmailAlerts}
                  />
                </div>

                <div className="p-4 bg-[#FAF9F7] rounded-lg border border-black/[0.05] flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-[#18181B]">Slack alerts for attention items</div>
                    <div className="text-[11px] text-[#71717A] mt-0.5">Immediate notifications when a workflow requires human intervention.</div>
                  </div>
                  <Switch
                    checked={slackAlerts}
                    onChange={setSlackAlerts}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === 'appearance' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-sm font-semibold text-[#18181B]">Appearance</h3>
                <p className="text-[#71717A] text-xs mt-0.5">Visual personality of your Kairo workspace.</p>
              </div>

              <div className="p-4 bg-[#FAF9F7] rounded-lg border border-black/[0.05] flex items-start gap-3">
                <Sun className="w-4 h-4 text-[#2D44D8] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-medium text-[#18181B]">Apple HIG Light Mode Standard</div>
                  <div className="text-[#71717A] text-xs leading-relaxed">
                    Kairo is deliberately architected using a calm, high-precision light theme grounded in Apple Human Interface Guidelines and modern SaaS principles. Contrast, typography, and whitespace are mathematically calibrated for long-session cognitive clarity.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action footer */}
          <div className="pt-4 border-t border-black/[0.05] flex justify-end">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg shadow-sm transition-all active:scale-[0.98]"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save preferences</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
