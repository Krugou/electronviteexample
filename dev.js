import { spawn } from 'child_process'
import { createServer } from 'vite'
import { copyElectronFiles } from './utils.js'

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
  copyElectronFiles()

  console.log('Starting Electron...')
  
  // Start Electron with error handling
  try {
    electronProcess = spawn('electron', ['.'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        VITE_DEV_SERVER_URL: 'http://localhost:5173',
      },
    })

    electronProcess.on('error', (err) => {
      console.error('Failed to start Electron:', err)
      server.close()
      process.exit(1)
    })

    electronProcess.on('close', () => {
      server.close()
      process.exit()
    })
  } catch (err) {
    console.error('Failed to spawn Electron process:', err)
    server.close()
    process.exit(1)
  }
}

startDev().catch((err) => {
  console.error('Failed to start dev server:', err)
  process.exit(1)
})
