
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './app/configurations/useStore.jsx'

createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <App />
    </StoreProvider>
  
)
 