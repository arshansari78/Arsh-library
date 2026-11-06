import React from "react";
import { createAxios, createAxiosWithToken } from "../createAxios";
import useStore from "../useStore";
import Toaster from "../../components/Base/Toaster";
import useToaster from "../Base/useToaster";
import { useNavigate } from "react-router-dom";


function useAllotmentCrud() {
  const { auth } = useStore();
  const toast = useToaster();
  const navigate = useNavigate();
  const GetAll= async (param) => {
    try {
      let res = await createAxiosWithToken(auth.token).get(
        `/Allotment/GetAll?PageNo=${param.pageNo}&&PageSize=${param.pageSize}`,
      );
      return res;
    } catch (err) {
      toast.open(err.message);
    }
  };
  const GetById= async (id) => {
    try {
      let res = await createAxiosWithToken(auth.token).get(
        `/Allotment/GetById?Id=${id}`,
      );
      return res;
    } catch (err) {
      toast.open(err.message);
    }
};
const Add= async (param) => {
  try {
    let res = await createAxiosWithToken(auth.token).post(
      `/Allotment/Add`,
      param,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
    navigate("/allotments");
  }
};
const Update= async (param) => {
  try {
    let res = await createAxiosWithToken(auth.token).post(
      `/Allotment/Update`,
      param,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
    navigate("/allotments");
  }
};
const Delete= async (id) => {
  try {
    let res = await createAxiosWithToken(auth.token).post(
      `/Allotment/Delete?Id=${id}`,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
    navigate("/allotments");
  }
};
return {GetAll,GetById,Add,Update,Delete};
}
export default useAllotmentCrud;
  


    
