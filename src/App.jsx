import Login from './app/components/public/Login'
import { StoreProvider } from './app/configurations/useStore'
import RouteContainer from './app/components/RouteContainer'
import { SidebarProvider } from './app/configurations/Base/useSidebar'
import Toaster from './app/components/Base/Toaster'
import { ToasterProvider } from './app/configurations/Base/useToaster'

function App() {
  return (
    <>
    <ToasterProvider>
      <StoreProvider>
         <SidebarProvider>
             <RouteContainer />
         </SidebarProvider>
      </StoreProvider>
        </ToasterProvider>
    </>
  )
}

export default App
 