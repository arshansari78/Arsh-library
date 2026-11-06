import React, { useState } from "react";

import Modal from "../../Base/Modal";

import useToaster from "../../../configurations/Base/useToaster";
import useStudentsCrud from "../../../configurations/crud/useStudentsCrud";
import Button from "../../Base/Button";

export default function DeleteStudent({
  isOpen,
  setIsOpen,
  item,
  refreshData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const toasts = useToaster();
  const { Delete  } = useStudentsCrud();
  const handleDelete = async () => {
    setIsLoading(true);
    let res = await Delete (item.id);

    if (res.data.succeeded) {

      refreshData();
      setIsOpen(false);
    } else
      setIsLoading(false);
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

      <button className="text-lg font-bold text-gray-700 mb-3">
        Confirm Delete
      </button>
      
      <h3 className="mb-6 text-body">
        Are you sure you want to delete this {item?.name}?
      </h3>

      <div className="flex items-center space-x-4 justify-center">
        <Button
          onClick={handleDelete}
          color="btn-best5"
          isLoading={isLoading}
          loadingText="Deleting...">Yes, Delete</Button>

        <button
          onClick={() => setIsOpen(false)}
          className=" border border-gray-200 hover:bg-gray-100  shadow-xs font-semibold leading-5 
          rounded-md text-sm px-4 py-2.5 focus:outline-none">No, cancel</button>

      </div>
    </Modal>
  );
}