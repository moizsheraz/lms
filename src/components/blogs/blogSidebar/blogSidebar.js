"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const BlogSidebar = ({ onCategoryClick }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("/api/category/getAll");
        setCategories(response.data.categories);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch categories.");
      }
    };

    getCategories();
  }, []);

  return (
    <div className="p-2 bg-white">
      <p className="text-headingColor text-lg font-bold my-2">
        {t("blogsSidebar.heading")}
      </p>
      <div className="text-paraColor">
        {error && <p className="text-red-500">{error}</p>}
        <p
          className="border-b py-2 cursor-pointer font-semibold"
          onClick={() => onCategoryClick(null)} // Show all blogs
        >
          All
        </p>
        {categories.length > 0 ? (
          categories.map((category) => (
            <p
              key={category._id}
              className="border-b py-2 cursor-pointer"
              onClick={() => onCategoryClick(category._id)}
            >
              {category.name}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No Category Found</p>
        )}
      </div>
    </div>
  );
};

export default BlogSidebar;
