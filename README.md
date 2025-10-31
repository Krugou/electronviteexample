# Electron Vite Example

A simple and modern Electron application built with Vite for fast development and optimized builds.

## Features

- ⚡ **Vite** - Lightning fast Hot Module Replacement (HMR)
- 🖥️ **Electron** - Cross-platform desktop application
- 🔒 **Secure** - Context isolation and preload scripts
- 🎨 **Modern UI** - Beautiful gradient design with interactive components

## Prerequisites

- Node.js 16 or higher
- npm or yarn

## Installation

```bash
npm install
```

## Development

Run the application in development mode with hot-reload:

```bash
npm run dev
```

This will:
1. Start the Vite dev server on http://localhost:5173
2. Launch the Electron application
3. Enable hot module replacement for instant updates

## Building

Build the application for production:

```bash
npm run build
```

This creates a production-ready build in the `dist` directory.

## Packaging

Package the application as a distributable:

```bash
npm run package
```

The packaged application will be in the `release` directory.

## Project Structure

```
electronviteexample/
├── electron/          # Electron main process files
│   ├── main.js       # Main process entry point
│   └── preload.js    # Preload script for secure IPC
├── src/              # Renderer process source files
│   ├── index.html    # HTML entry point
│   ├── main.js       # JavaScript application logic
│   └── style.css     # Application styles
├── build.js          # Production build script
├── dev.js            # Development server script
├── package.json      # Project dependencies and scripts
└── vite.config.js    # Vite configuration
```

## Technologies Used

- **Electron**: Framework for building cross-platform desktop apps
- **Vite**: Next-generation frontend build tool
- **JavaScript ES Modules**: Modern JavaScript with ES6+ features

## License

MIT

