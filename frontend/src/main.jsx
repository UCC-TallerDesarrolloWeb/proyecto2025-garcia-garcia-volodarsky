import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Store from './pages/store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Route path="/store" element={<Store />} />
  </StrictMode>,
)
