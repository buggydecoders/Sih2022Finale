import React, { useEffect, useRef, useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import cls from "classnames";
const CheckboxItem = ({
    value,
    title,
    selectedOptions,
    setSelectedOptions,
}) => {
    const handleChange = (e) => {
        if (e.target.checked) return setSelectedOptions((prev) => [...prev, value]);
        else setSelectedOptions((prev) => prev.filter((p) => p != value));
    };
    return (
        <div className="flex gap-2 items-center">
            <input
                type="checkbox"
                onChange={handleChange}
                checked={selectedOptions.includes(value)}
                className="border-[3px] w-[16px] h-[16px] checkbox-custom border-black appearance-none bg-white"
            ></input>
            <div className="text-black">{title}</div>
        </div>
    );
};

const FilterOptions = ({
    title,
    options,
    selectedOptions,
    setSelectedOptions,
    color,
    secColor,
    containerClass,
    isSearch,
    filterOptions,
    handleChangeAll,
    allOptions,
    isAllSelected,
    isTransparent
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleClick = () => setOpen(false);
        if (typeof window !== undefined) {
            window.addEventListener("click", handleClick);
        }

        return () => window.removeEventListener("click", handleClick);
    }, []);

    const ref = useRef();
    const [width, setWidth] = useState();
    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.clientWidth);
        }
    }, [ref.current]);

    return (
        <div
            ref={ref.current}
            style={{ background: isTransparent ? 'transparent' : '' }}
            className={cls("py-2 px-3 bg-white text-black w-full relative", containerClass)}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            >
                <div
                    className={cls(
                        `font-[600] text-base text-${color ? color : "black"}`
                    )}
                >
                    {title}
                </div>
                <div
                    className={
                        title === "recommended"
                            ? "px-2"
                            : "px-2 border-l-black border-l-[1px]"
                    }
                    style={{
                        color: secColor ? secColor : "#E2703A",
                        borderLeft: "1px solid balck",
                    }}
                >
                    <TbChevronDown size={19} />
                </div>
            </div>
            {open && (
                <div className="mt-4 w-full bg-white p-3 left-0 absolute bottom-0 translate-y-[100%] z-[100000]  space-y-2">
                    {isSearch && (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                onChange={(e) => filterOptions(e.target.value)}
                                placeholder="Search Option"
                                className="w-full px-2 rounded-sm outline-none border-[2px] border-black py-1"
                            />
                            <input
                                className="appearance-none checkbox-custom h-[25px] w-[25px] border-[2px] border-black"
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={(e) =>
                                    e.target.checked
                                        ? setSelectedOptions(allOptions)
                                        : setSelectedOptions([])
                                }
                            ></input>
                        </div>
                    )}
                    <div className="p-2 bg-gray-200">
                        {options.map((option) => (
                            <CheckboxItem
                                value={option}
                                title={option}
                                setSelectedOptions={setSelectedOptions}
                                selectedOptions={selectedOptions}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterOptions;