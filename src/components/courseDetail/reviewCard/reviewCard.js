import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = (props) => {
  const name = props.name || "Anonymous"; // Use the passed `name` prop directly
  const img = props.img || "";

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <FaStar key={index} className="text-orange-400" />
    ));
  };

  const renderProfileImage = () => {
    if (img !== "") {
      return (
        <Image
          className="w-6 h-6 rounded-full"
          src={img}
          width={1000}
          height={1000}
          alt="Profile"
        />
      );
    } else {
      const initials = `${name.charAt(0)}${
        name.split(" ")[1]?.charAt(0) || ""
      }`.toUpperCase();
      return (
        <div className="w-8 h-8 p-2 bg-gray-300 rounded-full flex items-center justify-center text-xs">
          <span className="text-white">{initials}</span>
        </div>
      );
    }
  };

  return (
    <div className="w-full bg-lightCard p-4 sm:p-5 my-4 rounded-md">
      <div>
        <div className="text-orange-400 flex items-center">
          {renderStars(props.rating)}
        </div>
        <p className="text-paraColor my-2 text-sm sm:text-base">
          {props.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2">
          <div className="flex items-center gap-2">
            {renderProfileImage()}
            <p className="text-headingColor text-sm sm:text-base truncate">
              {name}
            </p>
          </div>
          <p className="text-sm sm:text-base text-paraColor truncate">
            {props.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
