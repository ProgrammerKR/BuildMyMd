
import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { ZoomIn, ZoomOut, Sun, Moon, Hash } from 'lucide-react';

export const PreviewToolbar: React.FC = () => {
  const { previewSettings, updatePreviewSettings } = useEditorStore();

  return (
    <div className="h-10 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center px-4 justify-between transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Preview</span>
      </div>
      
      <div className="flex items-center gap-1">
        <button 
          onClick={() => updatePreviewSettings({ showLineNumbers: !previewSettings.showLineNumbers })}
          className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${previewSettings.showLineNumbers ? 'text-blue-500' : 'text-slate-400'}`}
          title="Toggle Line Numbers"
        >
          <Hash size={14} />
        </button>
        
        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />
        
        <button 
          onClick={() => updatePreviewSettings({ zoom: Math.max(50, previewSettings.zoom - 10) })}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut size={14} />
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[3rem] text-center select-none">
          {previewSettings.zoom}%
        </span>
        <button 
          onClick={() => updatePreviewSettings({ zoom: Math.min(200, previewSettings.zoom + 10) })}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Zoom In"
        >
          <ZoomIn size={14} />
        </button>
        
        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />
        
        <button 
          onClick={() => updatePreviewSettings({ theme: previewSettings.theme === 'light' ? 'dark' : 'light' })}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Preview Theme"
        >
          {previewSettings.theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>
    </div>
  );
};
