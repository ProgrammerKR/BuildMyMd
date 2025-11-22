
import { MarkdownIt } from '../types';

let mdInstance: any = null;

export const getMarkdownRenderer = () => {
  if (mdInstance) return mdInstance;

  if (!window.markdownit) {
    console.warn('Markdown-it not loaded');
    return null;
  }

  // Configure markdown-it with Prism
  mdInstance = window.markdownit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str: string, lang: string) {
      if (window.Prism && lang && window.Prism.languages[lang]) {
        try {
          return `<pre class="language-${lang}"><code>${
            window.Prism.highlight(str, window.Prism.languages[lang], lang)
          }</code></pre>`;
        } catch (__) {}
      } else if (window.Prism) {
         // Fallback if language not found but Prism exists
         return `<pre class="language-text"><code>${
            window.Prism.highlight(str, window.Prism.languages['text'] || window.Prism.languages['javascript'], 'text')
         }</code></pre>`;
      }
      return `<pre class="language-none"><code>${mdInstance.utils.escapeHtml(str)}</code></pre>`;
    }
  });

  // Use Plugins if available
  if (window.markdownitEmoji) {
    mdInstance.use(window.markdownitEmoji);
  }
  
  if (window.markdownitTaskLists) {
    mdInstance.use(window.markdownitTaskLists, { enabled: true });
  }

  return mdInstance;
};
