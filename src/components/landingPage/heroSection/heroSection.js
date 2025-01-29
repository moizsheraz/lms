"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

// Modify HeroSection to accept t as a prop
const HeroSection = ({ t }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search-result?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className='relative bg-[url("/images/jpg/hero.jpg")] bg-origin-content bg-cover bg-center w-full h-[500px] sm:h-[600px] lg:h-[500px]'>
      <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>

      <div className="relative pt-32 sm:pt-40 lg:pt-40 z-10">
        <p className="text-center text-3xl sm:text-5xl lg:text-6xl text-white font-bold w-[90%] sm:w-[700px] mx-auto">
          {t("hero.title")}
        </p>
        {/* <p className="text-center text-xs sm:text-sm text-lightCard mt-4 w-[90%] sm:w-[450px] mx-auto">
          {t("hero.description")}
        </p> */}
        <div className="flex items-center justify-center my-6 sm:my-10">
          <div className="flex items-center justify-between p-2 w-[90%] sm:w-96 bg-white rounded-full">
            <div className="flex items-center gap-1">
              <MdSearch className="text-lg sm:text-xl" />
              <input
                className="lg:w-72 w-full outline-none text-headingColor"
                type="search"
                placeholder={t("hero.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              className="w-7 h-7 sm:w-8 sm:h-8 text-lg sm:text-xl bg-gradient-to-t to-btnColor from-btnColorOne rounded-full p-1 flex items-center justify-center text-white"
              onClick={handleSearch}
            >
              <MdSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
