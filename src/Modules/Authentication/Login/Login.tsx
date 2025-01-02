import TextFeild from "../../SharedComponents/TextFeild/TextFeild";
import { FaEnvelope } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

import { FaKey } from "react-icons/fa";

import { useForm } from "react-hook-form";
import Icons from "./Icons/Icons";
import { Link } from "react-router-dom";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <p
        className="text-text"
        style={{ fontSize: "1.5rem", paddingBlock: "2rem", fontWeight: "700" }}
      >
        Continue your learning journey with QuizWiz!
      </p>
      <Icons />

      <TextFeild
        label={"Registered email address"}
        placeholder={"Type your email"}
        error={"Eamil Is Required"}
        icon={<FaEnvelope/>}
      />
      <div className="py-2">
        <TextFeild
          label={"Password"}
          placeholder={"Type your password"}
          error={"Eamil Is Required"}
          icon={<FaKey/>}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <button
            style={{ fontWeight: "600", fontSize: "1rem", background: "white" }}
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
    </div>
  );
}
