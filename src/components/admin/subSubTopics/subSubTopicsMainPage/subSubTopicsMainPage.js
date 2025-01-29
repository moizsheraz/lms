"use client";
import React, { useEffect, useState } from "react";
import TopicCard from "@/components/admin/topics/topicCard/topicCard";
import AddSubSubtopicModal from "@/components/common/addSubSubTopicModal/addSubSubTopicModal";
import { fetchSubSubtopics } from "@/app/utils/common/topics/api";
import { deleteSubSubtopic } from "@/app/utils/admin/topics/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const SubSubTopicsMainPage = (props) => {
  const { t } = useTranslation();
    const [subSubtopics, setSubSubtopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingSubSubtopic, setEditingSubSubtopic] = useState(null); // New state for editing

    useEffect(() => {
        const getSubSubtopics = async () => {
            try {
                const response = await fetchSubSubtopics(props.topicId, props.subtopicId);
                setSubSubtopics(response || []);
            } catch (error) {
                console.error("Failed to fetch sub-subtopics:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getSubSubtopics();
    }, [props.topicId, props.subtopicId]);

    const handleAddSubSubtopic = (newSubSubtopic) => {
        setSubSubtopics((prevSubSubtopics) => [...prevSubSubtopics, newSubSubtopic]);
    };

    const handleEditSubSubtopic = (subSubtopic) => {
        setEditingSubSubtopic(subSubtopic); // Set the sub-subtopic to edit
        setModalOpen(true); // Open the modal
    };

    const handleDeleteSubSubtopic = async (subSubtopicId) => {
        const confirmed = window.confirm("Are you sure you want to delete this sub-subtopic?");
        if (confirmed) {
            try {
                await deleteSubSubtopic(props.topicId, props.subtopicId, subSubtopicId);
                setSubSubtopics((prevSubSubtopics) =>
                    prevSubSubtopics.filter((subSubtopic) => subSubtopic._id !== subSubtopicId)
                );
                alert("Sub-subtopic deleted successfully.");
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <>
            <div className="flex items-center justify-between my-4">
                <p className="text-headingColor text-2xl font-bold">{t("subSubtopics.title")}</p>
                <button
                    className="text-white bg-gradient-to-t from-btnColorOne to-btnColor rounded-md p-2 w-auto"
                    onClick={() => {
                        setEditingSubSubtopic(null); // Reset editing when adding
                        setModalOpen(true);
                    }}
                >
                    + {t("subSubtopics.newSubSubTopic")}
                </button>
            </div>

            {isLoading ? (
                <LoadingScreen />
            ) : subSubtopics.length > 0 ? (
                subSubtopics.map((subSubtopic) => {
                    return (
                        <TopicCard
                            key={subSubtopic._id}
                            heading={subSubtopic.title}
                            id={subSubtopic._id}
                            parentId={props.topicId}
                            parentSubId={props.subtopicId}
                            isSubSubtopic={true}
                            onDelete={handleDeleteSubSubtopic}
                            onEdit={handleEditSubSubtopic} // Pass the edit handler
                        />
                    );
                })
            ) : (
                <p>No sub-subtopics available.</p>
            )}
 
            <AddSubSubtopicModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                topicId={props.topicId}
                subTopicId={props.subtopicId}
                onSubSubtopicAdded={handleAddSubSubtopic}
                subSubtopic={editingSubSubtopic} // Pass the editing sub-subtopic
            />
        </>
    );
};

export default SubSubTopicsMainPage;
