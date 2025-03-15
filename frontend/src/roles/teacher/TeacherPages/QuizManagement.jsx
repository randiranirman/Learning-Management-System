import { QrCode } from "lucide-react"
import { useNavigate } from "react-router-dom";

const QuizManagement = () => {

  const navigate = useNavigate();

  return (
    

    <>
        <div className="flex justify-between ">
          <h1 className='font-semibold text-primary text-2xl'>Quiz Management</h1>
          <button onClick={() => navigate("/teacher/quiz")} className='font-semibold bg-primary px-2 py-4 text-white rounded-md :hover-scale-110 cursor-pointer'> Create Quiz </button>
        </div>

    </>
  )
}

export default QuizManagement;