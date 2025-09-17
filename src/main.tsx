import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './styles/countdown.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="kba-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)