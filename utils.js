import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function copyElectronFiles() {
  const distElectronDir = path.join(__dirname, 'dist-electron')
  
  // Create dist-electron directory if it doesn't exist
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
}
