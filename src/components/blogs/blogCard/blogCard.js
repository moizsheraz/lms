"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdArrowForwardIos } from "react-icons/md";

const BlogCard = (props) => {
  const { t } = useTranslation();

  // Limit the description to 300 characters
  const limitedDescription = props.description.slice(0, 300);

  return (
    <Link
      href={`/blog-detail/${props.slug}`}
      className="p-3 bg-white shadow-sm lg:flex block hover:shadow-lg gap-3 transition-shadow duration-300 ease-in-out my-2"
    >
      <Image
        className="lg:w-60 lg:h-40 w-full h-40 md:h-72 transform transition-transform duration-300 ease-in-out hover:scale-95"
        src={`/${props.img.replace("public/", "")}`}
        width={1000}
        height={1000}
        alt={props.heading}
      />

      <div>
        <p className="text-btnColor font-bold text-md md:text-xl">
          {props.heading}
        </p>
        <p className="text-headingColor text-sm md:text-md">{props.date}</p>
        <p
          className="text-paraColor my-4 md:text-sm text-xs"
          dangerouslySetInnerHTML={{ __html: limitedDescription }}
        ></p>
        <div className="flex items-center gap-2 text-btnColor my-2 hover:gap-4 duration-500 hover:text-greenColor">
          <button>{t("blogs.readMore")}</button>
          <MdArrowForwardIos />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
