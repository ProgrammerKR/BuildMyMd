import React, { useState } from 'react';
import { SidebarLeft } from './components/SidebarLeft';
import { ToolPanel } from './components/ToolPanel';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { useEditorStore } from './store/useEditorStore';
import { Download, Share2, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const { viewMode, setViewMode, toggleSidebar, isSidebarOpen, markdown } = useEditorStore();

  const handleExport = (type: 'md' | 'html') => {
      if (type === 'md') {
          const blob = new Blob([markdown], { type: 'text/markdown' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'README.md';
          a.click();
      } else {
          alert("HTML export coming in v2 (simulated)");
      }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-200 overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-30 flex-shrink-0">
        <div className="flex items-center gap-3">
           <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
             {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
           <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded text-white flex items-center justify-center font-bold text-xs">B</div>
             <span className="font-bold text-white tracking-tight hidden sm:inline">Build<span className="text-blue-400">MyMD</span></span>
           </div>
        </div>

        <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button 
              onClick={() => setViewMode('editor')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${viewMode === 'editor' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all hidden md:block ${viewMode === 'split' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Split
            </button>
            <button 
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${viewMode === 'preview' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Preview
            </button>
        </div>

        <div className="flex items-center gap-2">
           <button 
             onClick={() => handleExport('md')}
             className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
           >
             <Download size={16} /> Export
           </button>
           <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
             <Share2 size={20} />
           </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        <SidebarLeft />
        
        {/* Dynamic Tool Panel - Overlay on mobile, Static on Desktop */}
        {isSidebarOpen && (
          <div className="absolute left-16 top-0 bottom-0 z-40 h-full shadow-2xl md:static md:shadow-none md:z-auto border-r border-slate-800 bg-slate-900 w-72 md:w-auto">
             <ToolPanel />
          </div>
        )}

        {/* Editor/Preview Area */}
        <main className="flex-1 flex flex-col min-w-0 relative bg-slate-950">
           <div className="flex-1 flex h-full">
             {/* Editor Pane */}
             <div 
               className={`
                 flex-col h-full transition-all
                 ${viewMode === 'preview' ? 'hidden' : 'flex'} 
                 ${viewMode === 'split' ? 'w-full md:w-1/2 border-r border-slate-800' : 'w-full'}
               `}
             >
                <Editor />
             </div>

             {/* Preview Pane */}
             <div 
               className={`
                 flex-col h-full transition-all bg-slate-50 dark:bg-slate-950
                 ${viewMode === 'editor' ? 'hidden' : 'flex'} 
                 ${viewMode === 'split' ? 'hidden md:flex md:w-1/2' : 'w-full'}
               `}
             >
                <Preview />
             </div>
           </div>
        </main>
      </div>
      
      {/* Mobile Overlay FAB */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button onClick={() => handleExport('md')} className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-500 active:scale-95 transition-transform">
           <Download size={20} />
        </button>
      </div>
    </div>
  );
};

export default App;