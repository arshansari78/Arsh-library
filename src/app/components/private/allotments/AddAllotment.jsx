import React, { useState } from "react";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { RiStickyNoteFill } from "react-icons/ri";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { LiaBookSolid } from "react-icons/lia";
import { PiIdentificationCardFill } from "react-icons/pi";

import Button from "../../Base/Button";
import useToaster from "../../../configurations/Base/useToaster";
import useAllotmentCrud from "../../../configurations/crud/useAllotmentCrud";
import Container from "../../Base/Container";
import Card from "../../Base/Card";
import Input from "../../Base/Input";

export default function AddAllotment() {
  const { Add } = useAllotmentCrud();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToaster();

  const initialValues = {
    studentId: "",
    bookId: "",
    onDate: "",
    note: "",
  };

  const validationSchema = yup.object().shape({
    studentId: yup.string().required("Student Id is required"),
    bookId: yup.string().required("Book Id is required"),
    onDate: yup.string().required("On Date is required"),
  });

  const {
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
      handleAdd(val);
    },
  });

  const handleAdd = async (val) => {
    setIsLoading(true);
    try {
      const payload = {
        studentId: Number(val.studentId),
        bookId: Number(val.bookId),
        onDate: val.onDate,
        note: val.note,
      };

      const res = await Add(payload);
      console.log(res);

      if (!res) return;

      if (res.data?.succeeded) {
        toast.open("Allotment added successfully");
        navigate("/allotments");
      } else {
        toast.open(res.data?.message || "Some error occurred");
      }
    } catch (err) {
      toast.open(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card title="Add Allotment">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center m-8"
        >
          <div className="relative z-0 w-full mb-3 group">
            <Input
              id="studentId"
              value={values.studentId}
              onChange={handleChange}
              onBlur={handleBlur}
              text="Student Id"
              isError={touched.studentId && errors.studentId}
              error={errors.studentId}
              icon={<PiIdentificationCardFill className="w-6 h-6 ml-2" />}
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
              icon={<LiaBookSolid className="w-6 h-6 ml-2" />}
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
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            
          >
            Save
          </Button>
        </form>
      </Card>
    </Container>
  );
}