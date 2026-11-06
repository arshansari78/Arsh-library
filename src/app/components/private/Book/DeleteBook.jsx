import React, { useState } from 'react'
import Modal from '../../Base/Modal'

import useToaster from '../../../configurations/Base/useToaster'
import useBooksCrud from '../../../configurations/crud/useBookCrud'

export default function DeleteBook({isOpen, setIsOpen,item, refreshData}) {
    const[isLoading, setIsLoading]= useState(false)
    const toast = useToaster()
    const { Delete } = useBooksCrud()
    const handleDelete = async () => {
        setIsLoading(true)
        let res = await  Delete (item.id)
         if(res.data.succeeded){
            toast.open("Deleted successfully")
            refreshData()
            setIsOpen(false)
        }
        else toast.open(res.data.message)
        setIsLoading(false)
    }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

                <svg class="mx-auto mb-4 text-fg-disabled w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>
                <h3 class="mb-6 text-body">Are you sure you want to delete {item?.name}?</h3>
                <div class="flex items-center space-x-4 justify-center">
                    <button onClick={handleDelete} color='btn-red' isLoading={isLoading} loadingtext='deleting...'>
                    Yes, I'm sure
                    </button>
                    <button onClick={()=>setIsOpen(false)} className='border border-gray-200 shadow-xs font-semibold leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none' >No, cancel</button>
                </div>
            
    </Modal>
  )
}