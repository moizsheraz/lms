import React from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const CouponCard = ({ heading, percent, onEdit, onDelete }) => {
  return (
    <div className="w-full p-3 bg-white border rounded-md my-2 flex items-center justify-between">
      <p className="text-headingColor text-sm">{heading}</p>
      <div className="flex items-center justify-center px-5 gap-5 border-l-2 border-dashed">
        <div className="flex items-center gap-2">
          <RiDeleteBin6Line
            className="text-red-600 cursor-pointer"
            onClick={onDelete}
          />
          <MdEdit
            className="text-headingColor cursor-pointer"
            onClick={onEdit}
          />
        </div>
        <p className="text-btnColor">{percent}</p>
      </div>
    </div>
  );
};

export default CouponCard;
