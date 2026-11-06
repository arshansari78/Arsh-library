import { useNavigate } from "react-router-dom";
import useToaster from "../Base/useToaster";
import useStore from "../useStore";
import { createAxiosWithToken } from "../createAxios";

export function useStudentsCrud() {
  const { auth } = useStore();
  const toast = useToaster();
  const navigate = useNavigate();
  const GetAll= async (param) => {
    try {
      let res = await createAxiosWithToken(auth.token).get(
        `/Student/GetAll?PageNo=${param.pageNo}&PageSize=${param.pageSize}`,
      );
      return res;
    } catch (err) {
      toast.open(err.message);
    }
};
const GetById= async (id) => {
  try {
    let res = await createAxiosWithToken(auth.token).get(
      `/Student/GetById?Id=${id}`,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
  }
};
const Add= async (param) => {
  try {
    let res = await createAxiosWithToken(auth.token).post(
      `/Student/Add`,
      param,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
    navigate("/students");
  }
};
const Update= async (param) => {
  try {
    let res = await createAxiosWithToken(auth.token).post(
      `/Student/Update`,
      param,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
    navigate("/students");
  }
};
const Delete= async (id) => {
  try {
    let res = await createAxiosWithToken(auth.token).post(
      `/Student/Delete?Id=${id}`,
    );
    return res;
  } catch (err) {
    toast.open(err.message);
  }
};
return { GetAll, GetById, Add, Update, Delete };
}
export default useStudentsCrud;