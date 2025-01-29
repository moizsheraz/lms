import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineShare } from "react-icons/md";
import {
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaEllipsisH,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FiCopy } from "react-icons/fi";

const HeroSection = ({ courseData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedCourseImage = courseData.courseImage
    ? courseData.courseImage.replace(/^public[\\/]+/, "").replace(/\\/g, "/")
    : "/images/jpg/man2.jpg";

  const courseLink = `https://justagame.tech/course-detail/${courseData._id}`;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const copyLink = () => {
    navigator.clipboard.writeText(courseLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-[60vh] md:h-[80vh] object-cover rounded-xl"
          src={`/${formattedCourseImage}`}
          alt="Hero Image"
          // width={1000}
          // height={1000}
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl">
          <div className="flex justify-between items-center px-6 py-4 w-full absolute bottom-4 md:bottom-2">
            <div className="max-w-xs md:max-w-md">
              <p className="font-bold text-lg md:text-2xl text-white">
                {courseData.name}
              </p>
              <p className="text-sm md:text-base text-gray-300">
                {courseData.description.length > 51
                  ? `${courseData.description.slice(0, 51)}...`
                  : courseData.description}
              </p>
              {courseData.courseId && (
                <p className="text-sm md:text-base text-gray-300">
                 Course Id : {courseData.courseId}
                </p>
              )}
            </div>

            <div
              onClick={openModal}
              className="w-10 h-10 bg-white flex items-center justify-center text-btnColor rounded-full p-1 cursor-pointer"
            >
              <MdOutlineShare className="text-lg" />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 md:w-96 shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <IoMdClose className="text-2xl" />
            </button>

            <div className="flex flex-col items-center">
              <img
                className="rounded-md mb-4 w-full h-full"
                src={`/${formattedCourseImage}`}
                alt="Course Image"

                // width={200}
                // height={120}
              />

              <h3 className="text-xl font-bold text-center mb-1">
                {courseData.name}
              </h3>
              <p className="text-center text-gray-600 mb-4">
                {courseData.description.length > 51
                  ? `${courseData.description.slice(0, 51)}...`
                  : courseData.description}
              </p>

              <p className="text-center font-semibold text-lg mb-2">Share</p>
              <div className="flex justify-center gap-4 mb-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    courseLink
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  <FaFacebook size={30} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    courseLink
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  <FaLinkedin size={30} />
                </a>
                <a
                  href={`mailto:?subject=Check out this course!&body=I found this course and thought you might like it: ${courseLink}`}
                  className="text-red-600"
                >
                  <FaEnvelope size={30} />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Check out this course: ${courseLink}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500"
                >
                  <FaWhatsapp size={30} />
                </a>
                <a href="#" className="text-gray-600">
                  <FaEllipsisH size={30} />
                </a>
              </div>

              <div className="w-full mb-4">
                <p className="text-center text-gray-500 mb-2">or copy link</p>
                <div className="flex items-center border rounded-md p-2">
                  <input
                    type="text"
                    value={courseLink}
                    readOnly
                    className="w-full text-gray-500 outline-none"
                  />
                  <button
                    onClick={copyLink}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    <FiCopy size={20} />
                  </button>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="bg-blue-100 text-blue-600 w-full py-2 rounded-lg mt-4 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
