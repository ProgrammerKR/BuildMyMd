import { Template } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 't-standard',
    name: 'Standard Readme',
    category: 'Professional',
    description: 'A balanced template for most software projects.',
    content: `# Project Name

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

Short description of the project.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

Explain how to use your project here.
`
  },
  {
    id: 't-minimal',
    name: 'Minimalist',
    category: 'Minimal',
    description: 'Clean and simple for small utilities.',
    content: `# Minimal Project

> One liner description.

## Get Started

1. Clone
2. Run
3. Enjoy

License: MIT
`
  },
  {
    id: 't-opensource',
    name: 'Open Source Hero',
    category: 'Open Source',
    description: 'Includes contributors, sponsorship, and code of conduct.',
    content: `# Open Source Project

<div align="center">
  <img src="https://picsum.photos/800/200" alt="Banner" />
  <br />
  <h1>Awesome Tool</h1>
</div>

## 🤝 Contributing

Contributions are always welcome! Please read the \`contribution guidelines\` first.

## 🌟 Contributors

Thanks to these wonderful people:

<!-- contributor list -->

## 📜 License

[MIT](LICENSE)
`
  },
  {
    id: 't-api',
    name: 'API Documentation',
    category: 'Documentation',
    description: 'Structured for REST/GraphQL API docs.',
    content: `# API Reference

Base URL: \`https://api.example.com/v1\`

## Authentication

Include your API key in the header:
\`Authorization: Bearer <token>\`

## Endpoints

### GET /users

Returns a list of users.

| Param | Type | Description |
| :--- | :--- | :--- |
| page | int | Page number |
| limit | int | Items per page |

`
  }
];

export const SECTIONS = {
  CONTRIBUTING: `## 🤝 Contributing\n\n1. Fork the Project\n2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)\n3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)\n4. Push to the Branch (\`git push origin feature/AmazingFeature\`)\n5. Open a Pull Request`,
  LICENSE: `## 📝 License\n\nDistributed under the MIT License. See \`LICENSE\` for more information.`,
  BADGES: `![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-yellow)`
};