import React from "react";
import UGCLogo from "../UGCLogo";
import { BiLockOpenAlt } from "react-icons/bi";
import FormInputField from "../FormInputField";

function LoginForm() {
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
          <h1>Login</h1>
        </div>
        <p className="text-base text-[#373737] pt-2">
          Login to share, request and enquire about resources
        </p>
      </div>

      {/* Login Form  */}
      <form className="flex flex-col w-3/4 py-8">
        <FormInputField id="required-email" name="email" lable="Email" type="email" placeholder="Your Email" required={true}/>
        <FormInputField id="required-password" name="password" lable="Password" type="password" placeholder="Password" required={true}/>

        <div className="flex justify-between my-2">
          <label class="flex items-center space-x-3 mb-3">
            <input
              type="checkbox"
              name="checked-demo"
              class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-primary checked:border-transparent focus:outline-none"
            />
            <span class="text-gray-700 font-normal text-sm">Remember Me</span>
          </label>

          <a href="/" className="text-primary text-sm">
            Forgot Password?
          </a>
        </div>

        <div className="">
          <button
            type="submit"
            class="my-2 py-5 px-4 orangeGradient text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-3xl "
          >
            LOGIN
          </button>
          <p className="font-semibold text-sm my-4">
            Not registered yet?{" "}
            <a href="/signup" className="text-primary">
              Create an Account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
