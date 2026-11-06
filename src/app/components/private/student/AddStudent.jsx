import React, { useState } from 'react'
import Container from '../../Base/Container'
import { PiStudentBold } from 'react-icons/pi'
import Input from '../../Base/Input'

import { useNavigate } from 'react-router-dom'
import useToaster from '../../../configurations/Base/useToaster'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Card from '../../Base/Card'

import { FaCalendarDay, FaPhoneVolume, FaRegAddressCard } from 'react-icons/fa'
import Button from '../../Base/Button'
import useStudentsCrud from '../../../configurations/crud/useStudentsCrud'

export default function AddStudent() {
    const{ Add }=useStudentsCrud()
    const[isLoading,setIsLoading]= useState(false)
    const navigate = useNavigate()
    const toast = useToaster()
    const initialValues ={
        name:"",
        address:"", 
        phoneNo:"",
        dob:""
    }
    const validationSchema =yup.object().shape({
        name:yup.string() .min(3,"Student name must be at least 3 characters") .max(20,"Student name must be at most 20 characters") .required("Student name is required"),
       
        phoneNo:yup.string() .min(10,"invalid phone number") .max(10,"invalid phone number") .required("Student phone no is required"),
        dob:yup.string().required("Student DOB is required")
    })
    const{values,handleBlur,handleChange,handleSubmit,isValid,errors,touched}= useFormik({
        initialValues,
        validationSchema,
        onSubmit(val){
            handleAdd(val)
        }
    })
    const handleAdd = async (val) => {
  setIsLoading(true);
  try {
    const res = await Add({...val, phoneNo: val.phoneNo.toString()});
    console.log(res);

    // API fail hui ya res undefined aaya
    if (!res) return;

    // Backend ke hisaab se dono path check kar liye
    const result = res.data?.result ?? res.data;

    if (result?.succeeded) {
      toast.open("Added successfully");
      navigate("/students");
    } else {
      toast.open(result?.message || "Some error occurred");
    }
  } catch (err) {
    toast.open(err?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <Container>
        <Card title="Add New Student">
        <form onSubmit={handleSubmit} >
            <div className='relative z-0 w-full mb-5  group'>
                <Input
                 id="name" 
                values={values.name} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                text="Student name" 
                isError={touched.name && errors.name} 
                error={errors.name} 
                icon={<PiStudentBold className='text-green-500 w-8 h-8'/>}/>

            </div>
            <div className='relative z-0 w-full mb-5  group'>
                <Input id="address" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                values={values.address} 
                 isError={touched.address && errors.address} 
                 error={errors.address}
                text="Student address" icon={<FaRegAddressCard className='text-amber-200 w-8 h-8'/>}/>

            </div>
            <div className='relative z-0 w-full mb-5  group'>
                <Input
                 id="phoneNo" 
                 text="Student phone no" 
                 type="number" 
                 onChange={handleChange} 
                 onBlur={handleBlur} 
                 isError={touched.phoneNo && errors.phoneNo} 
                 error={errors.phoneNo} 
                 icon={<FaPhoneVolume className='text-orange-300 w-8 h-8'/>}/>

            </div>
            <div className='relative z-0 w-full mb-5  group'>
                <Input id="dob"
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    values={values.dob} 
                    isError={touched.dob && errors.dob} 
                    error={errors.dob} 
                 text="DOB" 
                 type="date" 
                 icon={<FaCalendarDay className='text-cyan-300 w-8 h-8' />}/>

            </div>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" type='submit' disabled={!isValid} isLoading={isLoading} loadingText="Submitting...">submit</Button>

        </form>
        </Card>
    </Container>
  )
}