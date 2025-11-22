import React from 'react';
import { Bold, Italic, List, ListOrdered, Code, Quote, Link2, Image, Heading1, Heading2, Table, CheckSquare } from 'lucide-react';
import { useEditorStore } from '../store/useEditorStore';

export const Toolbar: React.FC = () => {
  const { insertMarkdown } = useEditorStore();

  const tools = [
    { icon: <Heading1 size={16} />, action: () => insertMarkdown('# '), tooltip: 'H1' },
    { icon: <Heading2 size={16} />, action: () => insertMarkdown('## '), tooltip: 'H2' },
    { icon: <Bold size={16} />, action: () => insertMarkdown('**bold**'), tooltip: 'Bold' },
    { icon: <Italic size={16} />, action: () => insertMarkdown('*italic*'), tooltip: 'Italic' },
    { icon: <Code size={16} />, action: () => insertMarkdown('`code`'), tooltip: 'Inline Code' },
    { icon: <Quote size={16} />, action: () => insertMarkdown('> '), tooltip: 'Quote' },
    { icon: <div className="w-px h-4 bg-slate-700 mx-1" />, action: () => {}, tooltip: '' }, // Divider
    { icon: <List size={16} />, action: () => insertMarkdown('- '), tooltip: 'Bullet List' },
    { icon: <ListOrdered size={16} />, action: () => insertMarkdown('1. '), tooltip: 'Numbered List' },
    { icon: <CheckSquare size={16} />, action: () => insertMarkdown('- [ ] '), tooltip: 'Task List' },
    { icon: <div className="w-px h-4 bg-slate-700 mx-1" />, action: () => {}, tooltip: '' },
    { icon: <Link2 size={16} />, action: () => insertMarkdown('[link text](url)'), tooltip: 'Link' },
    { icon: <Image size={16} />, action: () => insertMarkdown('![alt text](url)'), tooltip: 'Image' },
    { icon: <Table size={16} />, action: () => insertMarkdown('| Header | Header |\n| --- | --- |\n| Cell | Cell |'), tooltip: 'Table' },
  ];

  return (
    <div className="h-10 border-b border-slate-700 bg-slate-900 flex items-center px-2 space-x-1 overflow-x-auto scrollbar-thin">
      {tools.map((tool, idx) => (
        tool.tooltip ? (
          <button
            key={idx}
            onClick={tool.action}
            title={tool.tooltip}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors flex-shrink-0"
          >
            {tool.icon}
          </button>
        ) : (
          <React.Fragment key={idx}>{tool.icon}</React.Fragment>
        )
      ))}
    </div>
  );
};