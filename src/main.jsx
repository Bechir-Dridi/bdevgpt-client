// developed by "Bechir Dridi"
// Portfolio: https://bechirdev.netlify.app
// twitter:   https://twitter.com/bechir7dridi
// linkedin:  https://linkedin.com/in/bechir-dev/
// github:    https://github.com/Bechir-Dridi
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChatContextProvider } from './context/chatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </React.StrictMode>,
)
