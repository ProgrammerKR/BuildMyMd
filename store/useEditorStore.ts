
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EditorViewMode } from '../types';

interface PreviewSettings {
  zoom: number;
  theme: 'light' | 'dark';
  showLineNumbers: boolean;
}

interface EditorState {
  markdown: string;
  viewMode: EditorViewMode;
  activeTool: string | null;
  isSidebarOpen: boolean;
  history: string[];
  historyIndex: number;
  previewSettings: PreviewSettings;
  
  // Actions
  setMarkdown: (content: string) => void;
  insertMarkdown: (content: string) => void;
  setViewMode: (mode: EditorViewMode) => void;
  setActiveTool: (toolId: string | null) => void;
  toggleSidebar: () => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  updatePreviewSettings: (settings: Partial<PreviewSettings>) => void;
}

const INITIAL_MARKDOWN = `# BuildMyMD

> The ultimate README editor for developers.

## 🚀 Features

- **Live Preview**: See your changes in real-time.
- **Templates**: One-click professional templates.
- **Export**: Download as .md or copy to clipboard.

## 📦 Installation

\`\`\`bash
npm install build-my-md
\`\`\`

## 🔧 Usage

\`\`\`javascript
import { build } from 'build-my-md';

build.start();
\`\`\`

| Feature | Status |
| :--- | :---: |
| Editor | ✅ |
| Preview | ✅ |
| Export | 🚧 |
`;

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      markdown: INITIAL_MARKDOWN,
      viewMode: 'split',
      activeTool: 'templates',
      isSidebarOpen: true,
      history: [INITIAL_MARKDOWN],
      historyIndex: 0,
      previewSettings: {
        zoom: 100,
        theme: 'light', // Default to light for standard GitHub look, but UI allows toggle
        showLineNumbers: false
      },

      setMarkdown: (content) => {
        const { history, historyIndex } = get();
        const newHistory = history.slice(0, historyIndex + 1);
        
        if (content !== history[historyIndex]) {
             newHistory.push(content);
             if (newHistory.length > 50) newHistory.shift();
             
             set({
               markdown: content,
               history: newHistory,
               historyIndex: newHistory.length - 1
             });
        } else {
            set({ markdown: content });
        }
      },

      insertMarkdown: (content) => {
          const current = get().markdown;
          const newContent = current + "\n" + content;
          get().setMarkdown(newContent);
      },

      setViewMode: (mode) => set({ viewMode: mode }),
      setActiveTool: (toolId) => set({ activeTool: toolId }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      undo: () => {
        const { historyIndex, history } = get();
        if (historyIndex > 0) {
          set({
            historyIndex: historyIndex - 1,
            markdown: history[historyIndex - 1]
          });
        }
      },

      redo: () => {
        const { historyIndex, history } = get();
        if (historyIndex < history.length - 1) {
          set({
            historyIndex: historyIndex + 1,
            markdown: history[historyIndex + 1]
          });
        }
      },

      reset: () => set({ markdown: INITIAL_MARKDOWN, history: [INITIAL_MARKDOWN], historyIndex: 0 }),
      
      updatePreviewSettings: (settings) => 
        set((state) => ({ previewSettings: { ...state.previewSettings, ...settings } }))
    }),
    {
      name: 'buildmymd-storage',
    }
  )
);
