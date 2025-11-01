import { build } from 'vite'
import { copyElectronFiles } from './utils.js'

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
  copyElectronFiles()

  console.log('Build complete!')
}

buildElectron().catch((err) => {
  console.error('Build failed:', err)
  process.exit(1)
})
