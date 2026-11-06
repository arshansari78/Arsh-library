import React, { useEffect, useState } from 'react'
import Container from '../../Base/Container'
import Input from '../../Base/Input'
import { PiStudentBold } from 'react-icons/pi'
import { FaAddressCard, FaBook, FaPhoneSquareAlt } from 'react-icons/fa'
import { BsFillCalendar2DateFill } from 'react-icons/bs'
import Card from '../../Base/Card'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Navigate, useNavigate } from 'react-router-dom'
import useToaster from '../../../configurations/Base/useToaster'
import useBooksCrud from '../../../configurations/crud/useBookCrud'
import Modal from '../../Base/Modal'
import { TiPencil } from 'react-icons/ti'
import { TbWorldUpload } from 'react-icons/tb'
import Button from '../../Base/Button'

export default function UpdateBook({ isOpen, setIsOpen, item, refreshData }) {
    const [isLoading, setIsLoading] = useState(false)
    const { Update } = useBooksCrud()
    const toasts = useToaster()
    const Navigate = useNavigate()
    const initialValues = {
        name: "",
        author: "",
        publication: ""
    }
    useEffect(() => {
        if (item) setValues({ ...item })
    }, [item])
    const validationSchema = yup.object().shape({
        name: yup.string().min(3, "Name must be at least 3 characters").max(20, "Name must be less than 20 characters").required("Name is required"),
        author: yup.string().required("Author is required"),
        publication: yup.string().required("Publication is required")
    })
    const { setValues, values, errors, handleSubmit, handleChange, handleBlur, touched, isValid } = useFormik({
        initialValues,
        validationSchema,
        onSubmit(values) {
            handleEdit(values)
            refreshData()
            setIsOpen(false)

        }
    })
    const handleEdit = async (values) => {
        setIsLoading(true)
        let res = await Update(values)


        if (res.data.succeeded) {
            toasts.open("Updated Successfully")
            Navigate("/books")
        }
        else toasts.open(res.data.message)
        setIsLoading(false)
    }

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <form onSubmit={handleSubmit} className='text-left'>
                    <div className='relative z-0 w-full mb-6 group'>
                        <Input id="name"
                         text="Book Name"
                          onChange={handleChange}
                           onBlur={handleBlur} 
                           value={values.name}
                            isError={touched.name && errors.name} 
                            error={errors.name} 
                            icon={<FaBook  className='w-6 h-6 text-cyan-500' />
                        } />
                    </div>
                    <div className='relative z-0 w-full mb-6 group'>
                        <Input id="author" 
                        text="Author"
                         onChange={handleChange} 
                         onBlur={handleBlur}
                          value={values.author}
                           error={errors.author} 
                           icon={<TiPencil className='w-6 h-6 text-green-500' />
                        } />
                    </div>
                    <div className='relative z-0 w-full mb-6 group'>
                        <Input id="publication" 
                        text="Publication" 
                        type="text"
                         onChange={handleChange} 
                         onBlur={handleBlur} 
                         value={values.publication} 
                         isError={touched.publication && errors.publication}
                          error={errors.publication} 
                          icon={<TbWorldUpload className='w-6 h-6 text-blue-500' />
                        } />
                    </div>
                    <Button type="submit" disabled={!isValid} isLoading={isLoading} loadingText="Saving..." >Update</Button>

                </form>
            </Modal>
        </>
    )
}