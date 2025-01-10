import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEnvelope, FaKey, FaCheck } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  AUTH_URLS,
  axiosInstance,
} from "../../../Services/URLS/AUTH_URLS/AUTH_URLS";
import { useNavigate } from "react-router-dom";
import {
  EMAIL_VALIDATION,
  PASWORD_VALIDATION,
} from "../../../Services/Validation/VALIDATION";

interface ResetPasswordData {
  email: string;
  otp: string;
  password: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>();

  // Validate that passwords match
  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
    if (!validateConfirmPassword()) return;

    try {
      const response = await axiosInstance.post(AUTH_URLS.RESETPASSWORD, {
        email: data.email,
        otp: data.otp,
        password,
      });
      console.log(response?.data?.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-text text-2xl font-bold my-4">Reset Password</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[50rem] overflow-hidden"
      >
        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 font-bold text-base text-white"
          >
            Your Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaEnvelope color="white" size={23} />
            </div>
            <input
              type="email"
              id="email"
              className="bg-primary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 p-2.5 placeholder-white"
              placeholder="Type your email"
              {...register("email", EMAIL_VALIDATION)}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* OTP Field */}
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block mb-2 font-bold text-base text-white"
          >
            OTP
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaEnvelope color="white" size={23} />
            </div>
            <input
              type="text"
              id="otp"
              className="bg-primary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 p-2.5 placeholder-white"
              placeholder="Enter your OTP"
              required
              {...register("otp")}
            />
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-base text-white"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaKey color="white" size={23} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="bg-primary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 p-2.5 placeholder-white"
              placeholder="Type your password"
              {...register("password", PASWORD_VALIDATION)}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="block mb-2 font-bold text-base text-white"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaKey color="white" size={23} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              className="bg-primary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 p-2.5 placeholder-white"
              placeholder="Type your confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateConfirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-primary bg-white hover:text-white hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary/50 rounded-lg text-sm px-5 py-2.5 font-bold flex items-center transition-colors duration-300"
        >
          Reset
          <div className="bg-primary rounded-full hover:bg-white hover:text-primary text-white p-1 ml-3 transition-colors duration-300 flex items-center">
            <FaCheck />
          </div>
        </button>
      </form>
    </>
  );
}
