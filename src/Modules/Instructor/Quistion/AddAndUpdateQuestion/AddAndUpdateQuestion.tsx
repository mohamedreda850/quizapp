import { FaCheck } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";

export default function QuestionModal({
  SubmitForm,
  register,
  handleSubmit,
  errors,
  isOpen,
  closeModal,
}) {
  return (
    <div>
      {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <form onSubmit={handleSubmit(SubmitForm)} className="px-5 pb-5">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Set up a new question
                  </h2>
                  <button
                    type="submit"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                 <FaCheck />

                    <span className="sr-only">Close modal</span>
                  </button>
                  <button
                    style={{ marginLeft: "2rem" }}
                    onClick={closeModal}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                   <RiCloseLargeLine />
                  </button>
                </div>
                <div className="my-2 px-5">Details</div>
                <div className="w-100 text-center">
                  <input
                    {...register("title", {
                      required: "Title Is Requird",
                    })}
                    placeholder="Title:"
                    style={{
                      width: "95%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(to right, #FFEDDF 10%, #ffffff 20%)",
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      color: "black",
                    }}
                    type="text"
                  />
                </div>
                {typeof errors.title?.message === "string" ? (
                  <span className="text-red-500 px-5">
                    {errors.title.message}
                  </span>
                ) : null}
                <div className="w-100 text-center py-2">
                  <input
                    {...register("description", {
                      required: "description Is Requird",
                    })}
                    placeholder="Description:"
                    style={{
                      width: "95%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(to right, #FFEDDF 20%, #ffffff 30%)",
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      color: "black",
                    }}
                    type="text"
                  />
                </div>
                {typeof errors.description?.message === "string" ? (
                  <span className="text-red-500 px-5">
                    {errors.description.message}
                  </span>
                ) : null}
                <div className="flex flex-col items-center">
                  <div className="flex text-center justify-center mb-4">
                    <div className="flex-initial w-64">
                      <div className="w-100 text-center py-2">
                        <input
                          {...register("options.A", {
                            required: "Option A is required",
                          })}
                          placeholder="A"
                          style={{
                            width: "95%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            background:
                              "linear-gradient(to right, #FFEDDF 20%, #ffffff 30%)",
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            color: "black",
                          }}
                          type="text"
                        />
                      </div>
                      {errors?.options?.A?.message ? (
                        <span className="text-red-500 px-5">
                          {errors.options.A.message}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex-initial w-64">
                      <div className="w-100 text-center py-2">
                        <input
                          {...register("options.B", {
                            required: "Option B is required",
                          })}
                          placeholder="B"
                          style={{
                            width: "95%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            background:
                              "linear-gradient(to right, #FFEDDF 20%, #ffffff 30%)",
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            color: "black",
                          }}
                          type="text"
                        />
                      </div>
                      {errors?.options?.B?.message ? (
                        <span className="text-red-500 px-5">
                          {errors.options.B.message}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex text-center justify-center">
                    <div className="flex-initial w-64">
                      <div className="w-100 text-center py-2">
                        <input
                          {...register("options.C", {
                            required: "Option C is required",
                          })}
                          placeholder="C"
                          style={{
                            width: "95%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            background:
                              "linear-gradient(to right, #FFEDDF 20%, #ffffff 30%)",
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            color: "black",
                          }}
                          type="text"
                        />
                      </div>
                      {errors?.options?.C?.message ? (
                        <span className="text-red-500 px-5">
                          {errors.options.C.message}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex-initial w-64">
                      <div className="w-100 text-center py-2">
                        <input
                          {...register("options.D", {
                            required: "Option D is required",
                          })}
                          placeholder="D"
                          style={{
                            width: "95%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            background:
                              "linear-gradient(to right, #FFEDDF 20%, #ffffff 30%)",
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            color: "black",
                          }}
                          type="text"
                        />
                      </div>
                      {errors?.options?.D?.message ? (
                        <span className="text-red-500 px-5">
                          {errors.options.D.message}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex text-center justify-center	">
                  <div className="flex-initial w-64 ...">
                    <div className="w-100 text-center py-2">
                      <input
                        {...register("answer", {
                          required: "Answer Is Required",
                        })}
                        placeholder="Right Answer"
                        style={{
                          width: "95%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "10px",
                          background:
                            "linear-gradient(to right, #FFEDDF 60%, #ffffff 70%)",
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                          color: "black",
                        }}
                        type="text"
                      />
                    </div>
                    {typeof errors.answer?.message === "string" ? (
                      <span className="text-red-500 px-5">
                        {errors.answer.message}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex-initial w-64 ...">
                    <div className="w-100 text-center py-2">
                      <select
                        {...register("type", {
                          required: "Category is required",
                        })}
                        style={{
                          width: "95%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "10px",
                          background:
                            "linear-gradient(to right, #FFEDDF 60%, #ffffff 70%)",
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                          color: "black",
                        }}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="FE">FE</option>
                        <option value="BE">BE</option>
                      </select>
                    </div>
                    {typeof errors.type?.message === "string" ? (
                      <span className="text-red-500 px-5">
                        {errors.type.message}
                      </span>
                    ) : null}
                  </div>
                </div>
                <style>
                  {`
             input::placeholder {
             color: black; 
            opacity: 1;
            font-weight:bold
         }
       `}
                </style>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
