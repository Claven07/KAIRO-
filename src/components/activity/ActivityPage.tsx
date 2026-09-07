import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  ArrowRight,
  Terminal,
} from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { activities } = useAutomation();
  const [filter, setFilter] = useState<'all' | 'success' | 'warning'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('act-1');

  const filteredActivities = activities.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#18181B]">
            Activity log
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-0.5">
            Audit trail of workflow executions, event triggers, and reasoning traces.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-lg border border-black/[0.05] self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            All <span className="text-[11px] text-[#A1A1AA] ml-1">{activities.length}</span>
          </button>
          <button
            onClick={() => setFilter('success')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'success'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            Successful
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'warning'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            Attention
          </button>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="space-y-3">
        {filteredActivities.map((act) => {
          const isExpanded = expandedId === act.id;
          const isSuccess = act.status === 'success';

          return (
            <div
              key={act.id}
              className="bg-white rounded-xl border border-black/[0.07] shadow-sm overflow-hidden transition-all"
            >
              {/* Row Header */}
              <div
                onClick={() => toggleExpand(act.id)}
                className="p-4 sm:p-4.5 flex items-start justify-between gap-4 cursor-pointer hover:bg-black/[0.015] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isSuccess
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-medium text-[#18181B] leading-snug">
                      {act.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-[#71717A]">
                      <span className="font-medium text-[#52525B]">
                        {act.workflowName}
                      </span>
                      <span>·</span>
                      <span>{act.timestamp}</span>
                      <span>·</span>
                      <span className="font-mono text-[11px] text-[#71717A]">
                        {act.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[#71717A] shrink-0">
                  <span className="text-[11px] hidden sm:inline">
                    {isExpanded ? 'Hide trace' : 'Inspect'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>

              {/* Expandable Trace Panel */}
              {isExpanded && (
                <div className="p-4 sm:p-5 bg-[#FAF9F7]/70 border-t border-black/[0.05] space-y-3.5 text-xs text-[#52525B]">
                  {/* Event Trigger */}
                  <div>
                    <span className="text-[11px] font-medium text-[#71717A] block mb-1">
                      Event trigger
                    </span>
                    <p className="p-3 bg-white rounded-lg border border-black/[0.06] font-mono text-[11px] text-[#18181B] leading-relaxed">
                      {act.triggerEvent}
                    </p>
                  </div>

                  {/* AI Reasoning Chain */}
                  <div>
                    <span className="text-[11px] font-medium text-[#71717A] block mb-1">
                      Reasoning trace
                    </span>
                    <p className="p-3 bg-white rounded-lg border border-black/[0.06] text-[#18181B] leading-relaxed text-xs">
                      {act.reasoningSummary}
                    </p>
                  </div>

                  {/* Action Dispatch */}
                  <div>
                    <span className="text-[11px] font-medium text-[#71717A] block mb-1">
                      Action payload
                    </span>
                    <p className="p-3 bg-white rounded-lg border border-black/[0.06] font-mono text-[11px] text-[#18181B]">
                      {act.payloadSummary}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-[11px] text-[#71717A]">
                    <span>Processed {act.dataProcessed}</span>
                    <span className="font-mono text-[#52525B]">Checksum 0x4f92 · Verified</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
