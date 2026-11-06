import React from "react";
import { createAxios, createAxiosWithToken } from "../createAxios";
import useStore from "../useStore";
import useToaster from "../Base/useToaster";
import { Navigate } from "react-router-dom";

function useBookCrud() {
  const { auth } = useStore();
  const toast = useToaster();
  const GetAll= async (param) => {
    try {
      let res = await createAxiosWithToken(auth.token).get(
        `/Book/GetAll?PageNo=${param.pageNo}&&PageSize=${param.pageSize}`,
      );
      return res;
    } catch (err) {
      toast.open(err.message);
    }
  };
   const GetById= async (id) => {
    try {
      let res = await createAxiosWithToken(auth.token).get(
        `/Book/GetById?Id=${id}`,
      );
      return res;
    } catch (err) {
      toast.open(err.message);
    }
};
const Add= async (param) => {
  try {
    let res = await createAxiosWithToken(auth.token).post(
      `/Book/Add`,
      param,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
    Navigate("/books");
  }
};
const Update= async (param) => {
  try {
    let res = await createAxiosWithToken(auth.token).post(
      `/Book/Update`,
      param,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
    navigate("/books");
  }
};
const Delete= async (id) => {
  try {
    let res = await createAxiosWithToken(auth.token).post(
      `/Book/Delete?Id=${id}`,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
    navigate("/books");
  }
};
return{GetAll,GetById,Add,Update,Delete};
}
export default useBookCrud;