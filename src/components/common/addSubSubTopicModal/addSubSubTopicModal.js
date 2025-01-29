// components/common/addSubSubtopicModal/AddSubSubtopicModal.js
import React, { useEffect, useState } from "react";
import { createSubSubtopic } from "@/app/utils/admin/topics/api";
import { useTranslation } from "react-i18next";

const AddSubSubtopicModal = ({
  const: { t } = useTranslation(),
  isOpen,
  onClose,
  topicId,
  subTopicId,
  onSubSubtopicAdded,
  subSubtopic,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If editing a sub-subtopic, set the title and description
  useEffect(() => {
    if (subSubtopic) {
      setTitle(subSubtopic.title);
      setDescription(subSubtopic.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [subSubtopic]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    try {
      const newSubSubtopic = await createSubSubtopic(topicId, subTopicId, {
        title,
        description,
      });
      window.location.reload();
      onSubSubtopicAdded(newSubSubtopic); // Pass new sub-subtopic to parent component
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error adding sub-subtopic:", error);
      alert("Error: " + error.message); // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          {subSubtopic ? t("addNewTopic.editTopic3") : t("addNewTopic.heading3")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">{t("addNewTopic.title")}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">{t("addNewTopic.description")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md w-full p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 p-2 rounded-md"
              onClick={onClose}
            >
              {t("modalButtons.cancel")}
            </button>
            <button
              type="submit"
              className={`bg-gradient-to-t from-btnColorOne to-btnColor text-white p-2 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={isLoading}
            >
              {isLoading
                ? t("pleaseWait")
                : subSubtopic
                  ? "Update Sub-Subtopic"
                  : t("modalButtons.addSubSubtopic")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubSubtopicModal;
