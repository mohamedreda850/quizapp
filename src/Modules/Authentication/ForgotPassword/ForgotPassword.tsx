import React from 'react'

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const Submit = async (data: ForgitData) => {
    try {
      const res = await axiosInstance.post(AUTH_URLS.FORGOT_PASSWORD, data);
console.log("success");

      navigate("/reset-password");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <p
        className="text-text"
        style={{ fontSize: "1.5rem", paddingBlock: "2rem", fontWeight: "700" }}
      >
        Forget Password
      </p>
      
      <form onSubmit={handleSubmit(Submit)}>
        {TextFeild({
          placeholder: "Type your email",
          icon: <FaEnvelope />,
          label: " email address",
          registerfunction: {
            ...register("email", { required: "emal is required" }),
          },
          error: errors.email && errors.email.message,
        })}

        
        <div className="flex justify-between items-center  flex-wrap">
          <div>
            <button
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                background: "white",
              }}
              className="bg-white-500 text-primary py-2 px-4 rounded inline-flex items-center"
            >
             Send email
              <MdCheckCircle className="mx-2 mt-1 text-2xl" />
            </button>
          </div>
          <div>
            <p>
              Login?{" "}
              <Link
                style={{ textDecoration: "underline" }}
                className="text-text"
                to="/login"
              
              >
                click here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );

}
