import { BadgeConfig } from '../types';

export const generateBadgeUrl = (config: BadgeConfig): string => {
  const { label, message, color, style, logo } = config;
  const safeLabel = encodeURIComponent(label.replace(/-/g, '--').replace(/_/g, '__'));
  const safeMessage = encodeURIComponent(message.replace(/-/g, '--').replace(/_/g, '__'));
  let url = `https://img.shields.io/badge/${safeLabel}-${safeMessage}-${color}?style=${style}`;
  if (logo) {
    url += `&logo=${encodeURIComponent(logo)}`;
  }
  return url;
};

export const generateBadgeMarkdown = (config: BadgeConfig): string => {
  const url = generateBadgeUrl(config);
  return `![${config.label}](${url})`;
};

export const PRESET_BADGES = [
  { label: 'build', message: 'passing', color: 'brightgreen', style: 'flat', logo: 'github' },
  { label: 'license', message: 'MIT', color: 'blue', style: 'flat', logo: '' },
  { label: 'version', message: '1.0.0', color: 'orange', style: 'flat', logo: 'npm' },
  { label: 'style', message: 'prettier', color: 'ff69b4', style: 'flat', logo: 'prettier' },
  { label: 'chat', message: 'discord', color: '5865F2', style: 'social', logo: 'discord' },
  { label: 'follow', message: 'twitter', color: '1DA1F2', style: 'social', logo: 'twitter' },
];