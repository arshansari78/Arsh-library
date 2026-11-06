import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { IoPersonSharp } from "react-icons/io5";
import Button from "../../Base/Button";
import { RiStickyNoteFill } from "react-icons/ri";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { LiaBookSolid } from "react-icons/lia";
import { PiIdentificationCardFill } from "react-icons/pi";


import useToaster from "../../../configurations/Base/useToaster";
import useAllotmentsCrud from "../../../configurations/crud/useAllotmentCrud";
import Modal from "../../Base/Modal";
import Input from "../../Base/Input";

export default function UpdateAllotment({
  isOpen,
  setIsOpen,
  item,
  refreshData,
}) {
  const { Update } = useAllotmentsCrud();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToaster();
  const initialValues = {
    rollNo: "",
    bookId: "",
    onDate: "",
    note: "",
  };
  useEffect(() => {
    if (item) setValues({ ...item})
  }, [item])
  const validationSchema = yup.object().shape({
    rollNo: yup
      .string()
      .required("Roll No is required"),
    bookId: yup
      .string()
      .required("Book Id is required"),
    onDate: yup
      .string()
      .required("On Date is required"),
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
      handleEdit(val);
    },
  });
  const handleEdit = async (val) => {
    setIsLoading(true);
    let res = await Update(val);
    if (res.data.succeeded) {
      toast.open("Allotment updated successfully");
      refreshData()
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
          <div className="relative z-0 w-full mb-3 group">
            <Input
              id="rollNo"
              value={values.rollNo}
              onChange={handleChange}
              onBlur={handleBlur}
              text="Roll No"
              isError={touched.rollNo && errors.rollNo}
              error={errors.rollNo}
              icon={<PiIdentificationCardFill  className="w-6 h-6 ml-2" />}
            />
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <Input
              id="bookId"
              value={values.bookId}
              onChange={handleChange}
              onBlur={handleBlur}
              text="Book Id"
              isError={touched.bookId && errors.bookId}
              error={errors.bookId}
              icon={<LiaBookSolid  className="w-6 h-6 ml-2" />}
            />
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <Input
              id="onDate"
              value={values.onDate}
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              text="On Date"
              isError={touched.onDate && errors.onDate}
              error={errors.onDate}
              icon={<HiMiniCalendarDateRange className="w-6 h-6 ml-2" />}
            />
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <Input
              id="note"
              value={values.note}
              onChange={handleChange}
              onBlur={handleBlur}
              text="Note"
              isError={touched.note && errors.note}
              error={errors.note}
              icon={<RiStickyNoteFill className="w-6 h-6 ml-2" />}
            />
          
          </div>
          <Button
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
            loadingText="Adding Allotment..."
            color="btn-best4"
          >
            Save
          </Button>
        </form>
      </Modal>
  );
}