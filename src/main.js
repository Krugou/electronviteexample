import './style.css'

// Counter functionality
let counter = 0
const counterElement = document.getElementById('counter')
const incrementBtn = document.getElementById('increment')
const decrementBtn = document.getElementById('decrement')
const resetBtn = document.getElementById('reset')

function updateCounter() {
  if (counterElement) {
    counterElement.textContent = counter
  }
}

if (incrementBtn) {
  incrementBtn.addEventListener('click', () => {
    counter++
    updateCounter()
  })
}

if (decrementBtn) {
  decrementBtn.addEventListener('click', () => {
    counter--
    updateCounter()
  })
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    counter = 0
    updateCounter()
  })
}

// Log to console to verify HMR is working
console.log('App initialized!')

// Check if we're running in Electron
if (window.electronAPI) {
  console.log('Running in Electron!')
} else {
  console.log('Running in browser (dev server)')
}
