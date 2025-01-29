import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";

const CoursesCard = (props) => {
  // Construct the corrected image path
  const correctedImagePath = "/" + props.bgImage;

  return (
    <Link
      href={`course-detail/${props.courseId}`}
      className="block relative my-2 w-full h-48 lg:w-[30%] rounded-md"
    >
      {/* Use Next.js Image component */}
      <div className="relative w-full h-full">
        <img
          src={correctedImagePath}
          alt={props.heading}
          layout="fill" // Make the image fill the container
          objectFit="cover" // Ensure the image covers the whole area
          className="rounded-md h-full w-full"
        />
      </div>

      <div className="flex justify-end p-2 text-white text-3xl">
        <CiHeart />
      </div>
      {props.iscourses ? (
        <div className="flex items-center gap-3 absolute lg:bottom-12 bottom-20 p-2 ">
          <button className="text-white hover:bg-white hover:bg-opacity-30 border rounded-lg p-2 text-xs">
            Courses
          </button>
          <button className="text-white hover:bg-white hover:bg-opacity-30 border rounded-lg p-2 text-xs">
            12 Chapters
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="p-2 absolute bottom-0 bg-white/30 backdrop-blur-sm w-full">
        <p className="text-headingColor font-bold text-xl">{props.heading.slice(0, 30)}</p>
        <p className="text-headingColor text-sm">{props.description.slice(0, 49)}</p>
      </div>
    </Link>
  );
};

export default CoursesCard;
