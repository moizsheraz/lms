"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

// Dynamically import React Quill to prevent server-side rendering issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

const EditableModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  title,
  data,
  mode = "edit",
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState(data || {});

  React.useEffect(() => {
    if (data) {
      // Filter out unwanted fields and keep hidden fields in formData
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([key]) =>
            ![
              "_id",
              "teacher",
              "category",
              "date",
              "createdAt",
              "updatedAt",
              "__v",
            ].includes(key)
        )
      );
      setFormData(filteredData);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleQuillChange = (content, delta, source, editor) => {
    setFormData((prev) => ({ ...prev, description: content })); // Assuming `description` is the field to be updated
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(); // Call the passed delete function
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[500px] overflow-auto rounded-md p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {mode === "edit" ? (
          <>
            <form>
              {Object.keys(formData).map((key) => (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium mb-1 capitalize">
                    {key}
                  </label>
                  {key === "image" ? (
                    <>
                      <input
                        type="file"
                        name={key}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <div className="text-sm my-1 text-red-500">
                        <span>{t("imageSize")}</span>
                      </div>
                    </>
                  ) : key === "description" ? ( // Assuming "description" uses React Quill
                    <ReactQuill
                      value={formData[key] || ""}
                      onChange={handleQuillChange}
                      className="w-full rounded-md mt-2"
                      placeholder={t("editableModal.descriptionPlaceholder")}
                    />
                  ) : key === "teacher" || key === "category" ? ( // Conditionally hide certain fields
                    <input type="hidden" name={key} value={formData[key]} />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                </div>
              ))}
            </form>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                {t("editableModal.cancel")}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {t("editableModal.save")}
              </button>
            </div>
          </>
        ) : (
          <div>
            <p className="mb-6">
              {t("editableModal.areYouSure")}{" "}
              <strong>{data?.title || t("editableModal.thisItem")}</strong>?{" "}
              {t("editableModal.actionCannotBeUndone")}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                {t("editableModal.cancel")}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                {t("editableModal.delete")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableModal;
