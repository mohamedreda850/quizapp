import TextFeild from "../../SharedComponents/TextFeild/TextFeild";
import { FaEnvelope } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

import { FaKey } from "react-icons/fa";

import { useForm } from "react-hook-form";
import Icons from "./Icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import {
  AUTH_URLS,
  axiosInstance,
} from "../../../Services/URLS/AUTH_URLS/AUTH_URLS";
import { useSelector } from "react-redux";
interface LoginData {
  email: string;
  password: string;
}
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const Submit = async (data: LoginData) => {
    try {
      const res = await axiosInstance.post(AUTH_URLS.LOGIN, data);

      const userData =JSON.stringify( res?.data?.data?.profile)
      console.log("userData" , userData);
      
      localStorage.setItem("quizUser" , userData)
      localStorage.setItem("quizToken", res?.data?.data?.accessToken);

      console.log();
      
      navigate("/DashBoard");

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
        Continue your learning journey with QuizWiz! 
      </p>
      <Icons />
      <form onSubmit={handleSubmit(Submit)}>
        {TextFeild({
          placeholder: "Type your email",
          icon: <FaEnvelope />,
          label: "Registered email address",
          registerfunction: {
            ...register("email", { required: "emal is required" }),
          },
          error: errors.email && errors.email.message,
        })}

        <div className="py-2">
          {TextFeild({
            placeholder: "Type your Password",
            icon: <FaKey />,
            label: "Password",
            registerfunction: {
              ...register("password", { required: "Password Is Required" }),
            },
            error: errors.password && errors.password.message,
          })}
        </div>
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
              Sign In
              <MdCheckCircle className="mx-2 mt-1 text-2xl" />
            </button>
          </div>
          <div>
            <p>
              Forgot password?{" "}
              <Link
                style={{ textDecoration: "underline" }}
                className="text-text"
                to="/forgot-password"
              >
                click here
              </Link>{" "}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
