
import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { 
  LayoutTemplate, 
  Shield, 
  Type, 
  Github, 
  Save, 
  Settings, 
  FileText,
  BoxSelect
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
  { id: 'sections', icon: BoxSelect, label: 'Sections' },
  { id: 'badges', icon: Shield, label: 'Badges' },
  { id: 'text', icon: Type, label: 'Text Tools' },
];

export const SidebarLeft: React.FC = () => {
  const { activeTool, setActiveTool, isSidebarOpen } = useEditorStore();

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-16 flex-shrink-0 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 z-20">
      <div className="mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
           <FileText className="text-white" size={24} />
        </div>
      </div>

      <nav className="flex-1 flex flex-col space-y-4 w-full px-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTool(activeTool === item.id ? null : item.id)}
            className={`group relative p-3 rounded-xl transition-all duration-200 w-full flex justify-center
              ${activeTool === item.id 
                ? 'bg-slate-800 text-blue-400 shadow-inner' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
             }`}
          >
            <item.icon size={22} />
            {/* Tooltip */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-slate-700 z-50">
              {item.label}
            </div>
          </button>
        ))}

        {/* External GitHub Link */}
        <a
          href="https://github.com/ProgrammerKR/BuildMyMd"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-xl transition-all duration-200 w-full flex justify-center text-slate-400 hover:bg-slate-900 hover:text-slate-200"
        >
          <Github size={22} />
          <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-slate-700 z-50">
            GitHub
          </div>
        </a>
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-800 w-full px-2 flex flex-col gap-4">
         <button className="p-3 text-slate-400 hover:text-green-400 hover:bg-slate-900 rounded-xl transition-colors flex justify-center" title="Auto-saved">
            <Save size={22} />
         </button>
         <button className="p-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors flex justify-center">
            <Settings size={22} />
         </button>
      </div>
    </aside>
  );
};
