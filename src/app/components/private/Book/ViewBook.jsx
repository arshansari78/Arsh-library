import React, { use, useEffect, useState } from 'react'
import Container from '../../Base/Container'

import Loading from '../../Base/Loading'
import { Link } from 'react-router-dom'

import { IoPersonAddSharp } from 'react-icons/io5'
import useBooksCrud from '../../../configurations/crud/useBookCrud'
import DeleteBook from './Deletebook'
import UpdateBook from './Updatebook'

export default function ViewBook() {
    const [data, setData] = useState([])
    const { GetAll } = useBooksCrud()                             
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(null)
    const [BookItem, setBookItem] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleGetBooks = async () => {
        setIsLoading(true)
        let res = await GetAll({ pageNo: 1, pageSize: 10 })
        console.log(res)
        if (res) {
            let result = res.data.result
            let stuData = res.data.data
            if (result.succeeded) {
                setData(stuData)
            }
            else {
                alert(result.message)
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        handleGetBooks()
    }, [])

    return (
        <Container>
            <div className='flex items-center justify-between mb-3'>
                <h1 className='text-xl mb-3 font-extralight'>Manage Books</h1>
                <div>
                    <Link to="/books/add" className='bg-amber-400 text-white px-3 py-1 rounded-sm hover:bg-amber-300 flex items-center gap-2'><IoPersonAddSharp className='w-4 h-4 ' />Add Book</Link>
                </div>


            </div>
            <div class="relative overflow-x-auto shadow-xs hover:shadow-xl rounded-xl border border-gray-300">
                {isLoading ?
                    <Loading text='Please wait fetching...' />
                    :
                    <table class="w-full text-white text-sm text-left rtl:text-right text-body">
                        <thead class="bg-neutral-secondary-soft border-b border-default">
                            <tr className='bg-teal-900'>
                                <th  scope="col" class="px-6 py-3 font-medium">
                                    Id
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Author
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    publication
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium"></th> 
                                <th scope="col" class="px-6 py-3 font-medium"></th> 


                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item =>
                                <tr className='  border-b border-gray-300 hover:bg-slate-200'>
                                    <th  scope='row' className='text-black px-6 py-4'>
                                        {item.id}
                                    </th>
                                    <td className='text-black px-6 py-4 whitespace-nowrap'>
                                        {item.name}
                                    </td>
                                    <td className='text-black px-6 py-4'>
                                        {item.author}
                                    </td>
                                    <td className='text-black px-6 py-4'>
                                        {item.publication}
                                    </td>

                                    <td className='px-6 py-4 text-right'>
                                        <button onClick={() => {
                                            setBookItem(item)
                                            setIsDeleteOpen(true)
                                        }}

                                            className="text-amber-500 hover:text-amber-700">Delete</button>
                                    </td>
                                    <td className='px-6 py-4 text-right'>
                                        <button onClick={() => {
                                            setBookItem(item)
                                            setIsEditOpen(true)
                                        }}
                                            className="text-amber-500 hover:text-amber-700">Edit</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
            <DeleteBook isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} item={BookItem} refreshData={handleGetBooks} ></DeleteBook>
            <UpdateBook isOpen={isEditOpen} setIsOpen={setIsEditOpen} item={BookItem} refreshData={handleGetBooks}></UpdateBook>

        </Container>
    )
}