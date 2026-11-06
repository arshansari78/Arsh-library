import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import DeleteAllotment from "./DeleteAllotment";
import useToaster from "../../../configurations/Base/useToaster";
import useAllotmentCrud from "../../../configurations/crud/useAllotmentCrud";
import Container from "../../Base/Container";
import Loading from "../../Base/Loading";
import UpdateAllotment from "./UpdateAllotment";

export default function ViewAllotments() {
  const [data, setData] = useState([]);
  const { GetAll } = useAllotmentCrud();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [allotmentItem, setAllotmentItem] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const toast = useToaster();

  const handleGetAllotments = async () => {
    setIsLoading(true);
    let res = await GetAll({ pageNo: 1, pageSize: 10 });
    if (res) {
      let result = res.data.result;
      let stuData = res.data.data;
      if (result.succeeded) {
        setData(stuData);
      } else {
        toast.open(result.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAllotments();
  }, []);
  return (
    <Container>
      <div className="flex items-center justify-between mb-3">
        <h1 className=" text-xl  mb-3 font-bold">Manage Allotments</h1>
        <div>
          <Link to="/allotments/add" className=" text-white btn-add3 gap-2 bg-amber-500 hover:bg-amber-600 px-2 py-2 rounded-2xl">
            
            Add Allotment
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-xs rounded-xl border border-gray-300">
        {isLoading ? (
          <Loading text="Loading Students Please wait..." />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-teal-900">
              <tr>
                <th scope="col" className=" text-white px-6 py-3 font-medium">
                  Id
                </th>
                <th scope="col" className=" text-white px-6 py-3 font-medium">
                  StudentId
                </th>
                
                <th scope="col" className=" text-white px-6 py-3 font-medium">
                  BookId
                </th>
                <th scope="col" className=" text-white px-6 py-3 font-medium">
                  BookName & Author
                </th>

                <th scope="col" className=" text-white px-6 py-3 font-medium">
                  On Date
                </th>
                <th scope="col" className=" text-white px-6 py-3 font-medium">
                  Note
                </th>
                <th scope="col" className="text-white px-6 py-3 font-medium">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-300 hover:bg-slate-100 "
                >
                  <th scope="row" className="px-6 py-4 ">
                    {item.id}
                  </th>

                  <td className="px-6 py-4 whitespace-nowrap">{item.studentId} </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.bookId} </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.book?.name} , {item.book?.author}</td>

                  <td className="px-6 py-4">{new Date(item.onDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{item.note}</td>
                  <td className="px-6 py-4 text-right flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setAllotmentItem(item);
                        setIsDeleteOpen(true);
                      }}
                      className="font-semibold text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setAllotmentItem(item);
                        setIsEditOpen(true);
                      }}
                      className="font-semibold text-green-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DeleteAllotment
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        item={allotmentItem}
        refreshData={handleGetAllotments}
      />
      <UpdateAllotment
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        item={allotmentItem}
        refreshData={handleGetAllotments}
      />
    </Container>
  );
}