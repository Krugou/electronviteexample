import { spawn } from 'child_process'
import { createServer } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let electronProcess = null

async function startDev() {
  console.log('Starting Vite dev server...')
  
  // Start Vite dev server
  const server = await createServer({
    root: 'src',
    base: './',
    server: {
      port: 5173,
    },
  })
  
  await server.listen()
  
  console.log('Vite dev server started at http://localhost:5173')
  
  // Copy electron files to dist-electron for development
  const distElectronDir = path.join(__dirname, 'dist-electron')
  if (!fs.existsSync(distElectronDir)) {
    fs.mkdirSync(distElectronDir, { recursive: true })
  }

  fs.copyFileSync(
    path.join(__dirname, 'electron', 'main.js'),
    path.join(distElectronDir, 'main.js')
  )
  fs.copyFileSync(
    path.join(__dirname, 'electron', 'preload.js'),
    path.join(distElectronDir, 'preload.js')
  )

  console.log('Starting Electron...')
  
  // Start Electron
  electronProcess = spawn('electron', ['.'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: 'http://localhost:5173',
    },
  })

  electronProcess.on('close', () => {
    server.close()
    process.exit()
  })
}

startDev().catch((err) => {
  console.error('Failed to start dev server:', err)
  process.exit(1)
})
