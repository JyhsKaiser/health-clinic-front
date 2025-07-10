import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import NavBar from './components/NavBarComp.jsx'
import RoutesApp from './routes/Routes.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <NavBar /> */}
    {/* <App /> */}

    <RoutesApp />
  </StrictMode>,
)
