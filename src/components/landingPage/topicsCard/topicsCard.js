import Link from "next/link";
import React from "react";

const TopicsCard = (props) => {
  return (
    <Link
      href={`/course-detail/${props.courseId}`}
      className="block relative w-full lg:w-[20%] h-40 rounded-t-lg mb-20 lg:mb-4"
    >
      <img
        src={props.bgImage}
        alt="Topic Background"
        className="w-full h-full object-cover rounded-t-lg"
      />
      <div className="w-full h-full absolute bottom-2 bg-gradient-to-t from-desColor to-transparent rounded-t-lg">
        <div className="absolute bottom-3 p-2">
          <p className="text-white font-bold">
            {props.heading.length > 35
              ? props.heading.slice(0, 35) + "..."
              : props.heading}
          </p>
        </div>
      </div>
      <div className="absolute -bottom-16 lg:-bottom-20 p-2 lg:p-1 text-paraColor text-sm border border-t-0 bg-white w-full">
        <p>{props.description}</p>
      </div>
    </Link>
  );
};

export default TopicsCard;
