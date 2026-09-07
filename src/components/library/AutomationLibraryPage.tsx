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
        return <Mail className="w-4 h-4 text-[#2D44D8]" />;
      case 'Calendar':
        return <Calendar className="w-4 h-4 text-[#52525B]" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-[#52525B]" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-[#52525B]" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-4 h-4 text-[#52525B]" />;
      case 'Bell':
        return <Bell className="w-4 h-4 text-[#52525B]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-[#52525B]" />;
      case 'Shield':
        return <Shield className="w-4 h-4 text-[#52525B]" />;
      default:
        return <Zap className="w-4 h-4 text-[#52525B]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6 select-none">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#18181B]">
          Templates
        </h1>
        <p className="text-xs sm:text-sm text-[#71717A] max-w-xl">
          Curated workflow blueprints ready to deploy or customize for your team.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1 bg-black/[0.03] p-1 rounded-lg border border-black/[0.05]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-[#18181B] shadow-2xs'
                  : 'text-[#71717A] hover:text-[#18181B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-black/[0.08] focus:outline-none focus:border-black/[0.2] text-[#18181B] placeholder:text-[#A1A1AA] transition-colors"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="bg-white rounded-xl border border-black/[0.07] p-5 shadow-sm hover:border-black/[0.15] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF9F7] border border-black/[0.05] flex items-center justify-center">
                  {getTemplateIcon(template.icon)}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-medium text-[#71717A] px-2 py-0.5 rounded-md bg-black/[0.03] border border-black/[0.04]">
                    {template.complexity}
                  </span>
                  {template.popular && (
                    <span className="text-[10px] font-medium text-[#2D44D8] px-2 py-0.5 rounded-md bg-[#2D44D8]/[0.06] border border-[#2D44D8]/10">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xs sm:text-sm font-medium text-[#18181B] group-hover:text-[#2D44D8] transition-colors">
                {template.title}
              </h3>
              <p className="text-xs text-[#71717A] mt-1.5 line-clamp-2 leading-relaxed">
                {template.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-black/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-[#71717A]">
                <Clock className="w-3 h-3 text-[#A1A1AA]" />
                <span className="font-mono">Saves ~{template.timeSaved}</span>
              </div>

              <button
                onClick={() => loadTemplate(template)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#18181B] bg-black/[0.04] hover:bg-[#18181B] hover:text-white rounded-lg transition-all active:scale-[0.98]"
              >
                <span>Use template</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
