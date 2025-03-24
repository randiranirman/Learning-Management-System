import { useState } from "react";

const QuizCreation = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [quizNumber, setQuizNumber] = useState(5); // Default number of questions
  const [questions, setQuestions] = useState([]);
  const[ showSaveButton, setShowSaveButton] = useState(false);
  // Function to add a new question (only if the limit is not reached)
  const addQuestion = () => {
    if (questions.length < quizNumber) {
      setQuestions([...questions, { text: "", type: "MCQ" }]);
    }
  };

  // Function to update question text
  const updateQuestionText = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  // Function to update question type
  const updateQuestionType = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="flex justify-center">
      <div className="mt-2 max-w-2xl w-full px-6">
        {/* Quiz Title */}
        <div className="flex flex-col">
          <label className="font-semibold">Quiz Title</label>
          <input
            type="text"
            placeholder="Enter the Quiz Title"
            className="border rounded-lg mt-2 px-2 py-2"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />

          {/* Select Subject */}
          <label className="font-semibold mt-2">Select Subject</label>
          <select
            className="border rounded-lg mt-2 px-2 py-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select a Subject</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select>

          {/* Select Class */}
          <label className="font-semibold mt-2">Select Class</label>
          <select
            className="border rounded-lg mt-2 px-2 py-2"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select a Class</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
          </select>

          {/* Number of Questions */}
          <label className="font-semibold mt-2">Enter the Number of Questions</label>
          <input
            type="number"
            placeholder="Enter Number of Questions"
            className="border rounded-lg mt-2 px-2 py-2"
            value={quizNumber}
            onChange={(e) => setQuizNumber(Number(e.target.value))}
          />
        </div>

        {/* Questions Section */}
        <div className="mt-4">
          <h2 className="font-semibold text-lg">Questions</h2>

          {questions.map((question, index) => (
            <div key={index} className="mt-4 border p-4 rounded-lg">
              <h3 className="font-semibold">Question {index + 1}</h3>

              {/* Question Text Input */}
              <input
                type="text"
                placeholder={`Enter Question ${index + 1}`}
                className="border rounded-lg mt-2 px-2 py-2 w-full"
                value={question.text}
                onChange={(e) => updateQuestionText(index, e.target.value)}
              />

              {/* Select Question Type */}
              <label className="font-semibold mt-2 block">Select Question Type</label>
              <select
                className="border rounded-lg mt-2 px-2 py-2 w-full"
                value={question.type}
                onChange={(e) => updateQuestionType(index, e.target.value)}
              >
                <option value="MCQ">Multiple Choice (MCQ)</option>
                <option value="Drag and Drop">Drag and Drop</option>
                <option value="Fill in the Blanks">Fill in the Blanks</option>
              </select>
            </div>
          ))}

          {/* Add Question Button */}
          {questions.length < quizNumber && (
            <button
              onClick={addQuestion}
              className="bg-primary text-white font-semibold px-4 py-2 mt-4 rounded-lg hover:scale-105 transition-transform"
            >
              Add Question
            </button>
            
          )}
          {
            questions.length === quizNumber && !showSaveButton && (
              <button
                onClick={() => setShowSaveButton(true)}
                className="bg-primary text-white font-semibold px-4 py-2 mt-4 rounded-lg hover:scale-105 transition-transform"
              >
                Save Quiz
              </button>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default QuizCreation;
