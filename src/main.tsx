import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Design49 from './pages/Design49'
import Design50 from './pages/Design50'
import Design51 from './pages/Design51'

// Temporary prototype switcher: ?d=49|50|51, Ctrl+Shift+1/2/3.
// Remove (restoring plain <Design49 />) once a winner ships.
const DESIGNS: Record<string, React.ComponentType> = { '49': Design49, '50': Design50, '51': Design51 }
const KEY_MAP: Record<string, string> = { Digit1: '49', Digit2: '50', Digit3: '51' }

function DesignSwitcher() {
  const param = new URLSearchParams(window.location.search).get('d')
  const [design, setDesign] = useState(param && param in DESIGNS ? param : '49')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && KEY_MAP[e.code]) {
        e.preventDefault()
        const d = KEY_MAP[e.code]
        setDesign(d)
        const url = new URL(window.location.href)
        url.searchParams.set('d', d)
        window.history.replaceState(null, '', url)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const Active = DESIGNS[design]
  return <Active key={design} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignSwitcher />
  </StrictMode>,
)
