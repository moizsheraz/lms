"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { createBlog } from "@/app/utils/common/blog/api";
import { fetchCategories } from "@/app/utils/common/blog/api";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill for SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const AddBlogsForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
    description: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // State to hold categories
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories when the component mounts
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories); // Set the fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, thumbnail: null }));
    setImagePreview(null);
  };

  const handleTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags((prevTags) => [...prevTags, newTag.trim()]);
        setNewTag("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let base64Image = null;
    if (formData.thumbnail) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.thumbnail);
      base64Image = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    }

    const blogData = {
      title: formData.title,
      image: base64Image,
      blogName: formData.title,
      description: formData.description,
      category,
      tags,
    };

    try {
      await createBlog(blogData);
      alert(t("addBlogs.success"));
      setFormData({ title: "", thumbnail: null, description: "" });
      setImagePreview(null);
      setTags([]);
      setCategory("");
    } catch (error) {
      alert(t("addBlogs.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-headingColor">
        {t("addBlogs.heading")}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-headingColor font-medium mb-2"
          >
            {t("addBlogs.title")}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            placeholder={t("addBlogs.titlePlaceholder")}
            required
          />
        </div>

        {/* Thumbnail Field */}
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-headingColor font-medium mb-2"
          >
            {t("addBlogs.image")}
          </label>
          <div className="relative">
            {imagePreview ? (
              <div className="relative w-40 h-40 overflow-hidden rounded-md shadow-lg">
                <img
                  src={imagePreview}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition"
                  onClick={handleRemoveImage}
                >
                  <RxCross1 className="text-headingColor text-xl" />
                </button>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
                onClick={() => document.getElementById("thumbnail").click()}
              >
                <FiEdit className="text-btnColor text-2xl" />
                <span className="ml-2 text-headingColor">
                  {t("addBlogs.imagePlaceholder")}
                </span>
                <input
                  type="file"
                  id="thumbnail"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                 <div className="text-sm my-1 text-red-500">
            <span>{t("imageSize")}</span>
          </div>
              </div>
            )}
          </div>
        </div>

        {/* Categories Dropdown */}
        <div>
          <label
            htmlFor="category"
            className="block text-headingColor font-medium mb-2"
          >
            {t("addBlogs.category")}
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          >
            <option value="">{t("addBlogs.categoryPlaceholder")}</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option value="">{t("addBlogs.noCategories")}</option>
            )}
          </select>
        </div>

        {/* Tags Input */}
        <div>
          <label
            htmlFor="tags"
            className="block text-headingColor font-medium mb-2"
          >
            {t("addBlogs.tags")}
          </label>
          <input
            type="text"
            id="tags"
            value={newTag}
            onChange={handleTagChange}
            onKeyDown={handleAddTag}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            placeholder={t("addBlogs.tagsPlaceholder")}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full flex items-center"
              >
                {tag}
                <RxCross1
                  className="ml-2 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-headingColor font-medium mb-2"
          >
            {t("addBlogs.description")}
          </label>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            className="outline-none w-full rounded-md"
            placeholder={t("addBlogs.descriptionPlaceholder")}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-btnColor text-white py-2 px-6 rounded-md hover:bg-btnColorOne transition disabled:opacity-50"
          >
            {isSubmitting ? t("addBlogs.submitting") : t("addBlogs.btn")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogsForm;
