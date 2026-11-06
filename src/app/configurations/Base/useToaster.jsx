import React, { createContext, use, useContext, useState } from 'react'
import Toaster from '../../components/Base/Toaster'

const toasterContext = createContext()
const useToaster = () => useContext(toasterContext)
const ToasterProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const open = (text,type="error") => {
        let id = Date.now()
        setToasts(pre => ([...pre, { id, text,type }]))
        setTimeout(() => close(id), 3000)
    }
    const close = (id) => setToasts(pre => pre.filter(t => t.id != id))
    return (
        <toasterContext.Provider value={{ open }}>
            {children}

            <div className='fixed flex flex-col gap-3 items-center w-full max-w-xs p-4 bottom-2 end-2' role="alert">
                {toasts.map(item =>
                    <Toaster id={item.id} text={item.text} close={close} />
                )}
                
            </div>
        </toasterContext.Provider>
    )
}


export default useToaster
export { ToasterProvider }