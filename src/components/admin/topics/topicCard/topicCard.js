import Link from "next/link";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  deleteTopic,
  deleteSubtopic,
  deleteSubSubtopic,
} from "@/app/utils/admin/topics/api";
import AddTopicModal from "@/components/common/addTopicModal/addTopicModal";

const TopicCard = (props) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  console.log("TopicCard Props:", props); // Log received props
  const handleDelete = async () => {
    const confirmed = window.confirm(
      props.isSubtopic
        ? "Are you sure you want to delete this subtopic?"
        : props.isSubSubtopic
        ? "Are you sure you want to delete this sub-subtopic?"
        : "Are you sure you want to delete this topic?"
    );

    if (confirmed) {
      try {
        if (props.isSubSubtopic) {
          console.log("Deleting sub-subtopic with ID:", props.id); // Log ID of the sub-subtopic being deleted
          await deleteSubSubtopic(props.parentId, props.parentSubId, props.id);
        } else if (props.isSubtopic) {
          await deleteSubtopic(props.parentId, props.id);
        } else {
          const response = await deleteTopic(props.id);
          alert(response.message);
          props.onDelete(props.id);
        }
        // Reload the page after successful deletion
        window.location.reload();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleTopicUpdated = (updatedTopic) => {
    window.location.reload();
    // props.onUpdate(updatedTopic);
    setEditModalOpen(false);
  };

  return (
    <div>
      <div className="w-full p-3 bg-white border rounded-md flex items-center justify-between my-2">
        <p className="text-headingColor">
          <Link
            href={
              props.goToSubSubtopic
                ? `/admin/sub-subtopics/topic=${props.parentId}&subtopic=${props.id}`
                : props.isSubtopic
                ? `/admin/sub-topics/${props.id}`
                : `/admin/sub-topics/${props.id}`
            }
          >
            {props.heading}
          </Link>
        </p>
        <div className="flex items-center gap-3">
          <RiDeleteBin6Line
            className="text-red-500 cursor-pointer"
            onClick={handleDelete}
          />
          <MdEdit
            className="text-headingColor cursor-pointer"
            onClick={handleEditClick}
          />
        </div>
      </div>
      <AddTopicModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onTopicAdded={handleTopicUpdated}
        initialTitle={props.heading}
        initialDescription={props.description}
        id={props.id}
        subTopicId={props.parentSubId}
        isSubtopic={props.isSubtopic}
        isSubSubtopic={props.isSubSubtopic}
        topicId={props.parentId}
      />
    </div>
  );
};

export default TopicCard;
