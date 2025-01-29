"use client"
import React, { useState } from "react";

const ZoomableImage = ({ src, alt = "Zoomable Image", className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Thumbnail Image */}
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-pointer`}
        onClick={handleImageClick}
      />

      {/* Modal for Zoomed-In Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
            >
              ✕
            </button>
            <img src={src} alt={alt} className="max-w-full max-h-screen" />
          </div>
        </div>
      )}
    </>
  );
};

export default ZoomableImage;
