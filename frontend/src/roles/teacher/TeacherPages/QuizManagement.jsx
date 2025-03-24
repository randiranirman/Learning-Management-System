import { useNavigate } from "react-router-dom";

const QuizManagement = () => {

  const navigate = useNavigate();

  return (
    

    <>
        <div className="flex justify-between mt-2 max-w-[90%] mx-4">
          <h1 className='font-semibold text-primary text-2xl'>Quiz Management</h1>
          <button onClick={() => navigate("/teacher/quiz/createQuiz")} className='font-semibold bg-primary px-2 py-2 text-white rounded-md  cursor-pointer mx-2 hover:scale-110 duration-200 '> Create Quiz </button>
        </div>

    </>
  )
}

export default QuizManagement;