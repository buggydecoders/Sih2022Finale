import React from "react";

const FilterCheckbox = ({ title, data, setData, idx }) => {
  const handleChange = (e) => {
    let checked = e.target.checked;
    checked
      ? setData([...data, title])
      : setData(
        data?.filter((e) => {
          return (e !== title)
        })
      );
  };
  return (
    <div className="flex  gap-3 items-center" key={idx}>
      <div className="">
        <input
          type="checkbox"
          className="appearance-none border-[1px] checked:bg-primary checked:border-secondary w-[16px] h-[16px] border-gray-500 rounded-sm"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="font-[500] text-black relative -top-1 text-sm">
        {title}
      </div>
    </div>
  );
};

export default FilterCheckbox;
