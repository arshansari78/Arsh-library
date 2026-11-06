import { createContext, useContext, useState } from "react";

const sidebarContext = createContext();
const useSidebar = () => useContext(sidebarContext);
const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const open = () => {setIsSidebarOpen(true)};
    const close = () => {setIsSidebarOpen(false)};
    return (
        <sidebarContext.Provider value={{ isSidebarOpen, open, close }}>
            {children}
        </sidebarContext.Provider>
    )
}

export default useSidebar
export { SidebarProvider  };