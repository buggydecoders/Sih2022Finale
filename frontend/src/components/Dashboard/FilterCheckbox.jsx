import React from "react";

const FilterCheckbox = ({ value,label,addSelected,removeSelected,selected }) => {
  const handleChange = (e) => {
    let checked = e.target.checked;
    if (checked) addSelected(value);
    else removeSelected(value);
  };
  return (
    <div className="flex  gap-3 items-center">
      <div className="">
        <input
          type="checkbox"
          className="appearance-none border-[1px] checked:bg-primary checked:border-secondary w-[16px] h-[16px] border-gray-500 rounded-sm"
          onChange={(e) => handleChange(e)}
          checked={selected.includes(value)}
        />
      </div>
      <div className="font-[500] text-black relative -top-1 text-sm">
        {label}
      </div>
    </div>
  );
};

export default FilterCheckbox;
