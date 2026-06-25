import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initUmami } from './analytics/umami.ts'
import { initConsent } from './consent/initConsent.ts'

initConsent()
initUmami()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
