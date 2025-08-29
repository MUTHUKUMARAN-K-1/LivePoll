import React, { useState } from "react";
import { FaPlus, FaTrashAlt, FaQrcode, FaUsers, FaClock, FaGraduationCap } from "react-icons/fa";
import { useMutation } from "react-query";
import createPollService from "../services/createPollService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PollPreview from "../components/CreatePoll/PollPreview";
import PollTemplates from "../components/CreatePoll/PollTemplates";

function CreatePollForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");
  const [category, setCategory] = useState("general");
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { value: "general", label: "General", icon: <FaUsers /> },
    { value: "quiz", label: "Quiz", icon: <FaGraduationCap /> },
    { value: "feedback", label: "Feedback", icon: <FaClock /> },
    { value: "icebreaker", label: "Icebreaker", icon: <FaUsers /> }
  ];

  const handleAddOption = () => {
    if (optionInput.trim() === "" || options.length >= 6) return;
    setOptions((prev) => [...prev, optionInput.trim()]);
    setOptionInput("");
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleClearPoll = () => {
    setTitle("");
    setDescription("");
    setOptions([]);
    setOptionInput("");
    setCategory("general");
  };

  const mutation = useMutation(createPollService, {
    onSuccess: (data) => {
      toast.success("🎉 Poll created successfully!");
      handleClearPoll();
      navigate(`/poll/${data?.data?._id}`);
    },
    onError: (error) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        "Failed to create poll. Please try again.";
      toast.error(errorMessage);
    },
  });

  const handlePollSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "" || options.length < 2) {
      toast.error("Please fill all fields and add at least 2 options");
      return;
    }
    mutation.mutate({ title, description, options });
  };

  const handleTemplateSelect = (template) => {
    setTitle(template.title);
    setDescription(template.description);
    setOptions(template.options);
    setCategory(template.category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Create Engaging Poll</h1>
          <p className="text-lg text-gray-300">Design polls that students love to participate in</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates Sidebar */}
          <div className="lg:col-span-1">
            <PollTemplates onTemplateSelect={handleTemplateSelect} />
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-700/50">
              <form onSubmit={handlePollSubmit} className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    Poll Category
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        className={`btn ${category === cat.value ? 'btn-primary' : 'btn-outline'} gap-2`}
                        onClick={() => setCategory(cat.value)}
                      >
                        {cat.icon}
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Poll Title */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    Poll Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What would you like to ask your students?"
                    className="input input-bordered w-full bg-slate-700 text-white border-slate-600 focus:border-blue-400 text-lg"
                    maxLength={100}
                  />
                  <div className="text-right text-sm text-gray-400 mt-1">
                    {title.length}/100 characters
                  </div>
                </div>

                {/* Poll Description */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide context or instructions for your students..."
                    className="textarea textarea-bordered w-full bg-slate-700 text-white border-slate-600 focus:border-blue-400"
                    rows="3"
                    maxLength={300}
                  />
                  <div className="text-right text-sm text-gray-400 mt-1">
                    {description.length}/300 characters
                  </div>
                </div>

                {/* Poll Options */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    Answer Options ({options.length}/6)
                  </label>
                  
                  <div className="space-y-3 mb-4">
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 w-8">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <input
                          type="text"
                          value={option}
                          className="input input-ghost flex-1 text-white bg-transparent border-none focus:outline-none"
                          readOnly
                        />
                        {options.length > 2 && (
                          <button
                            type="button"
                            className="btn btn-error btn-sm btn-circle"
                            onClick={() => handleRemoveOption(index)}
                          >
                            <FaTrashAlt className="text-xs" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {options.length < 6 && (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + options.length)}`}
                        className="input input-bordered flex-1 bg-slate-700 text-white border-slate-600 focus:border-blue-400"
                        maxLength={50}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddOption())}
                      />
                      <button
                        type="button"
                        className="btn btn-primary gap-2"
                        onClick={handleAddOption}
                        disabled={!optionInput.trim()}
                      >
                        <FaPlus /> Add
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    className="btn btn-outline flex-1 gap-2"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <FaQrcode /> {showPreview ? 'Hide' : 'Show'} Preview
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost flex-1"
                    onClick={() => {
                      if (window.confirm("Clear all fields?")) {
                        handleClearPoll();
                      }
                    }}
                  >
                    Clear All
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-1 gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    disabled={mutation.isLoading || title.trim() === "" || options.length < 2}
                  >
                    {mutation.isLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        <FaUsers /> Create Poll
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="mt-8">
            <PollPreview 
              title={title} 
              description={description} 
              options={options} 
              category={category}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePollForm;