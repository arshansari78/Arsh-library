import React, { useState } from 'react' 
import Container from '../../Base/Container' 
import { PiStudentBold } from 'react-icons/pi' 
import Input from '../../Base/Input' 
import useBookCrud from '../../../configurations/crud/useBookCrud' 
import { useNavigate } from 'react-router-dom' 
import useToaster from '../../../configurations/Base/useToaster' 
import * as yup from 'yup' 
import { useFormik } from 'formik' 
import Card from '../../Base/Card' 
 
import { FaCalendarDay, FaPhoneVolume, FaRegAddressCard } from 'react-icons/fa' 
import Button from '../../Base/Button' 
 
export default function AddBook() { 
    const{ Add }=useBookCrud() 
    const[isLoading,setIsLoading]= useState(false) 
    const navigate = useNavigate() 
    const toast = useToaster() 
    const initialValues ={ 
        id:0, 
        name:"",  
        author:"", 
        publication:"" 
    } 
    const validationSchema =yup.object().shape({ 
        id:yup.number().required("Book id is required"), 
        name:yup.string() .min(3,"book name must be at least 3 characters") .max(100,"book name must be at most 100 characters") .required("book name is required"), 
        author:yup.string() .min(3,"book author must be at least 3 characters") .max(100,"book author must be at most 100 characters") .required("book author is required"), 
        publication:yup.string() .min(3,"book publication must be at least 3 characters") .max(100,"book publication must be at most 100 characters") .required("book publication is required") 
    }) 
    const{values,handleBlur,handleChange,handleSubmit,isValid,errors,touched}= useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit(val){ 
            handleAdd(val) 
        } 
    }) 
    const handleAdd = async(val) =>{ 
        setIsLoading(true) 
       let res = await Add(val) 
        console.log(res) 
        if(res.data.succeeded){ 
            toast.open("added successfully") 
            navigate("/books") 
        } 
        else toast.open(res.data.message) 
        setIsLoading(false) 
 
    } 
  return ( 
    <Container > 
        <Card title="Add New book"> 
        <form onSubmit={handleSubmit} > 
            <div className='  relative z-0 w-full mb-5  group'> 
                <Input 
                 id="name"  
                values={values.name}  
                onChange={handleChange}  
                onBlur={handleBlur}  
                text="Book name"  
                isError={touched.name && errors.name}  
                error={errors.name}  
                icon={<PiStudentBold className='text-green-500 w-8 h-8'/>}/> 
 
            </div> 
            <div className='relative z-0 w-full mb-5  group'> 
                <Input id="author"  
                onChange={handleChange}  
                onBlur={handleBlur}  
                values={values.author}  
                 isError={touched.author && errors.author}  
                 error={errors.author} 
                text="Book author" icon={<FaRegAddressCard className='text-amber-200 w-8 h-8'/>}/> 
 
            </div> 
            <div className='relative z-0 w-full mb-5  group'> 
                <Input 
                 id="publication"  
                 text="Book publication"  
                 type="text"  
                 onChange={handleChange}  
                 onBlur={handleBlur}  
                 isError={touched.publication && errors.publication}  
                 error={errors.publication}  
                 icon={<FaPhoneVolume className='text-orange-300 w-8 h-8'/>}/> 
 
            </div> 
            <div className='relative z-0 w-full mb-5  group'> 
                <Input id="dob" 
                    onChange={handleChange}  
                    onBlur={handleBlur}  
                    values={values.dob}  
                    isError={touched.dob && errors.dob}  
                    error={errors.dob}  
                 text="Book publication date"  
                 type="date"  
                 icon={<FaCalendarDay className='text-cyan-300 w-8 h-8' />}/> 
 
            </div> 
            <Button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" type='submit' disabled={!isValid} isLoading={isLoading} loadingText="Adding book...">submit</Button> 
 
        </form> 
        </Card> 
    </Container> 
  ) 
}  // is code me jo bhi mistakes h colopur k vo svb theek kr k do 