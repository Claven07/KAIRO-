import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  FileCheck2,
  Lock,
  GitBranch,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { navigateTo } = useAutomation();
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);

  const pipelineStages = [
    {
      id: 0,
      phase: 'TASK',
      jp: '任務',
      title: 'Confidential Mission Ingestion',
      badge: 'INPUT',
      desc: 'High-stakes objective stated in natural language with confidential schemata, CAD specs, or ERP database schemas.',
      telemetry: {
        source: 'Ingress Stream // Local File Vault',
        security: 'Air-gapped (Zero WAN ingress)',
        latency: '0.2ms parsing',
      },
      detail: 'Analyzes raw mission parameters, decrypts local payload tokens, and generates isolated contextual boundaries without external telemetry.',
    },
    {
      id: 1,
      phase: 'KAIRO',
      jp: '知能',
      title: 'Sovereign Neural Routing',
      badge: 'ROUTER',
      desc: 'Autonomous multi-model dispatcher evaluates mission complexity and routes to specialized on-premise models.',
      telemetry: {
        activeEngine: 'KAIRO Core v2.4 (Local Weights)',
        subAgents: 'Reasoning Specialist · Vision Unit · Code Exec',
        arbitration: 'Local consensus arbitration (99.4% confidence)',
      },
      detail: 'Routes to vision models for industrial schematics, reasoning agents for strategic workflows, or deterministic logic without single-model bottlenecking.',
    },
    {
      id: 2,
      phase: 'PLAN',
      jp: '計画',
      title: 'Verifiable Graph Compilation',
      badge: 'COMPILER',
      desc: 'Deconstructs objective into a multi-step dependency DAG with safety bounds and rollback checkpoints.',
      telemetry: {
        dagNodes: '4 verified execution nodes',
        checkpoints: '3 atomic state rollback barriers',
        concurrency: 'Zero-lock local execution',
      },
      detail: 'Validates API contracts, schema types, and permission bounds before granting execution rights to sandboxed worker processes.',
    },
    {
      id: 3,
      phase: 'EXECUTE',
      jp: '実行',
      title: 'Sandboxed Tool Execution',
      badge: 'RUN',
      desc: 'Deterministic tools invoke internal databases, API webhooks, and local compute within strict isolation.',
      telemetry: {
        sandbox: 'Isolated WASM / Docker sandbox',
        egress: 'Strictly zero outbound external leaks',
        memory: 'Transient RAM scrub on completion',
      },
      detail: 'Interacts directly with enterprise on-premise services like Jira, internal Postgres, ERP systems, and Slack through audited local bridges.',
    },
    {
      id: 4,
      phase: 'DELIVER',
      jp: '納品',
      title: 'Cryptographic Artifact Delivery',
      badge: 'OUTPUT',
      desc: 'Produces production deliverables: structured JSON, executive briefings, verified code diffs, and audit logs.',
      telemetry: {
        checksum: 'SHA-256 0x8f4c2e1a... Verified',
        receipt: 'Cryptographic execution receipt signed',
        destination: 'Executive Briefing & Audit Vault',
      },
      detail: 'Outputs complete actionable artifacts rather than conversational chat bubbles, instantly ready for human sign-off or production deployment.',
    },
  ];

  const currentStage = pipelineStages[activePipelineStep];

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#121316] flex flex-col selection:bg-indigo-100 selection:text-indigo-950 select-none">
      {/* Precision Top Bar */}
      <header className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between border-b border-black/[0.06] bg-[#FAF9F7]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#121316] flex items-center justify-center text-white font-mono font-semibold text-xs tracking-tighter shadow-2xs">
            K
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold tracking-tight text-[#121316] text-[14px]">
                KAIRO
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                カイロ
              </span>
            </div>
            <span className="text-[8.5px] text-slate-400 font-mono tracking-wider uppercase -mt-0.5">
              ARASAKA CORP // SIH26117
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-500">
          <button
            onClick={() => navigateTo('library')}
            className="hover:text-[#121316] transition-colors pressable"
          >
            Blueprints
          </button>
          <button
            onClick={() => navigateTo('builder')}
            className="hover:text-[#121316] transition-colors pressable"
          >
            Workflow Canvas
          </button>
          <button
            onClick={() => navigateTo('analytics')}
            className="hover:text-[#121316] transition-colors pressable"
          >
            Telemetry
          </button>
          <button
            onClick={() => navigateTo('settings')}
            className="hover:text-[#121316] transition-colors pressable"
          >
            Air-Gapped Node
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('overview')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#121316] hover:bg-[#1D4ED8] rounded-control shadow-2xs transition-all pressable"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-6 pt-14 pb-20 text-center">
        {/* Sovereign classification badge */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 mx-auto mb-6 rounded-control text-xs font-mono bg-white text-slate-700 border border-black/[0.08] shadow-2xs"
        >
          {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> */}
          <span className="tracking-wide p-1">SOVEREIGN ON-PREMISE AGENTIC WORKBENCH</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400">SIH26117</span>
        </motion.div>

        {/* Hero Title with Japanese Identity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-3 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#121316]">
              KAIRO
            </h1>
            <span className="text-2xl sm:text-4xl text-slate-400 font-light tracking-widest">
              カイロ
            </span>
          </div>

          <p className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-800 leading-tight">
            Sovereign intelligence. Inside your walls.
          </p>
        </motion.div>

        {/* Explanatory Statement without marketing fluff */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          An on-premise command workspace engineered for confidential industrial workflows. 
          KAIRO arbitrates across specialized local models, builds verifiable dependency graphs, 
          and executes autonomous tasks with zero external telemetry.
        </motion.p>

        {/* Primary Command Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => navigateTo('overview')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#121316] hover:bg-[#1D4ED8] rounded-control shadow-2xs transition-all pressable"
          >
            <span>Open Command Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => navigateTo('builder')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-[#121316] bg-white hover:bg-slate-50 rounded-control border border-black/[0.08] shadow-2xs transition-all pressable"
          >
            <GitBranch className="w-3.5 h-3.5 text-slate-400" />
            <span>Explore Visual Canvas</span>
          </button>
        </motion.div>

        {/* 
          PRIMARY ARCHITECTURAL VISUALIZATION:
          TASK → KAIRO → PLAN → EXECUTE → DELIVER
          Interactive, restrained, precise Tokyo enterprise aesthetic.
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14 w-full max-w-4xl mx-auto bg-white rounded-card border border-black/[0.08] shadow-card overflow-hidden text-left"
        >
          {/* Top Stage Navigation Strip */}
          <div className="p-3 bg-[#FAF9F7] border-b border-black/[0.06] flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-1 sm:gap-1.5">
              {pipelineStages.map((st, idx) => {
                const isActive = activePipelineStep === st.id;
                return (
                  <React.Fragment key={st.id}>
                    <button
                      onClick={() => setActivePipelineStep(st.id)}
                      className={`px-3 py-1.5 rounded-control text-xs font-mono font-medium transition-all pressable flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#121316] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-[#121316] hover:bg-black/[0.04]'
                      }`}
                    >
                      <span className="text-[10px] opacity-70">{st.id + 1}.</span>
                      <span>{st.phase}</span>
                    </button>
                    {idx < pipelineStages.length - 1 && (
                      <span className="text-slate-300 font-mono text-xs select-none">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <span className="text-[10.5px] font-mono text-slate-400 hidden lg:inline pl-2">
              INTERACTIVE ARCHITECTURE
            </span>
          </div>

          {/* Interactive Stage Content */}
          <div className="p-6 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Stage Overview & Description */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#1D4ED8] border border-blue-200/60">
                  STAGE 0{currentStage.id + 1} // {currentStage.badge}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#121316] tracking-tight">
                  {currentStage.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {currentStage.desc}
                </p>
              </div>

              <div className="p-3 bg-[#FAF9F7] rounded-control border border-black/[0.05] text-xs text-slate-700 leading-relaxed font-normal">
                {currentStage.detail}
              </div>

              {/* Progress Indicator Dots */}
              <div className="flex items-center gap-2 pt-2">
                {pipelineStages.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActivePipelineStep(s.id)}
                    className={`h-1.5 rounded-full transition-all ${
                      activePipelineStep === s.id
                        ? 'w-6 bg-[#1D4ED8]'
                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={`Inspect ${s.phase}`}
                    aria-label={`Inspect ${s.phase}`}
                  />
                ))}
                <span className="text-[10.5px] font-mono text-slate-400 ml-2">
                  Step {activePipelineStep + 1} of 5
                </span>
              </div>
            </div>

            {/* Right: Technical Telemetry & Inspector Panel */}
            <div className="md:col-span-5 bg-[#FAF9F7] rounded-control border border-black/[0.06] p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-black/[0.05]">
                <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider">
                  Runtime Telemetry
                </span>
                <span className="text-[9.5px] text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  VERIFIED
                </span>
              </div>

              <div className="space-y-2 text-[11px]">
                {Object.entries(currentStage.telemetry).map(([key, val], i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-slate-400 text-[9.5px] uppercase tracking-wide font-sans">
                      {key}
                    </span>
                    <span className="text-slate-800 font-mono mt-0.5 break-words">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-black/[0.05] flex items-center justify-between text-[10px] text-slate-400">
                <span>Cluster: ARASAKA-NODE</span>
                <span className="text-[#1D4ED8] font-medium">SIH-COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-[#FAF9F7]/60 border-t border-black/[0.05] flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full confidentiality guarantee · No third-party LLM transmission</span>
            </div>
            <button
              onClick={() => navigateTo('create')}
              className="text-[#1D4ED8] hover:underline font-sans font-medium text-xs mt-1 sm:mt-0"
            >
              Test with live mission prompt →
            </button>
          </div>
        </motion.div>

        {/* Core Architectural Pillars */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-5 bg-white rounded-card border border-black/[0.07] shadow-2xs space-y-2.5">
            <div className="w-7 h-7 rounded bg-[#FAF9F7] border border-black/[0.06] flex items-center justify-center text-[#121316]">
              <Lock className="w-4 h-4 text-[#1D4ED8]" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-[#121316]">
              Sovereign Air-Gapped Isolation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Execute within your data perimeter. No corporate intellectual property, industrial schemas, or logs ever leave local cluster hardware.
            </p>
          </div>

          <div className="p-5 bg-white rounded-card border border-black/[0.07] shadow-2xs space-y-2.5">
            <div className="w-7 h-7 rounded bg-[#FAF9F7] border border-black/[0.06] flex items-center justify-center text-[#121316]">
              <Cpu className="w-4 h-4 text-[#1D4ED8]" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-[#121316]">
              Multi-Agent Neural Routing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Avoid monolithic models. KAIRO partitions sub-tasks across specialized local models for vision, code synthesis, and deep logic analysis.
            </p>
          </div>

          <div className="p-5 bg-white rounded-card border border-black/[0.07] shadow-2xs space-y-2.5">
            <div className="w-7 h-7 rounded bg-[#FAF9F7] border border-black/[0.06] flex items-center justify-center text-[#121316]">
              <FileCheck2 className="w-4 h-4 text-[#1D4ED8]" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-[#121316]">
              Auditable Artifact Outputs
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Every execution generates cryptographically signed state logs, execution receipts, and verifiable deliverables ready for production deployment.
            </p>
          </div>
        </div>
      </main>

      {/* Sovereign Footer */}
      <footer className="w-full border-t border-black/[0.06] bg-white py-5 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-[11.5px]">
            <span className="font-semibold text-[#121316]">KAIRO (カイロ)</span>
            <span>—</span>
            <span>ARASAKA CORP // SIH26117 Sovereign Industrial AI</span>
          </div>
          <button
            onClick={() => navigateTo('overview')}
            className="text-[#1D4ED8] hover:underline font-medium text-xs pressable"
          >
            Launch Command Workspace →
          </button>
        </div>
      </footer>
    </div>
  );
};
