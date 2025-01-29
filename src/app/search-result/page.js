"use client";
import SearchResultMainPage from "@/components/searchResult/searchResultMainPage/searchResultMainPage";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Child component to handle search query logic
const SearchResultContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query"); // Extract the query parameter from the URL

  return <SearchResultMainPage searchQuery={query} />;
};

// Main component with Suspense wrapper
const SearchResult = () => {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchResultContent />
    </Suspense>
  );
};

export default SearchResult;
