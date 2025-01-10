export default function AddAndUpdateQuestion({
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
                    onClick={closeModal}
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
