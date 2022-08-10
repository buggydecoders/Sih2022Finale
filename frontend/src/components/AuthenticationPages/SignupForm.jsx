import React from "react";
import UGCLogo from "../UGCLogo";
import { BiLockOpenAlt } from "react-icons/bi";

function SignupForm() {
  return (
    <div className="flex flex-col px-8 w-7/12">
      {/* Logo Section  */}
      <div className="py-6">
        <UGCLogo />
      </div>

      {/* Login Heading Section  */}
      <div className="py-4">
        <div className="text-3xl font-bold text-[#383838] flex space-x-1">
          <BiLockOpenAlt />
          <h1>Signup</h1>
        </div>
        <p className="text-base text-[#373737] pt-2">
          Login to share, request and enquire about resources
        </p>
      </div>

      {/* Login Form  */}
      <form className="flex flex-col w-3/4 py-8">
        <div class=" relative my-1">
          <label
            for="required-email"
            class="text-gray-700 font-semibold text-sm"
          >
            Institute Email
            <span class="text-red-500 required-dot">*</span>
          </label>
          <input
            type="text"
            id="required-email"
            class=" my-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#F3633E] focus:border-transparent"
            name="email"
            placeholder="institute@education.edu.in"
          />
        </div>

        <div class=" relative my-1">
          <label
            for="required-email"
            class="text-gray-700 font-semibold text-sm"
          >
            AISHE CODE
            <span class="text-red-500 required-dot">*</span>
          </label>
          <input
            type="text"
            id="required-email"
            class=" my-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#F3633E] focus:border-transparent"
            name="aishe"
            placeholder="U-2020"
          />
        </div>

        <div className="flex justify-between">
          <div class=" relative my-1 pr-2">
            <label
              for="required-password"
              class="text-gray-700 font-semibold text-sm"
            >
              Password
              <span class="text-red-500 required-dot">*</span>
            </label>
            <input
              type="text"
              id="required-password"
              class=" my-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#F3633E] focus:border-transparent"
              name="password"
              placeholder="Password"
            />
          </div>

          <div class=" relative my-1 pl-2">
            <label
              for="required-password"
              class="text-gray-700 font-semibold text-sm"
            >
              Confirm Password
              <span class="text-red-500 required-dot">*</span>
            </label>
            <input
              type="text"
              id="required-password"
              class=" my-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#F3633E] focus:border-transparent"
              name="confirmPassword"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="">
          <button
            type="submit"
            class="my-2 py-5 px-4 orangeGradient text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-3xl "
          >
            Signup
          </button>
          <p className="font-semibold text-sm my-4">
            Already have account?
            <a href="/login" className="text-primary px-1">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
