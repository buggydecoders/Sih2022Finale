import React from 'react'

export const TwoFields = ({ children }) => {
    return <div className="grid grid-cols-2 gap-4">{children}</div>;
  };

const Input = ({ label, required, area, note, cols,paddingY, ...props }) => {
    return (
      <div className="font-open">
        <div className="font-semibold text-sm">
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </div>
        <div className="mt-2 flex flex-col">
          {!area && (
            <input
              {...props}
              className={`${paddingY==='max'?'py-[6px]':'py-1'} w-full focus:border-primary px-3 rounded-xl outline-none shadow-sm border-[1px] border-gray-200`}
            />
          )}
          {area && (
            <textarea
              cols={cols || 3}
              {...props}
              className="w-full py-2 focus:border-primary outline-none px-3 rounded-xl shadow-sm border-[1px] border-gray-200"
            />
          )}
          {note && <div className="text-xs text-gray-400 mt-1">{note}</div>}
        </div>
      </div>
    );
  };
  
export default Input