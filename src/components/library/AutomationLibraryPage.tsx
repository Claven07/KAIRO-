import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  Search,
  ArrowRight,
  Clock,
  Zap,
  Mail,
  Calendar,
  BarChart3,
  FileText,
  FileSpreadsheet,
  Bell,
  MessageSquare,
  Shield,
} from 'lucide-react';

export const AutomationLibraryPage: React.FC = () => {
  const { templates, loadTemplate } = useAutomation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Communication',
    'Productivity',
    'Documents',
    'Analytics',
    'Scheduling',
  ];

  const filteredTemplates = templates.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTemplateIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-3.5 h-3.5 text-accent" />;
      case 'Calendar':
        return <Calendar className="w-3.5 h-3.5 text-amber-600" />;
      case 'BarChart3':
        return <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />;
      case 'FileText':
        return <FileText className="w-3.5 h-3.5 text-slate-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Bell':
        return <Bell className="w-3.5 h-3.5 text-cyan-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-600" />;
      case 'Shield':
        return <Shield className="w-3.5 h-3.5 text-status-success" />;
      default:
        return <Zap className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6 select-none">
      {/* Page Header */}
      <div className="border-b border-black/[0.06] pb-5">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <span>BLUEPRINTS // 設計図</span>
          <span>·</span>
          <span>ENTERPRISE TEMPLATE CATALOG</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-graphite mt-1">
          Industrial Blueprints & Proven Routines
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-xl">
          Pre-validated agentic architectures engineered for confidential operations and immediate canvas instantiation.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1 bg-black/[0.03] p-1 rounded-md border border-black/[0.05]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pressable px-3 py-1 rounded text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-graphite shadow-2xs'
                  : 'text-slate-500 hover:text-graphite'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter blueprints..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-md border border-black/[0.08] focus:outline-none focus:border-accent text-graphite placeholder:text-slate-400 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="bg-white rounded-lg border border-black/[0.07] p-5 shadow-card hover:border-accent/40 hover:shadow-float transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded bg-[#FAF9F7] border border-black/[0.06] flex items-center justify-center">
                  {getTemplateIcon(template.icon)}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-black/[0.03] border border-black/[0.04] uppercase">
                    {template.complexity}
                  </span>
                  {template.popular && (
                    <span className="text-[9.5px] font-mono font-medium text-accent px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                      RECOMMENDED
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xs sm:text-sm font-medium text-graphite group-hover:text-accent transition-colors">
                {template.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                {template.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-black/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400 font-mono">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>SAVINGS: ~{template.timeSaved}</span>
              </div>

              <button
                onClick={() => loadTemplate(template)}
                className="pressable inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-graphite bg-slate-100 hover:bg-graphite hover:text-white rounded transition-all"
              >
                <span>Instantiate</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
