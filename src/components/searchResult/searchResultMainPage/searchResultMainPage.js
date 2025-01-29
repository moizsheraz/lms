"use client";

import Footer from "@/components/common/footer/footer";
import Header from "@/components/common/header/header";
import React, { useState } from "react";
import SearchSidebar from "../searchSidebar/searchSidebar";
import ResultData from "../resultData/resultData";
import BreadCrumb from "@/components/common/breadCrumb/breadCrumb";

const SearchResultMainPage = ({ searchQuery }) => {
  const [filters, setFilters] = useState({
    topics: [],
    subtopics: [],
    subSubtopics: [],
  });

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <div>
      <Header />
      <BreadCrumb heading="" isSearch={true} searchQuery={searchQuery} />
      <div className="lg:flex block justify-center gap-10 my-4">
        <SearchSidebar updateFilters={updateFilters} />
        <ResultData filters={filters} searchQuery={searchQuery} />
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultMainPage;
