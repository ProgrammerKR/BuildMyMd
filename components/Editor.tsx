
import React, { useEffect, useRef } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { Toolbar } from './Toolbar';

export const Editor: React.FC = () => {
  const { markdown, setMarkdown } = useEditorStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  // Basic tab support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = markdown.substring(0, start) + "  " + markdown.substring(end);
      setMarkdown(newValue);
      
      // Restore cursor position (needs timeout in React state cycle sometimes, but simple set works usually)
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-editor-bg">
      <Toolbar />
      <div className="relative flex-1 overflow-hidden">
        <textarea
          id="editor-textarea"
          ref={textareaRef}
          value={markdown}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-editor-bg text-editor-fg p-4 font-mono text-sm resize-none focus:outline-none editor-textarea leading-relaxed scrollbar-thin"
          spellCheck={false}
          placeholder="Start typing your README..."
        />
      </div>
      <div className="h-6 bg-slate-900 border-t border-slate-800 flex items-center px-4 text-xs text-slate-500 justify-between select-none">
        <div className="flex gap-4">
           <span>{markdown.length} chars</span>
           <span>{markdown.split(/\s+/).filter(Boolean).length} words</span>
           <span>{markdown.split('\n').length} lines</span>
        </div>
        <div>Markdown</div>
      </div>
    </div>
  );
};
