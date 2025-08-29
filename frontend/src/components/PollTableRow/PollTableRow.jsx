import React from "react";
import { FaTrashAlt, FaEye, FaUsers, FaShare, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useDeletePoll from "../../hooks/useDeletePoll";
import { toast } from "react-toastify";

function PollTableRow({ poll, index, refetch }) {
  const navigator = useNavigate();
  const handleDelete = useDeletePoll(poll._id, refetch);

  const handleViewOnClick = () => {
    navigator(`/poll/${poll._id}`);
  };

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.voteCount, 0);
  
  const copyStudentLink = () => {
    const studentUrl = `${window.location.origin}/student/${poll._id}`;
    navigator.clipboard.writeText(studentUrl);
    toast.success("Student link copied to clipboard!");
  };

  return (
    <tr className="hover:bg-slate-700/30 transition-colors border-slate-600">
      <th className="text-gray-300">{index + 1}</th>
      <td>
        <div>
          <div className="font-bold text-white">{poll.title}</div>
          <div className="text-sm text-gray-400">
            {poll.options.length} options
          </div>
        </div>
      </td>
      <td className="text-gray-300 max-w-xs">
        <div className="truncate">{poll.description}</div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <FaUsers className="text-blue-400" />
          <span className="font-bold text-white">{totalVotes}</span>
          <span className="text-gray-400 text-sm">votes</span>
        </div>
      </td>
      <td>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleViewOnClick}
            className="btn btn-primary btn-sm gap-1 hover:shadow-lg transition-all duration-200"
          >
            <FaEye /> View
          </button>
          <button
            onClick={copyStudentLink}
            className="btn btn-secondary btn-sm gap-1 hover:shadow-lg transition-all duration-200"
          >
            <FaShare /> Share
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-sm gap-1 hover:shadow-lg transition-all duration-200"
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default PollTableRow;