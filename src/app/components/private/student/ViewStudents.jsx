import React, { use, useEffect, useState } from 'react'

import useStudentsCrud from '../../../configurations/crud/useStudentsCrud'

import { Link } from 'react-router-dom'
import { IoPersonAddSharp } from 'react-icons/io5'
import DeleteStudent from './DeleteStudent'
import Container from '../../Base/Container'
import Loading from '../../Base/Loading'
import UpdateStudent from './UpdateStudent'
import useStore from '../../../configurations/useStore'

export default function ViewStudent() {
    const [data, setData] = useState([])
    const { GetAll } = useStudentsCrud()
const [isDeleteOpen,  setIsDeleteOpen]= useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const[studentItem, setStudentItem]= useState(null)
    const[isUpdateOpen, setIsUpdateOpen] = useState(null)

    const handleGetStudent = async () => {
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
        handleGetStudent()
    }, [])

    return (
        <Container>
            <div className='flex items-center justify-between mb-3'>
                <h1 className='text-xl mb-3 font-bold'>Student Details</h1>
                <div>
                    <Link to="/students/add" className='bg-amber-500 text-white px-3 py-1 rounded-sm hover:bg-amber-600 flex items-center gap-2'><IoPersonAddSharp className='w-4 h-4' />Add Student</Link>
                </div>


            </div>
            <div className="relative overflow-x-auto shadow-xs  hover:shadow-xl rounded-xl border border-green-300 ">
                {isLoading ?
                    <Loading text='Please wait fetching...' />
                    :
                    <table className="w-full text-sm text-left rtl:text-right text-body ">
                        <thead className="bg-neutral-secondary-soft border-b border-default">
                            <tr className='bg-teal-900 text-white'>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Id
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Address
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Phone
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    DOB
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    
                                </th>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    
                                </th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item =>
                                <tr className='border-b border-gray-300 hover:bg-slate-200'>
                                    <th scope='row' className='px-6 py-4'>
                                        {item.id}
                                    </th>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {item.name}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {item.address}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {item.phoneNo}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {item.dob}
                                    </td>
                                    <td className='px-6 py-4 text-right'>
                                        <button onClick={()=> {
                                            setStudentItem(item)
                                            setIsDeleteOpen(true) }} 
                                        className="text-amber-500 hover:text-amber-700 hover: underline">Delete</button>
                                    </td>
                                    <td className='px-6 py-4 text-right'>
                                        <button onClick={()=>{
                                            setStudentItem(item)
                                            setIsUpdateOpen(true)
                                        }} 
                                        className="text-amber-500 hover:text-amber-700 hover: underline">Update</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
<DeleteStudent isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} item={studentItem} refreshData={handleGetStudent} ></DeleteStudent>
<UpdateStudent isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} item={studentItem} refreshData={handleGetStudent}></UpdateStudent>
        </Container>
    )
}