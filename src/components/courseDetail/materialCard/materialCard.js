import Image from "next/image";
import React from "react";
import { FaLock } from "react-icons/fa";

const MaterialCard = ({ link, isPurchased, name }) => {
  console.log("l", link);
  return (
    <div className="w-full p-2 sm:p-3 border rounded-md my-2 flex items-center justify-between text-xs sm:text-sm">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Image
            className="w-8 h-8"
            src="/images/png/link.png"
            width={1000}
            height={1000}
            alt="Link Icon"
          />
          {isPurchased ? (
          <a
          href={link.startsWith('http') ? link : `https://${link}`} // Ensure an absolute URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-headingColor text-sm font-bold"
        >
          {name}
        </a>
        
          ) : (
            <div className="flex items-center gap-2">
              <FaLock
                className="text-gray-400 cursor-pointer"
                title="Purchase this course to access the content"
              />
              <span className="text-headingColor text-sm font-bold">
              {name}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Image
            className="w-8 h-8"
            src="/images/png/cloud.png"
            width={1000}
            height={1000}
            alt="Download Icon"
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
