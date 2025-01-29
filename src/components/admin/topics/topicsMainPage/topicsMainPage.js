"use client";
import React, { useEffect, useState } from "react";
import TopicCard from "../topicCard/topicCard";
import { fetchTopics } from "@/app/utils/common/topics/api";
import AddTopicModal from "@/components/common/addTopicModal/addTopicModal";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const TopicsMainPage = () => {
  const { t } = useTranslation();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const topicsData = await fetchTopics();
        setTopics(topicsData);
      } catch (err) {
        setError(err.message || "Error loading topics");
      } finally {
        setLoading(false);
      }
    };
    loadTopics();
  }, []);

  const handleDeleteTopic = (id) => {
    setTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== id));
  };

  const handleAddTopic = (newTopic) => {
    setTopics((prevTopics) => [...prevTopics, newTopic]); // Update the topics list
  };

  // Add the handleTopicUpdate function
  const handleTopicUpdate = (updatedTopic) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic._id === updatedTopic._id ? updatedTopic : topic
      )
    );
  };
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <p className="text-headingColor text-2xl font-bold">{t("topics.title")}</p>
        <button
          className="text-white bg-gradient-to-t from-btnColorOne to-btnColor rounded-md p-2 w-auto"
          onClick={() => setModalOpen(true)} // Open modal on click
        >
          + {t("topics.newTopic")}
        </button>
      </div>

      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : topics.length === 0 ? (
        <p className="text-gray-500 text-center">No topics yet.</p>
      ) : (
        topics.map((topic) => (
          <TopicCard
            key={topic._id}
            heading={topic.title}
            description={topic.description}
            isSubtopic={false}
            id={topic._id}
            onDelete={handleDeleteTopic}
            onUpdate={handleTopicUpdate}
          />
        ))
      )}

      <AddTopicModal
        t={t}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onTopicAdded={handleAddTopic}
      />
    </div>
  );
};

export default TopicsMainPage;
