import React from "react";
import { FaEnvelope, FaKey, FaArrowDown, FaCheck } from "react-icons/fa";

export default function ResetPassword() {
  return (
    <>
      <div className="text-text text-2xl font-bold my-4 ">ResetPassword</div>

      <form className="max-w-[50rem] overflow-hidden">
        <div className="mb-4">
          <label
            htmlFor="email-address-icon"
            className="block mb-2 font-bold text-base text-white dark:text-white"
          >
            Your email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaEnvelope color="white" size={"23px"} />
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="bg-primary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 font-light p-2.5  dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type your email"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="OTP"
            className="block mb-2 font-bold text-base text-white dark:text-white"
          >
            OTP
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaEnvelope color="white" size={"23px"} />
            </div>
            <input
              type="text"
              inputMode="numeric"
              id="OTP"
              className="bg-primary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 pe-12 font-light p-2.5  dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Choose your OTP"
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
              <FaArrowDown color="white" size={"23px"} />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email-address-icon"
            className="block mb-2 font-bold text-base text-white dark:text-white"
          >
            Password{" "}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaKey color="white" size={"23px"} />
            </div>
            <input
              type="password"
              id="password"
              className="bg-primary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 font-light p-2.5  dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type your password"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email-address-icon"
            className="block mb-2 font-bold text-base text-white dark:text-white"
          >
            Confirm Password{" "}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaKey color="white" size={"23px"} />
            </div>
            <input
              type="password"
              id="confirm-password"
              className="bg-primary border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 font-light p-2.5  dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type your confirm password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-primary bg-white hover:text-white hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary/50 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-colors duration-300 ease-in-out font-bold"
        >
          Reset
          <div className="bg-primary rounded-full hover:bg-white hover:text-primary text-white p-1 ms-3 transition-colors duration-300 ease-in-out flex items-center">
            <FaCheck />
          </div>
        </button>
      </form>
    </>
  );
}
