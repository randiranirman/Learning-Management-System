import { useState } from "react";



const AddCoursePopup = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    courseName: "",
    subjectCode: "",
    teacher: "",
  });

  // Handles input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault(); // 





    
    
  };

  return (
    <div >
      <div >
        <h2 >Add Course</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <label >Course Name:</label>
            <input
              type="text"
              name="courseName"
              value={inputs.courseName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label >Subject Code:</label>
            <input
              type="text"
              name="subjectCode"
              value={inputs.subjectCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label >Teacher:</label>
            <input
              type="text"
              name="teacher"
              value={inputs.teacher}
              onChange={handleChange}
              required
            />
          </div>
          <div >
            <button
              type="submit"
             
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AddCoursePopup;
