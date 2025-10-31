import { build } from 'vite'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function buildElectron() {
  console.log('Building renderer process with Vite...')
  
  // Build the renderer process
  await build({
    root: 'src',
    base: './',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
  })

  console.log('Copying Electron files...')
  
  // Create dist-electron directory
  const distElectronDir = path.join(__dirname, 'dist-electron')
  if (!fs.existsSync(distElectronDir)) {
    fs.mkdirSync(distElectronDir, { recursive: true })
  }

  // Copy main.js and preload.js
  fs.copyFileSync(
    path.join(__dirname, 'electron', 'main.js'),
    path.join(distElectronDir, 'main.js')
  )
  fs.copyFileSync(
    path.join(__dirname, 'electron', 'preload.js'),
    path.join(distElectronDir, 'preload.js')
  )

  console.log('Build complete!')
}

buildElectron().catch((err) => {
  console.error('Build failed:', err)
  process.exit(1)
})
