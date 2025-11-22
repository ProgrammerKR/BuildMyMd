
import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { TEMPLATES, SECTIONS } from '../lib/templates';
import { PRESET_BADGES, generateBadgeMarkdown } from '../lib/badgeUtils';
import { BadgeConfig } from '../types';
import { Search, Plus, Copy, ChevronRight, X } from 'lucide-react';

export const ToolPanel: React.FC = () => {
  const { activeTool, insertMarkdown, setMarkdown, toggleSidebar } = useEditorStore();
  const [badgeConfig, setBadgeConfig] = useState<BadgeConfig>({
    label: 'license',
    message: 'MIT',
    color: 'blue',
    style: 'flat-square'
  });

  if (!activeTool) return null;

  const Header = ({ title }: { title: string }) => (
    <div className="flex items-center justify-between mb-4">
       <h3 className="text-lg font-semibold text-white">{title}</h3>
       <button onClick={toggleSidebar} className="md:hidden p-1 text-slate-400 hover:text-white">
          <X size={18} />
       </button>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-4">
      <div className="sticky top-0 bg-slate-900 pt-4 pb-2 z-10">
        <Header title="Templates" />
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="space-y-3 pb-4">
        {TEMPLATES.map(t => (
          <div key={t.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 hover:border-blue-500/50 hover:bg-slate-800 transition-all group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium px-2 py-0.5 bg-slate-700 rounded text-slate-300">{t.category}</span>
            </div>
            <h4 className="font-medium text-slate-200 mb-1">{t.name}</h4>
            <p className="text-xs text-slate-400 mb-3 line-clamp-2">{t.description}</p>
            <button 
              onClick={() => {
                if(confirm('Replace current content?')) setMarkdown(t.content);
              }}
              className="w-full py-1.5 bg-blue-600/10 text-blue-400 text-xs rounded hover:bg-blue-600 hover:text-white transition-colors"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="space-y-6 pt-4">
      <div>
        <Header title="Badge Builder" />
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Label</label>
            <input 
              value={badgeConfig.label}
              onChange={(e) => setBadgeConfig({...badgeConfig, label: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Message</label>
            <input 
              value={badgeConfig.message}
              onChange={(e) => setBadgeConfig({...badgeConfig, message: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Color</label>
            <div className="flex flex-wrap gap-2 mb-2">
               {['blue', 'green', 'red', 'orange', 'yellow', 'blueviolet'].map(c => (
                 <button 
                   key={c} 
                   onClick={() => setBadgeConfig({...badgeConfig, color: c})}
                   className={`w-6 h-6 rounded-full border-2 ${badgeConfig.color === c ? 'border-white' : 'border-transparent'}`}
                   style={{backgroundColor: c === 'blueviolet' ? '#8a2be2' : c}}
                 />
               ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-slate-800 rounded-lg flex flex-col items-center justify-center border border-slate-700 border-dashed">
           <img src={`https://img.shields.io/badge/${badgeConfig.label}-${badgeConfig.message}-${badgeConfig.color}?style=${badgeConfig.style}`} alt="preview" className="mb-3" />
           <button 
             onClick={() => insertMarkdown(generateBadgeMarkdown(badgeConfig))}
             className="flex items-center gap-2 text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-500 transition-colors"
           >
             <Plus size={14} /> Insert Badge
           </button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-300 mb-3">Quick Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_BADGES.map((badge, i) => (
             <button 
               key={i}
               onClick={() => insertMarkdown(generateBadgeMarkdown(badge as any))}
               className="p-2 bg-slate-800 border border-slate-700 rounded hover:border-slate-500 flex justify-center items-center h-10"
             >
               <img src={`https://img.shields.io/badge/${badge.label}-${badge.message}-${badge.color}?style=flat-square`} alt="badge" className="max-w-full" />
             </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSections = () => (
    <div className="space-y-4 pt-4">
      <Header title="Sections" />
      <div className="space-y-2">
        {Object.entries(SECTIONS).map(([key, content]) => (
          <button
            key={key}
            onClick={() => insertMarkdown("\n" + content + "\n")}
            className="w-full flex items-center justify-between p-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors text-left group"
          >
            <span className="text-sm text-slate-200 font-medium capitalize">{key.toLowerCase()}</span>
            <Plus size={16} className="text-slate-500 group-hover:text-blue-400" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderTextTools = () => (
    <div className="space-y-4 pt-4">
      <Header title="Text Tools" />
      <p className="text-xs text-slate-400 mb-4">Select text in the editor first.</p>
      
      <div className="grid grid-cols-2 gap-2">
        {['UPPERCASE', 'lowercase', 'Title Case', 'camelCase'].map(label => (
          <button key={label} className="px-3 py-2 bg-slate-800 text-slate-300 text-xs border border-slate-700 rounded hover:bg-slate-700">
            {label}
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-800">
        <h4 className="text-sm text-white mb-2">Table Generator</h4>
        <button 
          onClick={() => insertMarkdown(`
| Column 1 | Column 2 | Column 3 |
| :--- | :---: | ---: |
| Left | Center | Right |
| Text | Text | Text |
`)}
          className="w-full py-2 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded hover:bg-slate-700 flex items-center justify-center gap-2"
        >
          Insert 3x3 Table
        </button>
      </div>
    </div>
  );

  const getContent = () => {
    switch (activeTool) {
      case 'templates': return renderTemplates();
      case 'badges': return renderBadges();
      case 'sections': return renderSections();
      case 'text': return renderTextTools();
      default: return <div className="text-slate-400 text-sm p-4 pt-8">Select a tool from the sidebar.</div>;
    }
  };

  return (
    <div className="w-72 md:w-80 flex-shrink-0 bg-slate-900 h-full overflow-y-auto scrollbar-thin">
      <div className="p-4 min-h-full">
         {getContent()}
      </div>
    </div>
  );
};
