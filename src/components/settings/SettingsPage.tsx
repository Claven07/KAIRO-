import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  User,
  ShieldCheck,
  Bell,
  Sparkles,
  Link as LinkIcon,
  Sun,
  Check,
  Server,
  Lock,
} from 'lucide-react';

const Switch: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none pressable ${
      checked ? 'bg-graphite' : 'bg-black/[0.12]'
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
  const [activeSection, setActiveSection] = useState('enclave');

  // Interactive settings state
  const [profileName, setProfileName] = useState('Omansh Bhatnagar');
  const [profileEmail, setProfileEmail] = useState('omansh@arasaka.corp');
  const [clusterEndpoint, setClusterEndpoint] = useState('https://node-01.enclave.internal:8443/v1');
  const [airGappedMode, setAirGappedMode] = useState(true);
  const [zeroEgressLogs, setZeroEgressLogs] = useState(true);
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
    showToast('Sovereign parameters committed to enclave keystore', 'success');
  };

  const sections = [
    { id: 'enclave', label: 'Sovereign Enclave', icon: ShieldCheck },
    { id: 'profile', label: 'Operator Identity', icon: User },
    { id: 'ai', label: 'Inference Engines', icon: Sparkles },
    { id: 'integrations', label: 'Connectors & Pipes', icon: LinkIcon },
    { id: 'notifications', label: 'Audit Alerts', icon: Bell },
    { id: 'appearance', label: 'Design System', icon: Sun },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6 select-none">
      {/* Page Header */}
      <div className="border-b border-black/[0.06] pb-5">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <span>SYSTEM CONFIG // 設定</span>
          <span>·</span>
          <span className="text-status-success font-medium">ARASAKA ENCLAVE 01</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-graphite mt-1">
          Sovereign Parameters & Cluster Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage hardware isolation, cryptographic boundary, inference nodes, and operator credentials.
        </p>
      </div>

      {/* Two-Column Settings Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Navigation Sub-Sidebar */}
        <div className="space-y-1 font-mono text-xs">
          {sections.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left pressable ${
                  isActive
                    ? 'bg-graphite text-white font-medium'
                    : 'text-slate-500 hover:text-graphite hover:bg-black/[0.03]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent' : 'text-slate-400'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Form Container */}
        <div className="md:col-span-3 bg-white rounded-lg border border-black/[0.07] p-6 sm:p-7 shadow-card space-y-6">
          {/* Sovereign Enclave Section */}
          {activeSection === 'enclave' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-sm font-semibold text-graphite">Sovereign Enclave & Air-Gap Controls</h3>
                <p className="text-slate-500 text-xs mt-0.5">Hardware boundary enforcement and zero-egress data policy.</p>
              </div>

              <div className="p-4 bg-[#FAF9F7] rounded-md border border-black/[0.06] flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-graphite font-mono">Air-Gapped Isolation Mode</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Sever all external telemetry egress. All weights, reasoning paths, and audit traces remain strictly inside local hardware.
                  </div>
                </div>
                <Switch
                  checked={airGappedMode}
                  onChange={setAirGappedMode}
                />
              </div>

              <div className="p-4 bg-[#FAF9F7] rounded-md border border-black/[0.06] flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-graphite font-mono">Zero External Log Egress</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Cryptographically sign all run logs to local append-only storage (`/var/log/kairo/audit.ledger`).
                  </div>
                </div>
                <Switch
                  checked={zeroEgressLogs}
                  onChange={setZeroEgressLogs}
                />
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Server className="w-3 h-3 text-accent" />
                  Local Cluster Inference Endpoint
                </label>
                <input
                  type="text"
                  value={clusterEndpoint}
                  onChange={e => setClusterEndpoint(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-md border border-black/[0.08] text-xs font-mono text-graphite focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="p-3.5 bg-status-success/5 rounded-md border border-status-success/20 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-status-success" />
                  <div>
                    <div className="font-medium text-graphite">HARDWARE ATTESTATION: PASS</div>
                    <div className="text-[10px] text-slate-500">TPM 2.0 · FIPS 140-3 Cryptographic Integrity Verified</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-status-success/10 text-status-success border border-status-success/30">
                  ENCLAVE SECURE
                </span>
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-sm font-semibold text-graphite">Operator Identity</h3>
                <p className="text-slate-500 text-xs mt-0.5">Authorized keyholder profile and workspace credentials.</p>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <div className="w-12 h-12 rounded-md bg-[#FAF9F7] border border-black/[0.08] flex items-center justify-center text-graphite font-mono font-semibold text-sm">
                  OB
                </div>
                <div>
                  <button
                    onClick={() => showToast('Keypair rotation simulated', 'info')}
                    className="pressable px-3 py-1.5 bg-black/[0.04] hover:bg-black/[0.07] rounded font-medium text-xs text-graphite transition-colors"
                  >
                    Rotate Operator Key
                  </button>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">SIH26117 · ARASAKA CORP ENCLAVE-01</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Operator Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-md border border-black/[0.08] text-xs text-graphite focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Enclave Email Handle
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={e => setProfileEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-md border border-black/[0.08] text-xs font-mono text-graphite focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
          )}

          {/* AI Preferences */}
          {activeSection === 'ai' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-sm font-semibold text-graphite">Inference Engines & Model Routing</h3>
                <p className="text-slate-500 text-xs mt-0.5">Prioritize on-premise local weights over encrypted cloud fallbacks.</p>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Primary Routing Matrix Engine
                </label>
                <select
                  value={aiModel}
                  onChange={e => setAiModel(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-md border border-black/[0.08] text-xs font-mono text-graphite font-medium focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="kairo-neural-v2">KAIRO Neural Core v2.4 (Air-Gapped Local Cluster)</option>
                  <option value="deepseek-r1">DeepSeek-R1 70B (Isolated On-Premises Pod)</option>
                  <option value="llama-3.3">Llama-3.3 70B (Hardware Enclave)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Encrypted Sovereign Proxy Gateway)</option>
                </select>
              </div>

              <div className="p-4 bg-[#FAF9F7] rounded-md border border-black/[0.06] flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-graphite">Autonomous Deterministic Dispatch</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Auto-execute steps when the dual-model verification consensus exceeds 94%.
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
                <h3 className="text-sm font-semibold text-graphite">Connectors & Internal Data Pipes</h3>
                <p className="text-slate-500 text-xs mt-0.5">Authorizations for air-gapped relays, internal webhooks, and git remotes.</p>
              </div>

              <div className="space-y-2.5 pt-1">
                {/* Gmail / Workspace */}
                <div className="p-3.5 bg-[#FAF9F7] rounded-md border border-black/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-white border border-black/[0.06] text-accent flex items-center justify-center font-mono font-semibold text-xs">
                      M
                    </div>
                    <div>
                      <div className="font-medium text-graphite">Internal Mail Relay (SMTP/TLS)</div>
                      <div className="text-[11px] text-slate-500">Inbound trigger listener on secure port 587</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('gmail')}
                    className={`pressable px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                      connectedServices.gmail
                        ? 'text-status-success bg-status-success/10 border border-status-success/20'
                        : 'text-slate-500 bg-white border border-black/[0.08] hover:bg-black/[0.03]'
                    }`}
                  >
                    {connectedServices.gmail ? 'BOUND' : 'CONNECT'}
                  </button>
                </div>

                {/* Slack */}
                <div className="p-3.5 bg-[#FAF9F7] rounded-md border border-black/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-white border border-black/[0.06] text-indigo-600 flex items-center justify-center font-mono font-semibold text-xs">
                      S
                    </div>
                    <div>
                      <div className="font-medium text-graphite">Team Dispatch Channel</div>
                      <div className="text-[11px] text-slate-500">Instant milestone dispatches & human approvals</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('slack')}
                    className={`pressable px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                      connectedServices.slack
                        ? 'text-status-success bg-status-success/10 border border-status-success/20'
                        : 'text-slate-500 bg-white border border-black/[0.08] hover:bg-black/[0.03]'
                    }`}
                  >
                    {connectedServices.slack ? 'BOUND' : 'CONNECT'}
                  </button>
                </div>

                {/* Notion */}
                <div className="p-3.5 bg-[#FAF9F7] rounded-md border border-black/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-white border border-black/[0.06] text-graphite flex items-center justify-center font-mono font-semibold text-xs">
                      N
                    </div>
                    <div>
                      <div className="font-medium text-graphite">Knowledge Base & Vector Store</div>
                      <div className="text-[11px] text-slate-500">Structured documentation embeddings & memory bank</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleService('notion')}
                    className={`pressable px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                      connectedServices.notion
                        ? 'text-status-success bg-status-success/10 border border-status-success/20'
                        : 'text-slate-500 bg-white border border-black/[0.08] hover:bg-black/[0.03]'
                    }`}
                  >
                    {connectedServices.notion ? 'BOUND' : 'CONNECT'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="space-y-5 text-left text-xs">
              <div>
                <h3 className="text-sm font-semibold text-graphite">Audit Alerts & Incident Escalation</h3>
                <p className="text-slate-500 text-xs mt-0.5">Control emergency interrupts and operator telemetry notifications.</p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="p-4 bg-[#FAF9F7] rounded-md border border-black/[0.06] flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-graphite">End-of-day Enclave Digest</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Complete cryptographic audit ledger delivered at 20:00.</div>
                  </div>
                  <Switch
                    checked={emailAlerts}
                    onChange={setEmailAlerts}
                  />
                </div>

                <div className="p-4 bg-[#FAF9F7] rounded-md border border-black/[0.06] flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-graphite">Emergency Interlock Alerts</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Instant operator interrupt if confidence drops below threshold.</div>
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
                <h3 className="text-sm font-semibold text-graphite">Design System Calibration</h3>
                <p className="text-slate-500 text-xs mt-0.5">Tokyo precision aesthetic standards.</p>
              </div>

              <div className="p-4 bg-[#FAF9F7] rounded-md border border-black/[0.06] flex items-start gap-3">
                <Sun className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <div className="font-medium text-graphite font-mono">SOVEREIGN GRAPHITE + WARM BONE STANDARD</div>
                  <div className="text-slate-500 text-xs leading-relaxed">
                    KAIRO operates on an intentional high-density light interface designed around Japanese typography principles, hairline dividers, and electric cobalt accents. Calibrated for 12+ hour operator shifts without optical fatigue.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action footer */}
          <div className="pt-4 border-t border-black/[0.06] flex justify-end">
            <button
              onClick={handleSave}
              className="pressable inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-graphite hover:bg-accent rounded-md shadow-2xs transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Commit Parameters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
