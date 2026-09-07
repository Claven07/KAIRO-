import React, { useState } from 'react';
import { analyticsData } from '../../data/mockData';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#18181B]">
            Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-0.5">
            Velocity, execution volume, and efficiency across all active workflows.
          </p>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-lg border border-black/[0.05] self-start sm:self-auto">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              timeRange === 'week'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            This week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              timeRange === 'month'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            This month
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              timeRange === 'quarter'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            This quarter
          </button>
        </div>
      </div>

      {/* 4 Core KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-black/[0.07] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#71717A]">
              Tasks automated
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-[#2D44D8]" />
          </div>
          <div className="mt-2.5 text-2xl font-semibold tracking-tight text-[#18181B] font-mono">
            {activeData.tasksCompleted}
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
            <ArrowUpRight className="w-3 h-3" /> +12.4% vs prev period
          </div>
        </div>

        <div className="bg-white rounded-xl border border-black/[0.07] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#71717A]">
              Time saved
            </span>
            <Clock className="w-3.5 h-3.5 text-[#52525B]" />
          </div>
          <div className="mt-2.5 text-2xl font-semibold tracking-tight text-[#18181B] font-mono">
            {activeData.timeSaved}
          </div>
          <div className="text-[11px] text-[#71717A] mt-1">
            ~84 hours engineering time
          </div>
        </div>

        <div className="bg-white rounded-xl border border-black/[0.07] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#71717A]">
              Success rate
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="mt-2.5 text-2xl font-semibold tracking-tight text-[#18181B] font-mono">
            {activeData.successRate}
          </div>
          <div className="text-[11px] text-[#71717A] mt-1">
            High reliability SLA
          </div>
        </div>

        <div className="bg-white rounded-xl border border-black/[0.07] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#71717A]">
              Decisions evaluated
            </span>
            <Cpu className="w-3.5 h-3.5 text-[#52525B]" />
          </div>
          <div className="mt-2.5 text-2xl font-semibold tracking-tight text-[#18181B] font-mono">
            {activeData.aiDecisions}
          </div>
          <div className="text-[11px] text-[#71717A] mt-1 font-mono">
            Avg latency 240ms
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Execution Velocity Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-black/[0.07] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#18181B]">
                Execution volume
              </h3>
              <p className="text-xs text-[#71717A]">
                Completed workflow executions over the selected period
              </p>
            </div>
            <span className="text-xs font-mono text-[#52525B] bg-[#FAF9F7] border border-black/[0.05] px-2.5 py-1 rounded-md">
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
                  <stop offset="0%" stopColor="#2D44D8" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#2D44D8" stopOpacity="0.0" />
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
                stroke="#2D44D8"
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
                    stroke="#2D44D8"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-3 text-[11px] font-mono text-[#71717A]">
              {activeData.chartData.map((d, i) => (
                <span key={i}>{d.day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="bg-white rounded-xl border border-black/[0.07] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#18181B]">
              Time saved by domain
            </h3>
            <p className="text-xs text-[#71717A]">
              Distribution of hours saved across categories
            </p>

            <div className="mt-6 space-y-4">
              {activeData.categories.map((cat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#18181B]">{cat.name}</span>
                    <span className="font-mono text-[#71717A]">{cat.hours}h ({cat.pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-black/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#2D44D8]"
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-black/[0.05] text-[11px] text-[#71717A] flex items-center justify-between">
            <span>Aggregated autonomously</span>
            <span className="font-medium text-[#52525B]">Verified telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
};
