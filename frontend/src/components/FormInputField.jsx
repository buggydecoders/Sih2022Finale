import React from "react";

function FormInputField({name, type, id, placeholder, label, required, ...props}) {
   
  return (
    <div className=" relative my-3">
      <label
        htmlFor={id}
        className="text-gray-700 font-semibold text-sm"
      >
        {label}
        {required? <span className="text-red-500 required-dot px-2">*</span>: null}
      </label>
      <input
        type={type}
        id={id}
        className="my-3 rounded-lg border-1 flex-1 appearance-none border-gray-600 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        name={name}
        {...props}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInputField;
