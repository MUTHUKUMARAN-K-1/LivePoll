import React, { useState } from "react";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import {useMutation} from "react-query"
import deletePollService from "../../services/deletePollService";
import { toast } from "react-toastify";

function PollTableRow({ poll, index, refetch }) {
  

  const mutation = useMutation(deletePollService, {
    onSuccess : (data) => {
      console.log(data);
      refetch();
      toast.success(data?.message);
    },
    onError : (error) => {
      toast.error("An unexpected error occurred");
      console.log(error);
    }
  })

  const handleDelete = () => {
    const sure = window.confirm("Are you sure you want to delete this poll?");
    if (!sure) return;
    mutation.mutate(poll._id);
  };

  return (
    <>
     
      <tr>
        <th>{index + 1}</th>
        <td className="text-white">{poll.title}</td>
        <td className="text-gray-400 whitespace-normal break-words max-w-xs">
          {poll.description}
        </td>
        <td>
          {poll.published ? (
            <span className="badge badge-success text-white">Published</span>
          ) : (
            <span className="badge badge-warning text-white">Unpublished</span>
          )}
        </td>
        <td>
          <div className="flex md:flex-row flex-col gap-2 flex-nowrap">
            <button onClick={handleDelete} className="btn btn-sm btn-error flex items-center">
              <FaTrashAlt className="mr-1" /> Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default PollTableRow;
