import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance, GROPU_URLS, QUIZ_URLS } from "../../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS";
import { useForm } from "react-hook-form";

import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";

interface Quiz {
  title: string;
  description?: string;
  group: string;
  questions_number: number;
  difficulty: string;
  type: string;
  schadule: string;
  duration: number;
  score_per_question: number;
  code?: string

}

interface Group {
  name: string;
  _id?: string;
}

// code modal 
const CodeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  code: string;
}> = ({ isOpen, onClose, code }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md ">

        <div className='text-3xl bg-black text-white w-[30px] m-auto rounded-full' >
          <MdDone />
        </div>
        <h1 className="text-lg font-semibold mb-4 text-center">
          Quiz was successfully updated
        </h1>
        <div className="flex  mb-8 border border-solid border-black rounded-2xl relative">
          <h3 style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium px-2 pt-2 rounded-tl-[1.5rem] rounded-bl-[1.5rem]">CODE:</h3>
          <p className="w-full p-2  ">{code}</p>
          <div className='absolute right-[10px] top-[10px] text-[20px]'><FaCopy /></div>

        </div>
        <div className="flex justify-center">

          <button
            onClick={onClose}
            className="bg-[#C5D86D] text-gray-800 px-10 py-1 rounded-2xl hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function QuizzesDetails() {
  const { setValue, register, handleSubmit, formState: { errors } } = useForm()
  const [quiz, setQuiz] = useState([])
  const params = useParams()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCodeOpen, setIsModaCodelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [code, setCode] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleOpenCodeModal = () => {
    setIsModaCodelOpen(true);
  };

  const handleCloseCodeModal = () => {
    setIsModaCodelOpen(false);
    setCode('');
  };

  const getGroupList = async () => {
    try {
      const response = await axiosInstance.get(GROPU_URLS.GET_GRUOP);

      setGroups(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching groups.");
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {

    (async () => {

      if (isEditing) {

        let getQuiz = async () => {

          try {
            let response = await axiosInstance.get(QUIZ_URLS.GET_QUIZ_BY_ID(params.id));

            setCode(response.data.code);
            const quiz = response?.data
            setValue("title", quiz?.title);
            setValue("description", quiz?.description);
            setValue("group", quiz?.group);
            setValue("questions_number", quiz?.questions_number);
            setValue("difficulty", quiz?.difficulty);
            setValue("type", quiz?.type);
            setValue("schadule", quiz?.schadule);
            setValue("duration", quiz?.duration);
            setValue("score_per_question", quiz?.score_per_question);

          } catch (error) {

            console.log(error);

          }

        }
        getQuiz()
      }
    })();

  }, [setValue, params.id])

  const handleEditQuiz = async (data: Quiz) => {
    try {
      const response = await axiosInstance.put(QUIZ_URLS.UPDATE_QUIZ(params.id), { title: data.title })
      setCode(response.data.data.code);
      setIsModalOpen(false); // Close the modal
      getQuizDetails();
      handleOpenCodeModal();
      setIsEditing(false); // Reset edit mode

    } catch (error) {
      console.error("Error updating group:", error);
      //   setError("Error updating group.");
    }
  };


  const getQuizDetails = async () => {
    try {
      const { data } = await axiosInstance.get(QUIZ_URLS.GET_QUIZ_BY_ID(params.id))
      setQuiz(data)
      console.log(data);
      setValue("duration", data.duration)
      setValue("questions_number", data.questions_number)
      setValue("score_per_question", data.score_per_question)
      setValue("description", data.description)
    } catch (error) {
      console.log(error);

    }
  }
  const submit = async (data: any) => {
    console.log(data);

  }
  useEffect(() => {
    getQuizDetails();
    getGroupList()
  }, [])
  return (
    <>
      <div className="px-5 py-5">
        <div
          className="flex align gap-3 justify-center font-medium "

        >
          <p>Quizzes</p>
          <span>
            <svg
              className="mt-2"
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.62673 6.06704L2.11039 10.5834C1.79823 10.8955 1.29347 10.8955 0.984628 10.5834L0.234119 9.83287C-0.0780397 9.52071 -0.0780397 9.01595 0.234119 8.70711L3.43541 5.50582L0.234119 2.30453C-0.0780397 1.99238 -0.0780397 1.48761 0.234119 1.17877L0.981307 0.421619C1.29347 0.10946 1.79823 0.10946 2.10707 0.421619L6.62341 4.93796C6.93889 5.25012 6.93889 5.75488 6.62673 6.06704ZM13.0027 4.93796L8.4864 0.421619C8.17424 0.10946 7.66947 0.10946 7.36063 0.421619L6.61013 1.17213C6.29797 1.48429 6.29797 1.98905 6.61013 2.29789L9.81141 5.49918L6.61013 8.70047C6.29797 9.01262 6.29797 9.51739 6.61013 9.82623L7.36063 10.5767C7.67279 10.8889 8.17756 10.8889 8.4864 10.5767L13.0027 6.0604C13.3149 5.75488 13.3149 5.25012 13.0027 4.93796Z"
                fill="#C5D86D"
              />
            </svg>
          </span>
          <pre>{quiz.title}</pre>
        </div>
        <div className="px-10 my-5 border w-1/2 rounded-md" >
          <div>
            <h2
              className="mt-5 mb-2"
              style={{ fontSize: "2rem", fontWeight: "700" }}
            >
              {quiz.title}
            </h2>
            <div className="flex gap-5">
              <div className="flex gap-2">
                <span>
                  <svg
                    className="mt-1"
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 18.125C0 19.1602 0.839844 20 1.875 20H15.625C16.6602 20 17.5 19.1602 17.5 18.125V7.5H0V18.125ZM12.5 10.4688C12.5 10.2109 12.7109 10 12.9688 10H14.5312C14.7891 10 15 10.2109 15 10.4688V12.0312C15 12.2891 14.7891 12.5 14.5312 12.5H12.9688C12.7109 12.5 12.5 12.2891 12.5 12.0312V10.4688ZM12.5 15.4688C12.5 15.2109 12.7109 15 12.9688 15H14.5312C14.7891 15 15 15.2109 15 15.4688V17.0312C15 17.2891 14.7891 17.5 14.5312 17.5H12.9688C12.7109 17.5 12.5 17.2891 12.5 17.0312V15.4688ZM7.5 10.4688C7.5 10.2109 7.71094 10 7.96875 10H9.53125C9.78906 10 10 10.2109 10 10.4688V12.0312C10 12.2891 9.78906 12.5 9.53125 12.5H7.96875C7.71094 12.5 7.5 12.2891 7.5 12.0312V10.4688ZM7.5 15.4688C7.5 15.2109 7.71094 15 7.96875 15H9.53125C9.78906 15 10 15.2109 10 15.4688V17.0312C10 17.2891 9.78906 17.5 9.53125 17.5H7.96875C7.71094 17.5 7.5 17.2891 7.5 17.0312V15.4688ZM2.5 10.4688C2.5 10.2109 2.71094 10 2.96875 10H4.53125C4.78906 10 5 10.2109 5 10.4688V12.0312C5 12.2891 4.78906 12.5 4.53125 12.5H2.96875C2.71094 12.5 2.5 12.2891 2.5 12.0312V10.4688ZM2.5 15.4688C2.5 15.2109 2.71094 15 2.96875 15H4.53125C4.78906 15 5 15.2109 5 15.4688V17.0312C5 17.2891 4.78906 17.5 4.53125 17.5H2.96875C2.71094 17.5 2.5 17.2891 2.5 17.0312V15.4688ZM15.625 2.5H13.75V0.625C13.75 0.28125 13.4688 0 13.125 0H11.875C11.5312 0 11.25 0.28125 11.25 0.625V2.5H6.25V0.625C6.25 0.28125 5.96875 0 5.625 0H4.375C4.03125 0 3.75 0.28125 3.75 0.625V2.5H1.875C0.839844 2.5 0 3.33984 0 4.375V6.25H17.5V4.375C17.5 3.33984 16.6602 2.5 15.625 2.5Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <p>{new Date(quiz.schadule).toLocaleDateString()} </p>
              </div>
              <div className="flex gap-2">
                <span>
                  <svg
                    className="mt-1"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 0C4.97581 0 0.5 4.47581 0.5 10C0.5 15.5242 4.97581 20 10.5 20C16.0242 20 20.5 15.5242 20.5 10C20.5 4.47581 16.0242 0 10.5 0ZM12.8024 14.1169L9.24597 11.5323C9.12097 11.4395 9.04839 11.2944 9.04839 11.1411V4.35484C9.04839 4.08871 9.26613 3.87097 9.53226 3.87097H11.4677C11.7339 3.87097 11.9516 4.08871 11.9516 4.35484V9.90726L14.5121 11.7702C14.7298 11.9274 14.7742 12.2298 14.6169 12.4476L13.4798 14.0121C13.3226 14.2258 13.0202 14.2742 12.8024 14.1169Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <p className=""> {new Date(quiz.schadule).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
          <form className="my-5" onSubmit={handleSubmit(submit)}>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden my-3 w-full">
              <div className="bg-orange-100 px-4 py-2 text-black w-1/2">Duration</div>
              <input
                {...register('duration')}
                type="text"

                className="px-4 py-2 text-black w-full bg-transparent rounded-e-md"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden my-3 w-full">
              <div className="bg-orange-100 px-4 py-2 text-black w-1/2">Number of questions</div>
              <input
                {...register('questions_number')}
                type="text"

                className="px-4 py-2 text-black w-full bg-transparent rounded-e-md"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden my-3 w-full">
              <div className="bg-orange-100 px-4 py-2 text-black w-1/2">Score per question</div>
              <input
                {...register('score_per_question')}
                type="text"

                className="px-4 py-2 text-black w-full bg-transparent rounded-e-md"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden my-3 w-full">
              <div className="bg-orange-100 px-4 py-2 text-black w-1/2">Description</div>
              <input
                {...register('description')}
                type="text"

                className="px-4 py-2 text-black w-full bg-transparent rounded-e-md"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden my-3 w-full">
              <div className="bg-orange-100 px-4 py-2 text-black w-1/2">Question bank used</div>
              <select className="px-4 py-2 h-full text-black w-full bg-transparent rounded-e-md" >
                {quiz?.questions?.map((qu, idx) => (
                  <option value={qu._id}>{qu.title}</option>
                ))}
              </select>


            </div>




            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: "black",
                    width: "120px",
                    height: "40px",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5593 4.43846L14.1186 5.87914C13.9717 6.02602 13.7342 6.02602 13.5873 5.87914L10.1184 2.41025C9.97153 2.26337 9.97153 2.02586 10.1184 1.87898L11.5591 0.438299C12.1435 -0.1461 13.0935 -0.1461 13.6811 0.438299L15.5593 2.3165C16.1468 2.9009 16.1468 3.85093 15.5593 4.43846ZM8.88086 3.11653L0.674286 11.3231L0.01176 15.1201C-0.0788686 15.6327 0.368024 16.0764 0.880544 15.9889L4.67757 15.3233L12.8841 7.11669C13.031 6.96981 13.031 6.7323 12.8841 6.58542L9.41526 3.11653C9.26525 2.96965 9.02774 2.96965 8.88086 3.11653ZM3.87754 10.62C3.70566 10.4481 3.70566 10.1731 3.87754 10.0012L8.69023 5.18849C8.86211 5.01661 9.13712 5.01661 9.309 5.18849C9.48088 5.36037 9.48088 5.63538 9.309 5.80726L4.49631 10.62C4.32443 10.7918 4.04942 10.7918 3.87754 10.62ZM2.74937 13.2482H4.24943V14.3826L2.23372 14.7357L1.26181 13.7638L1.61495 11.7481H2.74937V13.2482Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Edit
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>

      <div>
        {/* edit Modal */}
        {isModalOpen && (
          <form onSubmit={handleSubmit(handleEditQuiz)}>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <div className="text-center bg-white p-9 rounded-md shadow-md w-[60vw]">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isEditing ? "Update Quiz" : "Set up a new Quiz"}
                  </h2>
                  <button
                    type="submit"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.10926 23.8156L0.392753 13.6554C-0.130918 13.045 -0.130918 12.0553 0.392753 11.4449L2.28917 9.23428C2.81284 8.62382 3.66197 8.62382 4.18564 9.23428L10.0575 16.0786L22.6344 1.41874C23.158 0.808336 24.0072 0.808336 24.5308 1.41874L26.4272 3.62932C26.9509 4.23972 26.9509 5.22943 26.4272 5.8399L11.0057 23.8157C10.482 24.4261 9.63293 24.4261 9.10926 23.8156Z"
                        fill="black"
                      />
                    </svg>

                    <span className="sr-only">Close modal</span>
                  </button>
                  <button
                    style={{ marginLeft: "2rem" }}
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      width="20"
                      height="25"
                      viewBox="0 0 20 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7909 12.6172L19.4767 5.9897C20.1744 5.1764 20.1744 3.85779 19.4767 3.04384L18.2131 1.57091C17.5153 0.757615 16.3841 0.757615 15.6858 1.57091L10 8.19843L4.3142 1.57091C3.61648 0.757615 2.48523 0.757615 1.78693 1.57091L0.523295 3.04384C-0.174432 3.85713 -0.174432 5.17574 0.523295 5.9897L6.20909 12.6172L0.523295 19.2447C-0.174432 20.058 -0.174432 21.3766 0.523295 22.1906L1.78693 23.6635C2.48466 24.4768 3.61648 24.4768 4.3142 23.6635L10 17.036L15.6858 23.6635C16.3835 24.4768 17.5153 24.4768 18.2131 23.6635L19.4767 22.1906C20.1744 21.3773 20.1744 20.0587 19.4767 19.2447L13.7909 12.6172Z"
                        fill="#0D1321"
                      />
                    </svg>
                  </button>
                </div>
                {/* Quiz Title Input */}
              
                <div className="flex">
                  <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block border rounded text-sm font-medium mb-3 px-2 ">Title </label>

                  <input

                    type="text"
                    placeholder="Enter Quiz Title"
                    className="w-full p-2 border rounded mb-3"
                    {...register("title", { required: "this field is required" })}
                  />
                  {errors?.name && <span className='text-red-500'>{errors?.title?.message}</span>}
                </div>
                <div className="flex">
                  <div className="flex">
                    {/* Duration (in minutes) */}
                    <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Duration (in minutes)</label>
                    <input
                      type="number"
                      {...register("duration", { required: "this field is required" })}
                      className="w-full p-2 border rounded mb-3"
                    />
                    {errors?.duration && <span className='text-red-500'>{errors?.duration?.message}</span>}
                  </div>
                  <div className="flex">
                    {/* No. of questions */}
                    <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">No. of questions</label>
                    <input
                      type="number"
                      {...register("questions_number", { required: "this field is required" })}
                      className="w-full p-2 border rounded mb-3"
                    />
                    {errors?.questions_number && <span className='text-red-500'>{errors?.questions_number?.message}</span>}
                  </div>
                  <div className="flex">
                    {/* Score per question */}
                    <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Score per question</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded mb-3"
                      {...register("score_per_question", { required: "this field is required" })}
                    />
                    {errors?.score_per_question && <span className='text-red-500'>{errors?.score_per_question?.message}</span>}
                  </div>
                </div>
                <div className="flex">
                  {/* description  */}
                  <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block border rounded text-sm font-medium mb-3 px-2 ">Description</label>
                  <textarea id="" className="w-full p-2 border rounded mb-3"
                    {...register("description")}
                  >

                  </textarea>

                </div>
                <div className="flex">
                  {/* Schedule */}
                  <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2">Schedule</label>
                  <input
                    type="datetime-local"
                    className=" p-2 border rounded mb-3"
                    {...register("schadule", { required: "this field is required" })}
                  />
                  {errors?.schadule && <span className='text-red-500'>{errors?.schadule?.message}</span>}
                </div>
                <div className="flex">
                  <div className="flex">
                    {/* diffculty */}
                    <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Difficulty leve</label>
                    <select
                      className="w-full p-2 border rounded mb-3"
                      {...register("difficulty", { required: "this field is required" })}
                    >
                      <option value="">difficulty level</option>
                      <option value="entry">easy</option>
                      <option value="medium">medium</option>
                      <option value="hard">hard</option>
                    </select>
                    {errors?.difficulty && <span className='text-red-500'>{errors?.difficulty?.message}</span>}
                  </div>
                  <div className="flex">
                    {/*Category type*/}
                    <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Category type</label>
                    <select
                      {...register('type')}
                      className="w-full p-2 border rounded mb-3"
                    >
                      <option value="FE">FE</option>
                      <option value="BE">BE</option>
                      <option value="DO">DO</option>
                    </select>
                  </div>
                  <div className="flex">
                    {/* Group name */}
                    <label style={{ backgroundColor: 'rgba(255, 237, 223, 1)' }} className="block text-sm font-medium mb-3 px-2 ">Group name</label>

                    <select
                      {...register("group", { required: "this field is required" })}
                      className="w-full p-2 border rounded mb-3"
                    >
                      <option value="">group name</option>
                      {groups?.map(group => <option value={group._id} key={group._id}>{group.name}</option>)}

                    </select>
                    {errors?.group && <span className='text-red-500'>{errors?.group?.message}</span>}

                  </div>
                </div>

              </div>
            </div>
          </form>

        )}
        <CodeModal
          isOpen={isModalCodeOpen}
          onClose={handleCloseCodeModal}
          code={code}
        />
      </div>
    </>
  );
}

export default QuizzesDetails;
