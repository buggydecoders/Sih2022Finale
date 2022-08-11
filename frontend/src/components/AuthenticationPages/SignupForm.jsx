import React from "react";
import UGCLogo from "../UGCLogo";
import { BiLockOpenAlt } from "react-icons/bi";
import FormInputField from "../FormInputField";

function SignupForm() {
  return (
    <div className="flex flex-col p-8 space-y-6 w-7/12">
      {/* Logo Section  */}
      <div className="">
        <UGCLogo />
      </div>

      {/* Login Heading Section  */}
      <div className="">
        <div className="text-3xl font-bold text-[#383838] flex space-x-1">
          <BiLockOpenAlt />
          <h1>Signup</h1>
        </div>
        <p className="text-base text-[#373737] pt-2">
          Login to share, request and enquire about resources
        </p>
      </div>

      {/* Login Form  */}
      <form className="flex flex-col w-3/4 py-4">
        <FormInputField
          id="required-email"
          name="email"
          lable="Institute Email"
          type="email"
          placeholder="institute@education.edu.in"
          required={true}
        />
        <FormInputField
          id="aishe-code"
          name="aishe"
          lable="AISHE CODE"
          type="text"
          placeholder="U-2020"
          required={true}
        />
        <div className="flex justify-between space-x-4">
          <FormInputField
            id="required-password"
            name="password"
            lable="Password"
            type="password"
            placeholder="Password"
            required={true}
          />
          <FormInputField
            id="confirm-password"
            name="confirmPassword"
            lable="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            required={true}
          />
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
