import React from "react";

const SummarytitleCard = (props) => {
  return (
    <div className="w-full p-2 border rounded-md flex items-center justify-between my-2">
      <p className="text-headingColor font-bold">{props.heading}</p>
      {!props.isPrev && (
        <button
          onClick={props.onButtonClick} // Call the function on button click
          className="w-32 p-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded-md"
        >
          {props.button}
        </button>
      )}
    </div>
  );
};

export default SummarytitleCard;
