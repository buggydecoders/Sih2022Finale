import React from "react";

function Accordian(props) {
  return (
      <div className="accordion">
        <div className="accordion-item bg-white border-b-2 border-gray-200">
          <h2 className="accordion-header mb-0" id="headingOne">
            <button
              className="
                accordion-button
                relative
                flex
                items-center
                w-full
                py-4
                px-5
                text-base text-gray-800 text-left
                bg-white
                border-0
                rounded-none
                transition
                focus:outline-none
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${props._id}`}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {props.heading}
            </button>
          </h2>
          <div
            id={props._id}
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
          >
            <div className="accordion-body py-4 px-5">
              {props.content}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Accordian;
