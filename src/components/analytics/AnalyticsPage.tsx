import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { analyticsData } from '../../data/mockData';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week');
  const activeData = analyticsData[timeRange];

  // Max value calculation for SVG chart normalization
  const maxCount = Math.max(...activeData.chartData.map(d => d.count));
  const chartHeight = 160;
  const chartWidth = 540;

  // Build SVG polygon points for smooth area chart
  const points = activeData.chartData
    .map((d, index) => {
      const x = (index / (activeData.chartData.length - 1)) * chartWidth;
      const y = chartHeight - (d.count / maxCount) * (chartHeight - 30) - 15;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-[#2547D0] border border-blue-100 mb-1">
            <BarChart3 className="w-3 h-3 text-[#2547D0]" />
            <span>Telemetry & Insights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Automation performance
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time execution velocity, cumulative time saved, and model reasoning accuracy.
          </p>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-control border border-black/[0.08] shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              timeRange === 'week'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            This week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              timeRange === 'month'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            This month
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              timeRange === 'quarter'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            This quarter
          </button>
        </div>
      </div>

      {/* 4 Core KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card border border-black/[0.07] p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Tasks Automated
            </span>
            <div className="w-7 h-7 rounded-control bg-blue-50 text-[#2547D0] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {activeData.tasksCompleted}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
            <ArrowUpRight className="w-3 h-3" /> +12.4% vs prev period
          </span>
        </div>

        <div className="bg-white rounded-card border border-black/[0.07] p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Time Saved
            </span>
            <div className="w-7 h-7 rounded-control bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {activeData.timeSaved}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-indigo-600 font-medium mt-1">
            <Sparkles className="w-3 h-3" /> ~84 hrs developer hours
          </span>
        </div>

        <div className="bg-white rounded-card border border-black/[0.07] p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Success Rate
            </span>
            <div className="w-7 h-7 rounded-control bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {activeData.successRate}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
            High Reliability SLA
          </span>
        </div>

        <div className="bg-white rounded-card border border-black/[0.07] p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              AI Decisions
            </span>
            <div className="w-7 h-7 rounded-control bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {activeData.aiDecisions}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 mt-1">
            Avg latency: 240ms
          </span>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Execution Velocity Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-card border border-black/[0.07] p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Automation Activity
              </h3>
              <p className="text-xs text-slate-600">
                Completed workflow executions over selected interval
              </p>
            </div>
            <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              Peak: {maxCount} / day
            </span>
          </div>

          <div className="mt-6 w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 overflow-visible"
            >
              <defs>
                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2547D0" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#2547D0" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid guide lines */}
              <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />

              {/* Area fill */}
              <polygon points={areaPoints} fill="url(#area-grad)" />

              {/* Smooth line */}
              <polyline
                points={points}
                fill="none"
                stroke="#2547D0"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points on line */}
              {activeData.chartData.map((d, index) => {
                const x = (index / (activeData.chartData.length - 1)) * chartWidth;
                const y = chartHeight - (d.count / maxCount) * (chartHeight - 30) - 15;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill="#FFFFFF"
                    stroke="#2547D0"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-3 text-[11px] font-mono text-slate-600">
              {activeData.chartData.map((d, i) => (
                <span key={i}>{d.day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="bg-white rounded-card border border-black/[0.07] p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Time Saved by Domain
            </h3>
            <p className="text-xs text-slate-600">
              Distribution of hours saved across functional categories
            </p>

            <div className="mt-6 space-y-4">
              {activeData.categories.map((cat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{cat.name}</span>
                    <span className="font-mono text-slate-600">{cat.hours}h ({cat.pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#2547D0]"
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-black/[0.05] text-[11px] text-slate-600 flex items-center justify-between">
            <span>Aggregated autonomously</span>
            <span className="font-semibold text-slate-700">100% data verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
