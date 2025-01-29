"use client";
import React, { useEffect, useState } from "react";
import {
  createSubtopic,
  createTopic,
  editSubSubtopic,
  editSubtopic,
  updateTopic,
} from "@/app/utils/admin/topics/api";
import { useTranslation } from "react-i18next";

const AddTopicModal = ({
  const: { t } = useTranslation(),
  isOpen,
  onClose,
  onTopicAdded,
  initialTitle,
  initialDescription,
  id,
  isSubtopic,
  isSubSubtopic,
  topicId,
  subTopicId,
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [isLoading, setIsLoading] = useState(false);
  console.log('isSubSubtopic', isSubSubtopic);
  console.log('isSubtopic', isSubtopic);

  useEffect(() => {
    setTitle(initialTitle || "");
    setDescription(initialDescription || "");
  }, [initialTitle, initialDescription, isOpen]);

  const handleSubmit = async (e) => {
    console.log("topicId", topicId);
    console.log("subtopicId", subTopicId); // Ensure the correct ID is logged
    console.log("subsubtopicId", id);
    e.preventDefault();
    setIsLoading(true);
    try {
      let response;
      if (id) {
        // If an ID is provided, update the topic, subtopic, or sub-subtopic
        if (isSubSubtopic) {
          response = await editSubSubtopic(topicId, subTopicId, id, {
            title,
            description,
          });
        } else if (isSubtopic) {
          response = await editSubtopic(topicId, {
            subtopicId: id,
            title,
            description,
          });
        } else {
          response = await updateTopic({ id, title, description });
        }
      } else {
        // Otherwise, create a new topic or subtopic
        response = isSubtopic
          ? await createSubtopic(topicId, { title, description })
          : await createTopic({ title, description });
      }
      window.location.reload();
      onTopicAdded(response.topic);
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          {id ? t("addNewTopic.editTopic1") : t("addNewTopic.heading1")}
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
                : id
                  ? "Update Topic"
                  : t("modalButtons.addTopic")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTopicModal;
