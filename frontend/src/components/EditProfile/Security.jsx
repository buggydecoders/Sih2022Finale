import React from "react";
import Button from "../Button";
import FormInputField from "../FormInputField";

function Security() {
  return (
    <div className="py-4 px-10 flex- flex-col space-y-14">
      <h1 className="text-3xl font-semibold">Security</h1>

      <form className="flex flex-col">
        <FormInputField
          id="required-password"
          name="password"
          lable="Current Password"
          type="password"
          placeholder="Password"
          required={false}
        />
        <FormInputField
          id="required-password"
          name="password"
          lable="New Password"
          type="password"
          placeholder="Password"
          required={false}
        />
        <FormInputField
          id="required-password"
          name="password"
          lable="Confirm New Password"
          type="password"
          placeholder="Password"
          required={false}
        />
      </form>
    </div>
  );
}

export default Security;
