import React from "react";
import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white animate-fadeIn">
      <Image
        src="/images/png/logo.png"
        alt="Logo"
        width={1000}
        height={1000}
        className="mb-6 animate-pulse w-20 h-20"
      />
      <div className="relative w-3/4 h-4 bg-blue-200 rounded-full overflow-hidden shadow-lg">
        <div className="absolute w-1/2 h-full bg-gradient-to-r from-blue-500 to-blue-400 animate-wave"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
