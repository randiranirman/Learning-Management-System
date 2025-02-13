import { useState } from "react";
import PropTypes from 'prop-types';

const AddCoursePopup = ({ onClose }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Add Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Course Name:</label>
            <input
              type="text"
              name="courseName"
              value={inputs.courseName || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-700">Subject Code:</label>
            <input
              type="text"
              name="subjectCode"
              value={inputs.subjectCode || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-700">Teacher:</label>
            <input
              type="text"
              name="teacher"
              value={inputs.teacher || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button  onClick={onClose} type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200">Save</button>
            <button onClick={onClose} className="bg-red text-white px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddCoursePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddCoursePopup;
