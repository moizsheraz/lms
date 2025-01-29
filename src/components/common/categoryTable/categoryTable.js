"use client";
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditableModal from "../editAbleModal/editAbleModal";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  fetchCategories,
  updateCategoryById,
  deleteCategoryById,
} from "@/app/utils/common/blog/api";

const CategoryTable = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalAction, setModalAction] = useState(""); // 'edit' or 'delete'

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    };

    loadCategories();
  }, []);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setModalAction("edit");
    setModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setModalAction("delete");
    setModalOpen(true);
  };

  const handleSave = async (updatedCategory) => {
    try {
      const response = await updateCategoryById({
        id: selectedCategory._id, // Ensure you're using "_id" if that's the actual key
        name: updatedCategory.name,
        details: updatedCategory.details,
      });
      window.location.reload();
      // Update the state with the updated category
    } catch (error) {
      console.error("Failed to update category:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategoryById(selectedCategory._id);
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== selectedCategory._id)
      );
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete category:", error.message);
    }
  };

  return (
    <div className="w-full bg-white rounded-md">
      <EditableModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={modalAction === "edit" ? handleSave : undefined}
        onDelete={modalAction === "delete" ? handleDelete : undefined}
        title={modalAction === "edit" ? "Edit Category" : "Delete Category"}
        data={selectedCategory}
        mode={modalAction}
      />

      <div className="flex items-center justify-between my-4">
        <p className="text-headingColor font-bold text-lg">
          {t("blogsSidebar.heading")}
        </p>
        {isAdmin &&
          <Link
            href="/admin/add-category"
            className="w-36 text-white bg-gradient-to-t from-btnColorOne to-btnColor p-2 rounded-md text-center"
          >
            + {t("blogsTable.addCategory")}
          </Link>
        }
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm font-semibold text-headingColor bg-lightCard">
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Description</th>
             {isAdmin &&
              <th className="px-4 py-3 text-center">Actions</th>
             }
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b hover:bg-lightCard">
                <td className="p-4">{category.name}</td>
                <td className="p-4">{category.details}</td>
              {isAdmin &&
                <td className="p-4 flex justify-center gap-4">
                  <button
                    className="text-btnColor hover:text-btnColorOne duration-500"
                    onClick={() => handleEditClick(category)}
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 duration-500"
                    onClick={() => handleDeleteClick(category)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
