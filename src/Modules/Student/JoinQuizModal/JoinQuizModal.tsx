import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS";


function JoinQuizModal({ isOpen ,closeModal}:any) {

  const navigate = useNavigate();
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false); 
  const [quizId , setQuizId] = useState()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const quizIsOver =()=>{
    alert("Quiz is closed");
    setIsSecondModalOpen(false);
  }
  const onSubmit = async (data) => {
    try {
       const res =await axiosInstance.post(
        "https://upskilling-egypt.com:3005/api/quiz/join",
        data
      );
      setQuizId(res.data.data.quiz);
      openSecondModal();
    } catch (error) {
      if(error.response.data.message =="Quiz is closed" ){
        quizIsOver()
      }
      
    }
  };

 const openSecondModal = () => {
  setIsSecondModalOpen(true);
  
 }
  
  const closeSecondModal = () => {
    navigate(`/student/exam/${quizId}`);
    setIsSecondModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
     
      

      {/* المودال الأول */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-11/2 max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center pt-4">
              Join Quiz
            </h2>
            <p
              style={{ fontSize: "1.5rem", fontWeight: "500" }}
              className="text-gray-700 mb-6 text-center"
            >
              Input the code received for the quiz below to join
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-center py-5"
            >
              <input
                {...register("code", {
                  required: "Code Is Required",
                })}
                style={{
                  width: "80%",
                  background:
                    "linear-gradient(to right, #FFEDDF 10%, #ffffff 20%)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
                type="text"
                placeholder="Code"
                className="px-4 py-2 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-center gap-4 mt-4">
                {typeof errors.code?.message === "string" ? (
                  <span className="text-red-500 px-5">
                    {errors.code.message}
                  </span>
                ) : null}
                <button type="submit">
                  <svg
                    width="27"
                    height="20"
                    viewBox="0 0 27 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.10926 19.6072L0.392753 10.8907C-0.130918 10.367 -0.130918 9.51795 0.392753 8.99423L2.28917 7.09776C2.81284 6.57403 3.66197 6.57403 4.18564 7.09776L10.0575 12.9696L22.6344 0.392753C23.158 -0.130918 24.0072 -0.130918 24.5308 0.392753L26.4272 2.28922C26.9509 2.81289 26.9509 3.66197 26.4272 4.18569L11.0057 19.6073C10.482 20.1309 9.63293 20.1309 9.10926 19.6072Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button 
                onClick={closeModal}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7909 10L19.4767 4.3142C20.1744 3.61648 20.1744 2.48523 19.4767 1.78693L18.2131 0.523295C17.5153 -0.174432 16.3841 -0.174432 15.6858 0.523295L10 6.20909L4.3142 0.523295C3.61648 -0.174432 2.48523 -0.174432 1.78693 0.523295L0.523295 1.78693C-0.174432 2.48466 -0.174432 3.61591 0.523295 4.3142L6.20909 10L0.523295 15.6858C-0.174432 16.3835 -0.174432 17.5148 0.523295 18.2131L1.78693 19.4767C2.48466 20.1744 3.61648 20.1744 4.3142 19.4767L10 13.7909L15.6858 19.4767C16.3835 20.1744 17.5153 20.1744 18.2131 19.4767L19.4767 18.2131C20.1744 17.5153 20.1744 16.3841 19.4767 15.6858L13.7909 10Z"
                      fill="#0D1321"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* المودال الثاني */}
      {isSecondModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/2 max-w-2xl relative">
            <h2
              className="text-2xl font-bold mb-4 flex"
              style={{ justifyContent: "center" }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60 30C60 46.5686 46.5686 60 30 60C13.4314 60 0 46.5686 0 30C0 13.4314 13.4314 0 30 0C46.5686 0 60 13.4314 60 30ZM26.5299 45.8848L48.788 23.6267C49.5438 22.8709 49.5438 21.6454 48.788 20.8896L46.0508 18.1524C45.295 17.3965 44.0695 17.3965 43.3136 18.1524L25.1613 36.3046L16.6864 27.8297C15.9306 27.0739 14.7051 27.0739 13.9492 27.8297L11.212 30.5669C10.4562 31.3227 10.4562 32.5482 11.212 33.304L23.7927 45.8846C24.5486 46.6406 25.774 46.6406 26.5299 45.8848Z"
                  fill="#0D1321"
                />
              </svg>
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              You have successfully joined the quiz. Good luck!
            </p>
            <div className="text-center">
              <button
                style={{
                  background: "#C5D86D",
                }}
                onClick={closeSecondModal}
                className="text-dark px-6 py-1 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinQuizModal;
