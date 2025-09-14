import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'aos/dist/aos.css'
import { initAOS, initSectionManager } from './utils/aos.js'
import App from './App.jsx'
import './index.css'

// Initialize AOS with custom configuration
initAOS();

// Initialize section manager for exit animations
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initSectionManager();
  }, 1000); // Delay to ensure all components are mounted
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)