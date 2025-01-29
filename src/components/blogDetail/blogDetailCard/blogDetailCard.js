import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogDetailCard = (props) => {
  return (
    <div>
      <p className="text-2xl font-extrabold text-btnColor my-4 md:my-6 lg:my-8 leading-tight">
        {props.heading}
      </p>
      <Image
        className="lg:w-full lg:h-96 w-full h-40 md:h-80"
        src={`/${props.img.replace("public/", "")}`}
        alt={props.heading}
        width={1000}
        height={1000}
      />
      <p className="text-headingColor text-sm md:text-md mt-4">
        {new Date(props.date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </p>

      <div className="flex items-center space-x-4 my-4 bg-white p-4 shadow-lg rounded-lg">
        {/* Profile Picture with Initials */}
        {props.teacher.profileImage ?
          <div className="">
            <img src={props.teacher.profileImage} className="w-10 h-10 rounded-full" />
          </div>
          : <div className="flex items-center justify-center bg-sky-400 text-white font-bold text-xl rounded-full w-12 h-12">
            {props.teacher.firstName[0].toUpperCase() +
              props.teacher.lastName[0].toUpperCase()}
          </div>}


        {/* Teacher Info */}
        <Link
          href={`/teacher-profile/${props.teacher._id}`}
          className="text-lg font-semibold text-gray-800 hover:text-white hover:bg-sky-400 px-3 py-2 rounded-lg transition-colors duration-300"
        >
          {props.teacher.firstName + " " + props.teacher.lastName}
        </Link>
      </div>

      <div className="text-headingColor my-4 md:text-md text-sm">
        {/* Render HTML content safely */}
        <div dangerouslySetInnerHTML={{ __html: props.description }} />
      </div>
      <div className="my-6">
        <p className="font-semibold text-lg mb-2">Tags:</p>
        <div className="flex flex-wrap gap-2">
          {props.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-btnColor text-white py-1 px-3 rounded-full text-sm shadow-md hover:bg-btnHover transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailCard;
