"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditableModal from "../editAbleModal/editAbleModal";
import { fetchTeacherBlogs, updateBlogBySlug, deleteBlogBySlug } from "@/app/utils/common/blog/api"; // Adjust path if needed
import Image from "next/image";

const BlogsTable = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalAction, setModalAction] = useState(""); // "edit" or "delete"

  // Fetch blogs when the component mounts
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsData = await fetchTeacherBlogs(); // Fetch real blogs
        setBlogs(blogsData); // Set the blogs in state
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };

    getBlogs();
  }, []);

  // Remove HTML tags and truncate to 70 characters
  const truncateDescription = (text, limit = 70) => {
    const textWithoutHtml = text.replace(/<[^>]*>/g, "");
    return textWithoutHtml.length > limit
      ? `${textWithoutHtml.substring(0, limit)}...`
      : textWithoutHtml;
  };

  const handleActionClick = (blog, action) => {
    setSelectedBlog(blog);
    setModalAction(action);
    setModalOpen(true);
  };

  const handleSave = async (updatedBlog) => {
    try {
      // If updating image, convert to Base64
      let imageData = updatedBlog.image;
      if (updatedBlog.image instanceof File) {
        const reader = new FileReader();
        imageData = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(updatedBlog.image);
        });
      }

      const updatedData = { ...updatedBlog, image: imageData };
      const updatedBlogResponse = await updateBlogBySlug(updatedData);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlogResponse._id ? updatedBlogResponse : blog
        )
      );

      alert(t("blogsTable.updateSuccess"));
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating blog:", error.message);
      alert(t("blogsTable.updateFail"));
    }
  };

  const handleDelete = async () => {
    try {
      const slug = selectedBlog.slug;
      await deleteBlogBySlug(slug);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.slug !== slug));
      alert(t("blogsTable.deleteSuccess"));
      setModalOpen(false);
    } catch (error) {
      console.error("Error deleting blog:", error.message);
      alert(t("blogsTable.deleteFail"));
    }
  };

  return (
    <div className="w-full bg-white rounded-md">
      <EditableModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={modalAction === "edit" ? handleSave : undefined}
        onDelete={modalAction === "delete" ? handleDelete : undefined}
        title={modalAction === "edit" ? "Edit Blog" : "Delete Blog"}
        data={selectedBlog}
        mode={modalAction} // Pass the current mode ("edit" or "delete")
      />

      <div className="flex items-center justify-between my-4">
        <p className="text-headingColor font-bold text-lg">
          {t("blogs.heading")}
        </p>
        <Link
          href={`${isAdmin ? "/admin/add-blogs" : "/teacher/add-blogs"}`}
          className="w-36 text-white bg-gradient-to-t from-btnColorOne to-btnColor p-2 rounded-md text-center"
        >
          + {t("addBlogs.heading")}
        </Link>
      </div>

      <div className="overflow-x-auto lg:w-[1000px]">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 py-4">{t("noBlogsYet")}</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-sm font-semibold text-headingColor bg-lightCard">
                <th className="px-4 py-3 text-left w-16">
                  {t("blogsTable.heading1")}
                </th>
                <th className="px-4 py-3 text-left w-1/4">
                  {t("blogsTable.heading2")}
                </th>
                <th className="px-4 py-3 text-left w-1/2">
                  {t("blogsTable.heading3")}
                </th>
                <th className="px-4 py-3 text-left w-24">
                  {t("blogsTable.heading4")}
                </th>
                <th className="px-4 py-3 text-left w-28">
                  {t("blogsTable.heading5")}
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b hover:bg-lightCard">
                  <td className="p-4">
                    <Image
                      width={1000}
                      height={1000}
                      src={`/${blog.image.replace("public/", "")}`}
                      alt={`Thumbnail for ${blog.title}`}
                      className="w-full h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 truncate">{blog.title}</td>
                  <td className="p-4 truncate">
                    {truncateDescription(blog.description)}
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/blog-detail/${blog.slug}`}
                      className="text-blue-500 hover:underline text-sm w-20 text-left"
                    >
                      View Detail
                    </Link>
                  </td>
                  <td className="p-4 flex items-center space-x-3 mt-3 justify-center">
                    <FiEdit
                      className="text-btnColor cursor-pointer hover:text-btnColorOne duration-500 text-lg"
                      onClick={() => handleActionClick(blog, "edit")}
                    />
                    <FiTrash2
                      className="text-red-500 cursor-pointer hover:text-red-700 duration-500 text-lg"
                      onClick={() => handleActionClick(blog, "delete")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BlogsTable;
