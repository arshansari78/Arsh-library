import React from 'react'
import { IoIosClose } from 'react-icons/io'

export default function Modal({ isOpen, setIsOpen, children }) {
    return (
        <>
            <div className={`${isOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden 
            fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] 
            max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">

                    <div className="relative bg-white border border-gray-300 rounded-lg 
                    shadow-lg p-4 md:p-6">

                        <button onClick={() => setIsOpen(false)} type="button" className="absolute top-3
                        end-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading
                         rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center 
                         cursor-pointer" data-modal-hide="popup-modal">
                            <IoIosClose className='w-7 h-7' />
                        </button>
                        <div className='p-4 md:p-5 text-center'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div className='backdrop-blur-xs fixed inset-0 z-40'></div>}


        </>
    )
}