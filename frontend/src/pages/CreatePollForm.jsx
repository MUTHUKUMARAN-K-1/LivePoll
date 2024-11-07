// CreatePollForm.js
import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

function CreatePollForm() {
  const [options, setOptions] = useState(["Option 1", "Option 2"]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-base-100 p-6 rounded-lg shadow-md text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Poll</h1>

        {/* Poll Title */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Poll Title</label>
          <input
            type="text"
            placeholder="Enter poll title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Poll Description */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            placeholder="Describe the purpose of the poll"
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>

        {/* Poll Options */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                placeholder={`Option ${index + 1}`}
                className="input input-bordered w-full"
                readOnly
              />
              {options.length > 2 && (
                <button
                  className="btn btn-error btn-circle btn-xs ml-2"
                  title="Remove option"
                >
                  <FaTrashAlt />
                </button>
              )}
            </div>
          ))}
          <button className="btn btn-primary w-full mt-2" title="Add another option">
            <FaPlus className="mr-2" /> Add Option
          </button>
        </div>

        {/* Submit Button */}
        <button className="btn btn-success w-full mt-4">Create Poll</button>
      </div>
    </div>
  );
}

export default CreatePollForm;
