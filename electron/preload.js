import { contextBridge, ipcRenderer } from 'electron'

// Whitelist of valid channels for IPC communication
const VALID_SEND_CHANNELS = ['toMain']
const VALID_RECEIVE_CHANNELS = ['fromMain']

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Add any IPC methods you need here
  send: (channel, data) => {
    if (VALID_SEND_CHANNELS.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    if (VALID_RECEIVE_CHANNELS.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  },
})
