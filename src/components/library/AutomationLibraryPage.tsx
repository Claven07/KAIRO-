import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { WorkflowTemplate } from '../../types';
import {
  Search,
  BookOpen,
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
  Filter,
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
        return <Mail className="w-5 h-5 text-blue-600" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-indigo-600" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-emerald-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-amber-600" />;
      case 'Bell':
        return <Bell className="w-5 h-5 text-blue-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-teal-600" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-indigo-600" />;
      default:
        return <Zap className="w-5 h-5 text-slate-600" />;
    }
  };

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case 'Simple':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 select-none">
      {/* Page Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-[#2547D0] border border-blue-100">
          <BookOpen className="w-3 h-3 text-[#2547D0]" />
          <span>Curated Templates</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Automation Library
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl">
          Pre-built intelligence workflows optimized for modern product teams, founders, and enterprises.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-control text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-black/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-control border border-black/[0.08] focus:outline-none focus:border-[#2547D0] focus:ring-1 focus:ring-indigo-500/20 text-slate-800 placeholder:text-slate-400 shadow-2xs"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="bg-white rounded-card border border-black/[0.07] p-5 shadow-subtle hover:shadow-card hover:border-indigo-200 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-control bg-slate-50 border border-black/[0.05] flex items-center justify-center">
                  {getTemplateIcon(template.icon)}
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full border ${getComplexityBadge(
                      template.complexity
                    )}`}
                  >
                    {template.complexity}
                  </span>
                  {template.popular && (
                    <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      POPULAR
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#2547D0] transition-colors">
                {template.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                {template.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-black/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Saves ~{template.timeSaved}</span>
              </div>

              <button
                onClick={() => loadTemplate(template)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#2547D0] hover:text-white bg-blue-50/70 hover:bg-[#2547D0] rounded-control border border-blue-100 hover:border-transparent transition-all"
              >
                <span>Use Template</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
