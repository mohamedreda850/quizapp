import React, { useEffect, useState } from 'react'
import { axiosInstance, STUDENT_QUIZ_URLS } from '../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Exam() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const [questions, setquestions] = useState([])
  const params = useParams()
  const quizIsOver = () => {
    alert("Quiz is closed");
    navigate('/student/dashboard')
  }
  const getQuestions = async () => {
    try {
      const { data } = await axiosInstance.get(STUDENT_QUIZ_URLS.QUESTIONS_WITHOUT_ANSWER(params.id));
      console.log(data.data);
      setquestions(data.data.questions);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message == "Quiz is closed") {
        quizIsOver()
      }


    }
  }
  const onSubmit = async (data) => {
    const answers = Object.keys(data).map((key) => ({
      question: key.split('-')[1],
      answer: data[key],
    }));
    try {
      const res = await axiosInstance.post(STUDENT_QUIZ_URLS.SUBMIT_QUESTION(params.id), { answers });
      console.log(res);
      alert("Quiz Submitted")
      navigate('/student/dashboard')

    } catch (error) {
      console.log(error);

    }

  }
  useEffect(() => {
    getQuestions()
  }, [])
  return (
    <section className="flex flex-col items-center justify-center p-[5%] ">
      <div className=''>
      <form onSubmit={handleSubmit(onSubmit)} className="border border-black p-[2%] rounded-md w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {questions.map((question, index) => (
          <div key={index} className="border border-black p-[2%] rounded-md">
            <h2>{index + 1}</h2>
            <h1 className="text-4xl font-bold">{question.title}</h1>

            <div className="flex items-center mb-2 mt-2">
              <input
                {...register(`question-${question._id}`)}
                id={`question-${question._id}-option-A`}
                type="radio"
                value="A"
                name={`question-${question._id}`}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`question-${question._id}-option-A`} className="ms-2 text-sm font-medium text-gray-900">
                {question.options.A}
              </label>
            </div>

            <div className="flex items-center mb-2">
              <input
                {...register(`question-${question._id}`)}
                id={`question-${question._id}-option-B`}
                type="radio"
                value="B"
                name={`question-${question._id}`}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`question-${question._id}-option-B`} className="ms-2 text-sm font-medium text-gray-900">
                {question.options.B}
              </label>
            </div>

            <div className="flex items-center mb-2">
              <input
                {...register(`question-${question._id}`)}
                id={`question-${question._id}-option-C`}
                type="radio"
                value="C"
                name={`question-${question._id}`}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`question-${question._id}-option-C`} className="ms-2 text-sm font-medium text-gray-900">
                {question.options.C}
              </label>
            </div>

            <div className="flex items-center mb-2">
              <input
                {...register(`question-${question._id}`)}
                id={`question-${question._id}-option-D`}
                type="radio"
                value="D"
                name={`question-${question._id}`}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`question-${question._id}-option-D`} className="ms-2 text-sm font-medium text-gray-900">
                {question.options.D}
              </label>
            </div>
          </div>
        ))}
      </div>
      {/* Submit button outside the grid but inside the form */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="w-full md:w-1/2 border p-2 rounded-md bg-[#c5d86d] text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>


      </div>
    </section>
  )
}
