
import React, { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { getMarkdownRenderer } from '../lib/markdownRenderer';
import { PreviewToolbar } from './PreviewToolbar';

export const Preview: React.FC = () => {
  const { markdown, previewSettings } = useEditorStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [rendererReady, setRendererReady] = useState(false);

  // Check Renderer Availability
  useEffect(() => {
    const checkRenderer = () => {
      if (window.markdownit) {
        setRendererReady(true);
      } else {
        setTimeout(checkRenderer, 100);
      }
    };
    checkRenderer();
  }, []);

  // Render Markdown
  useEffect(() => {
    if (!rendererReady) return;
    
    const renderer = getMarkdownRenderer();
    if (renderer && contentRef.current) {
      try {
        const html = renderer.render(markdown);
        contentRef.current.innerHTML = html;
      } catch (e) {
        console.error("Markdown render error", e);
        contentRef.current.innerHTML = '<div class="p-4 text-red-400">Error rendering markdown.</div>';
      }
    }
  }, [markdown, rendererReady]);

  // Scroll Sync Logic (One-way Editor -> Preview)
  useEffect(() => {
    const handleEditorScroll = (e: Event) => {
      const editor = e.target as HTMLTextAreaElement;
      if (!scrollContainerRef.current || !editor) return;
      
      if (isScrolling) return;

      const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      const preview = scrollContainerRef.current;
      preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
    };

    const editorElement = document.getElementById('editor-textarea');
    if (editorElement) {
      editorElement.addEventListener('scroll', handleEditorScroll);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('scroll', handleEditorScroll);
      }
    };
  }, [isScrolling, rendererReady]);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors border-l border-slate-200 dark:border-slate-800 min-w-0">
       <PreviewToolbar />
       
       <div 
         ref={scrollContainerRef}
         className="flex-1 overflow-y-auto scrollbar-thin relative bg-white dark:bg-[#0d1117] transition-colors"
         onMouseEnter={() => setIsScrolling(true)}
         onMouseLeave={() => setIsScrolling(false)}
       >
         {!rendererReady ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              <span className="animate-pulse">Loading renderer...</span>
            </div>
         ) : (
           <div 
             className="mx-auto transition-all duration-200 origin-top min-h-full"
             style={{ 
               transform: `scale(${previewSettings.zoom / 100})`,
               width: `${100 / (previewSettings.zoom / 100)}%`
             }}
           >
              <div 
                ref={contentRef} 
                className={`markdown-body ${previewSettings.theme} ${previewSettings.showLineNumbers ? 'show-line-numbers' : ''}`}
              >
                {/* Content injected via useEffect */}
              </div>
           </div>
         )}
       </div>
    </div>
  );
};
