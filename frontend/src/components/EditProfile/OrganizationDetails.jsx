import React from "react";
import Button from "../Button";
import FormInputField from "../FormInputField";

function OrganizationDetails() {
  return (
    <div className="py-4 px-10 flex- flex-col space-y-14">
      <h1 className="text-3xl font-semibold">Organization Detail</h1>
      <div className="">
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold text-xl">Edit Logo</h2>
          <div className="flex space-x-14 items-center">
            <img
              src="https://xsgames.co/randomusers/avatar.php?g=female"
              className="rounded-full w-40 h-40"
              alt=""
            />
            <div className="flex flex-col space-y-4">
              <Button variant="filled">Change Logo</Button>
              <Button variant="outlined">Remove Logo</Button>
            </div>
          </div>
        </div>
      </div>

      <form className="flex flex-col">
        <FormInputField
          id="required-email"
          name="email"
          lable="Email"
          type="email"
          placeholder="Your Email"
          required={false}
        />
        <FormInputField
          id="required-password"
          name="password"
          lable="Official Website"
          type="password"
          placeholder="Password"
          required={false}
        />
        <FormInputField
          id="required-password"
          name="password"
          lable="Person Of Contact (POC)"
          type="password"
          placeholder="Password"
          required={false}
        />
      </form>
    </div>
  );
}

export default OrganizationDetails;
