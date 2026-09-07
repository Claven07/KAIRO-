import React, { useState } from 'react';
import { analyticsData } from '../../data/mockData';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week');
  const activeData = analyticsData[timeRange];

  // Max value calculation for SVG chart normalization
  const maxCount = Math.max(...activeData.chartData.map(d => d.count));
  const chartHeight = 160;
  const chartWidth = 560;

  // Build SVG polygon points for smooth area chart
  const points = activeData.chartData
    .map((d, index) => {
      const x = (index / (activeData.chartData.length - 1)) * chartWidth;
      const y = chartHeight - (d.count / maxCount) * (chartHeight - 36) - 18;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span>TELEMETRY // 計測</span>
            <span>·</span>
            <span className="text-status-success flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              AIR-GAPPED COMPLIANT
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-graphite mt-1">
            Cluster Telemetry & Performance Yield
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Deterministic execution volume, enclave inference latency, and verified efficiency gains.
          </p>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-md border border-black/[0.05] self-start sm:self-auto font-mono text-xs">
          <button
            onClick={() => setTimeRange('week')}
            className={`pressable px-3 py-1 font-medium rounded transition-colors ${
              timeRange === 'week'
                ? 'bg-white text-graphite shadow-2xs'
                : 'text-slate-500 hover:text-graphite'
            }`}
          >
            7D // WEEK
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`pressable px-3 py-1 font-medium rounded transition-colors ${
              timeRange === 'month'
                ? 'bg-white text-graphite shadow-2xs'
                : 'text-slate-500 hover:text-graphite'
            }`}
          >
            30D // MONTH
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`pressable px-3 py-1 font-medium rounded transition-colors ${
              timeRange === 'quarter'
                ? 'bg-white text-graphite shadow-2xs'
                : 'text-slate-500 hover:text-graphite'
            }`}
          >
            90D // QUARTER
          </button>
        </div>
      </div>

      {/* 4 Core KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-black/[0.07] p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Automated Tasks
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="mt-2.5 text-2xl font-semibold tracking-tight text-graphite font-mono">
            {activeData.tasksCompleted}
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] text-status-success font-mono mt-1">
            <ArrowUpRight className="w-3 h-3" /> +12.4% vs PREV
          </div>
        </div>

        <div className="bg-white rounded-lg border border-black/[0.07] p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Time Reclaimed
            </span>
            <Clock className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="mt-2.5 text-2xl font-semibold tracking-tight text-graphite font-mono">
            {activeData.timeSaved}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">
            ~84h human engineering
          </div>
        </div>

        <div className="bg-white rounded-lg border border-black/[0.07] p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Execution Integrity
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
          </div>
          <div className="mt-2.5 text-2xl font-semibold tracking-tight text-graphite font-mono">
            {activeData.successRate}
          </div>
          <div className="text-[11px] text-status-success font-mono mt-1">
            HIGH-RELIABILITY SLA
          </div>
        </div>

        <div className="bg-white rounded-lg border border-black/[0.07] p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Decisions Evaluated
            </span>
            <Cpu className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="mt-2.5 text-2xl font-semibold tracking-tight text-graphite font-mono">
            {activeData.aiDecisions}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">
            AVG LATENCY: 42MS
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Execution Velocity Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-black/[0.07] p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-graphite">
                Throughput Volume
              </h3>
              <p className="text-xs text-slate-500">
                Completed autonomous mission passes inside air-gapped runtime
              </p>
            </div>
            <span className="text-xs font-mono text-slate-600 bg-[#FAF9F7] border border-black/[0.06] px-2.5 py-1 rounded">
              PEAK: {maxCount} / DAY
            </span>
          </div>

          <div className="mt-6 w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 overflow-visible"
            >
              <defs>
                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Subtle grid lines */}
              <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="rgba(0,0,0,0.04)" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="rgba(0,0,0,0.04)" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="rgba(0,0,0,0.04)" strokeDasharray="3 3" />

              {/* Area fill */}
              <polygon points={areaPoints} fill="url(#area-grad)" />

              {/* Refined line */}
              <polyline
                points={points}
                fill="none"
                stroke="#1D4ED8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {activeData.chartData.map((d, index) => {
                const x = (index / (activeData.chartData.length - 1)) * chartWidth;
                const y = chartHeight - (d.count / maxCount) * (chartHeight - 36) - 18;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#FFFFFF"
                    stroke="#1D4ED8"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-3 text-[11px] font-mono text-slate-400">
              {activeData.chartData.map((d, i) => (
                <span key={i}>{d.day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="bg-white rounded-lg border border-black/[0.07] p-6 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-graphite">
              Yield by Operational Domain
            </h3>
            <p className="text-xs text-slate-500">
              Distribution of hours saved across mission clusters
            </p>

            <div className="mt-6 space-y-4">
              {activeData.categories.map((cat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-graphite">{cat.name}</span>
                    <span className="font-mono text-slate-500">{cat.hours}h ({cat.pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-black/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-black/[0.05] text-[10.5px] font-mono text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-status-success" />
              AUTONOMOUS CORES
            </span>
            <span className="text-slate-600">SHA-256 AUDITED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
