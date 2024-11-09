// PollTableRow.js
import React, { useState } from "react";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";

function PollTableRow({ poll, index, refetch }) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = () => {
    const sure = window.confirm("Are you sure you want to delete this poll?");
    if (sure) {
      console.log(`Poll with ID: ${poll._id} has been deleted.`);
    }
  };

  return (
    <>
      {showEditForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          {/* Poll Edit Form Component would go here */}
        </div>
      )}
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
