"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createCategory } from "@/app/utils/common/blog/api";
const AddCategoryForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [successMessage, setSuccessMessage] = useState(""); // For success message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      console.log("Submitting Category Data:", formData);

      // Call createCategory function with the formData
      const category = await createCategory({
        name: formData.title,
        details: formData.description,
      });
 
      setSuccessMessage(t("addCategory.successMessage"));
      console.log("Category Created Successfully:", category);

      // Reset form
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to create category:", error.message);
      setError(t("addCategory.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-headingColor">
        {t("addCategory.heading")}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-headingColor font-medium mb-2"
          >
            {t("addCategory.title")}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            placeholder={t("addCategory.titlePlaceholder")}
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-headingColor font-medium mb-2"
          >
            {t("addCategory.description")}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            placeholder={t("addCategory.descriptionPlaceholder")}
            required
          />
        </div>

        {/* Error or Success Messages */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-btnColor text-white py-2 px-6 rounded-md hover:bg-btnColorOne duration-500"
            disabled={loading}
          >
            {loading ? t("addCategory.loading") : t("addCategory.btn")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
