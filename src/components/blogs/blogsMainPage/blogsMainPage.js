"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/common/header/header";
import BlogCard from "../blogCard/blogCard";
import BlogSidebar from "../blogSidebar/blogSidebar";
import Footer from "@/components/common/footer/footer";
import SubsribeSection from "../subscribeSection/subsribeSection";
import { useTranslation } from "react-i18next";
import BreadCrumb from "@/components/common/breadCrumb/breadCrumb";
import { fetchBlogs } from "@/app/utils/common/blog/api";
import LoadingScreen from "@/components/common/loading/Loading";

const BlogsMainPage = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await fetchBlogs();
        setBlogs(blogs);
        setFilteredBlogs(blogs); // Initially show all blogs
      } catch (err) {
        setError(err.message || "Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  // Filter blogs by category ID
  const handleCategoryClick = (categoryId) => {
    if (!categoryId) {
      setFilteredBlogs(blogs); // Show all blogs if no category selected
    } else {
      const filtered = blogs.filter((blog) => blog.category._id === categoryId);
      setFilteredBlogs(filtered);
    }
  };

  return (
    <div>
      <Header />
      <BreadCrumb heading={t("blogs.heading")} />
      <div className="lg:px-8 p-1">
        <div className="lg:flex block gap-3">
          <div className="w-full lg:w-[79%]">
            {loading ? (
              <>
                <LoadingScreen />
              </>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  img={blog.image || "/images/jpg/default.jpg"}
                  date={new Date(blog.createdAt).toDateString()}
                  heading={blog.title}
                  slug={blog.slug}
                  description={blog.description}
                />
              ))
            ) : (
              <p>No blogs found for this category.</p>
            )}
          </div>
          <div className="w-full lg:w-[20%]">
            <SubsribeSection />
            {/* Pass the handler to the BlogSidebar */}
            <BlogSidebar onCategoryClick={handleCategoryClick} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogsMainPage;
