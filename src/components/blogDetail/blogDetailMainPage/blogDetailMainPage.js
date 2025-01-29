"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/common/header/header";
import BlogDetailCard from "../blogDetailCard/blogDetailCard";
import BlogSidebar from "@/components/blogs/blogSidebar/blogSidebar";
import Footer from "@/components/common/footer/footer";
import SubsribeSection from "@/components/blogs/subscribeSection/subsribeSection";
import { fetchBlogBySlug } from "@/app/utils/common/blog/api";
import LoadingScreen from "@/components/common/loading/Loading";
const BlogDetailMainPage = ({ slug }) => {
  const [blogPost, setBlogPost] = useState(null); // State to store blog data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the blog data on mount
    const getBlogPost = async () => {
      try {
        const blogData = await fetchBlogBySlug(slug); // Fetch blog data using slug
        console.log('b', blogData)
        setBlogPost(blogData); // Set blog data in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError("Failed to fetch blog data"); // Handle error
        setLoading(false);
      }
    };

    getBlogPost();
  }, [slug]); // Re-fetch if slug changes

  if (loading)
    return (
      <div>
        <LoadingScreen />
      </div>
    ); // Show loading text while fetching
  if (error) return <div>{error}</div>; // Show error message if fetching fails

  return (
    <div>
      <Header />
      <div className="lg:flex block gap-3 px-8">
        <div className="w-full lg:w-[79%]">
          {/* Pass the fetched blog data to BlogDetailCard */}
          <BlogDetailCard
            heading={blogPost.heading}
            img={blogPost.image}
            date={blogPost.date}
            slug={blogPost.slug}
            description={blogPost.description}
            tags={blogPost.tags}
            teacher={blogPost.teacher}
          />
        </div>
        <div className="w-full lg:w-[20%]">
          <SubsribeSection />
          {/* <BlogSidebar /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailMainPage;
