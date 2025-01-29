"use client"
import React, { useEffect, useState } from "react";
import TopicCard from "../../topics/topicCard/topicCard";
import { fetchSubtopics } from "@/app/utils/common/topics/api";
import AddSubtopicModal from "@/components/common/addSubtopicModal/addSubTopicModal";
import { editSubtopic, deleteSubtopic } from "@/app/utils/admin/topics/api";
import { useTranslation } from "react-i18next";

const SubTopicsMainPage = ({ topicId }) => {
  const { t } = useTranslation();
  const [subTopics, setSubTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSubtopic, setCurrentSubtopic] = useState(null); // For editing

  useEffect(() => {
    const loadSubtopics = async () => {
      try {
        const subtopicsData = await fetchSubtopics(topicId);
        setSubTopics(subtopicsData);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to fetch subtopics");
      } finally {
        setLoading(false);
      }
    };
    loadSubtopics();
  }, [topicId]);

  const handleAddSubtopic = (newSubtopic) => {
    setSubTopics((prevSubTopics) => [...prevSubTopics, newSubtopic]);
  };

  const handleDeleteSubtopic = async (subtopicId) => {
    try {
      const response = await deleteSubtopic(topicId, subtopicId);
      alert(response.message);
      setSubTopics((prevSubTopics) =>
        prevSubTopics.filter((subtopic) => subtopic._id !== subtopicId)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateSubtopic = (subtopic) => {
    setCurrentSubtopic(subtopic); // Set the subtopic to edit
    setModalOpen(true); // Open the modal for editing
  };

  const handleEditSubtopic = async (updatedSubtopic) => {
    try {
      const response = await editSubtopic(
        topicId,
        updatedSubtopic._id,
        updatedSubtopic
      );
      setSubTopics((prevSubTopics) =>
        prevSubTopics.map((subtopic) =>
          subtopic._id === updatedSubtopic._id ? response : subtopic
        )
      );
      setModalOpen(false); // Close modal after edit
      setCurrentSubtopic(null); // Reset current subtopic
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <p className="text-headingColor text-2xl font-bold">{t("subtopics.title")}</p>
        <button
          className="text-white bg-gradient-to-t from-btnColorOne to-btnColor rounded-md p-2 w-auto"
          onClick={() => {
            setCurrentSubtopic(null); // Clear current subtopic for adding
            setModalOpen(true);
          }}
        >
          + {t("subtopics.newSubTopic")}
        </button>
      </div>

      {loading && <p>Loading subtopics...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 gap-4">
        {subTopics.length > 0
          ? subTopics.map((subtopic) => (
              <TopicCard
                key={subtopic._id}
                heading={subtopic.title}
                description={subtopic.description}
                goToSubSubtopic={true}
                isSubtopic={true}
                id={subtopic._id}
                onDelete={handleDeleteSubtopic}
                onUpdate={handleUpdateSubtopic}
                parentId={topicId}
              />
            ))
          : !loading && <p>No subtopics available.</p>}
      </div>

      <AddSubtopicModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setCurrentSubtopic(null); // Reset when modal is closed
        }}
        onSubtopicAdded={handleAddSubtopic}
        topicId={topicId}
        subtopic={currentSubtopic} // Pass current subtopic for editing
        onSubtopicEdited={handleEditSubtopic} // Pass edit handler
      />
    </div>
  );
};

export default SubTopicsMainPage;
