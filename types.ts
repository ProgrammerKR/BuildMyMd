
export interface Template {
  id: string;
  name: string;
  category: 'Professional' | 'Open Source' | 'Minimal' | 'Creative' | 'Academic' | 'Documentation';
  content: string;
  description: string;
}

export interface ToolGroup {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface BadgeConfig {
  label: string;
  message: string;
  color: string;
  style: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';
  logo?: string;
}

export type EditorViewMode = 'split' | 'editor' | 'preview';

export interface MarkdownItOptions {
  html?: boolean;
  xhtmlOut?: boolean;
  breaks?: boolean;
  langPrefix?: string;
  linkify?: boolean;
  typographer?: boolean;
  quotes?: string | string[];
  highlight?: (str: string, lang: string) => string;
}

export interface MarkdownIt {
  new (options?: MarkdownItOptions): MarkdownIt;
  render(src: string, env?: any): string;
  use(plugin: any, ...params: any[]): MarkdownIt;
}

declare global {
  interface Window {
    markdownit: (options?: MarkdownItOptions) => MarkdownIt;
    markdownitEmoji: any;
    markdownitTaskLists: any;
    Prism: {
      highlightAll: () => void;
      highlight: (text: string, grammar: any, language: string) => string;
      languages: any;
    };
  }
}
