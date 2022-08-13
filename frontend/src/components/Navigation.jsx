import React from "react";
import cls from "classnames";
import { TiLocationArrow } from "react-icons/ti";
import { useState } from "react";

const NavigationItem = ({ title, selected, setSelected }) => {
  let active = selected === title;
  return (
    <div
      onClick={() => setSelected(title)}
      className={cls(
        "flex items-center relative border-b-[1px] cursor-pointer py-3 hover:text-primary hover:font-[500] px-2",
        { "text-primary font-[600]": active }
      )}
    >
      {active && (
        <TiLocationArrow size={24} className="absolute -left-5 rotate-45" />
      )}
      {title}
    </div>
  );
};

const Navigation = (props) => {
  const {states, selected, handleNavigation} = props;
  
  return (
    <div className="px-2 border-l-[1px] border-gray-400">
      {states.map((s) => (
        <NavigationItem
          title={s}
          selected={selected}
          setSelected={handleNavigation}
        />
      ))}
    </div>
  );
};

export default Navigation;
