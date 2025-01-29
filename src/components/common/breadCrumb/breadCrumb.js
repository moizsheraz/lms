"use client";
import React, { useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const BreadCrumb = ({ isSearch, heading, searchQuery }) => {
  const { register, setValue, handleSubmit } = useForm({
    defaultValues: { query: searchQuery || "" },
  });
  const router = useRouter();

  // Update the input value if `searchQuery` changes
  useEffect(() => {
    setValue("query", searchQuery || "");
  }, [searchQuery, setValue]);

  // Handle search submission
  const onSubmit = (data) => {
    const query = data.query.trim();
    // If the query is empty, use 'all' as the default query
    const searchQuery = query ? query : "all";
    router.push(`/search-result?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="bg-gradient-to-t to-btnColor from-btnColorOne p-8 md:p-16">
      {isSearch ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
           className="flex items-center justify-center"
        >
          <div className="flex items-center justify-between p-2 w-[90%] sm:w-96 bg-white rounded-full">
            <div className="flex items-center gap-1">
              <MdSearch className="text-lg sm:text-xl" />
              <input
                className="lg:w-72 w-full outline-none text-headingColor"
                type="search"
                placeholder="Search"
                {...register("query")} // Register input with react-hook-form
              />
            </div>
            <button
              type="submit"
              className="w-7 h-7 sm:w-8 sm:h-8 text-lg sm:text-xl bg-gradient-to-t to-btnColor from-btnColorOne rounded-full p-1 flex items-center justify-center text-white"
            >
              <MdSearch />
            </button>
          </div>
        </form>
      ) : (
        <p
          className={`text-white text-3xl md:text-5xl text-center font-bold w-full ${
            heading === "Frequently Asked Question"
              ? " md:w-[420px]"
              : " md:w-[300px]"
          } mx-auto`}
        >
          {heading}
        </p>
      )}
    </div>
  );
};

export default BreadCrumb;
