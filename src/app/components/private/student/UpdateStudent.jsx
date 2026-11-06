import React, { useEffect, useState } from "react";
import Input from "../../Base/Input";
import { PiAddressBookDuotone, PiStudentBold } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import * as yup from "yup";
import { useFormik } from "formik";
import Modal from "../../Base/Modal";
import useToaster from "../../../configurations/Base/useToaster";
import useStudentsCrud from "../../../configurations/crud/useStudentsCrud";
import Button from "../../Base/Button";

export default function UpdateStudent({isOpen,
  setIsOpen,
  item,
  refreshData,}) {
  const { Update } = useStudentsCrud();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToaster();
  const initialValues = {
    name: "",
    address: "",
    phoneNo: "",
    dob: "",
  };

  useEffect(() => {
    if (item) setValues ({...item})
  }, [item])
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters")
      .required("Name is required"),
    phoneNo: yup
      .string()
      .min(10, "The number must be 10 digit long")
      .max(10, "The number must be 10 digit long")
      .required("Phone number is required"),
    dob: yup.string().required("DOB is required"),
  });
  const {
    setValues,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit(val) {
      handleUpdate(val);
    },
  });
  const handleUpdate = async (val) => {
    setIsLoading(true);
    let res = await Update(val);
    console.log(res);
    if (res.data.succeeded) {
      
      refreshData();
      setIsOpen(false)
    } else {
      toast.open(res.data.message);
    }
    setIsLoading(false);
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center p- m-8 "
        >
            <h1 className="mb-4 text-lg font-bold">Edit Student</h1>
          <div className="relative z-0 w-full mb-3 group">
            <Input
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              text="Student Name"
              isError={touched.name && errors.name}
              error={errors.name}
              icon={<PiStudentBold className="w-6 h-6 ml-2" />}
            />
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <Input
              id="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              text="Address"
              isError={touched.address && errors.address}
              error={errors.address}
              icon={<PiAddressBookDuotone className="w-6 h-6 ml-2 " />}
            />
          </div>
          <div className="relative z-0 w-full mb-3 group ">
            <Input
              id="phoneNo"
              value={values.phoneNo}
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              text="Phone No"
              isError={touched.phoneNo && errors.phoneNo}
              error={errors.phoneNo}
              icon={<FaPhoneAlt className="w-5 h-5 ml-2" />}
            />
          </div>
          <div className="relative z-0 w-full mb-3 group ">
            <Input
              type="date"
              id="dob"
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              text="DOB"
              isError={touched.dob && errors.dob}
              error={errors.dob}
              icon={<HiMiniCalendarDateRange className="w-6 h-6 ml-2" />}
            />
          </div>
          <Button
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
            loadingText="Updating Student..."
            color="btn-best4"
          >
            Save
          </Button>
        </form>
        </Modal>
      
  );
}