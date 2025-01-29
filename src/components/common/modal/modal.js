"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';

const Modal = ({ showModal, closeModal, onDelete }) => {
    const { t } = useTranslation();

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                <p className="text-lg font-bold text-headingColor mb-4">{t("deleteAccountModal.title")}</p>
                <p className='text-headingColor text-sm'>{t("deleteAccountModal.description")}</p>
                <ul className="list-disc list-inside text-headingColor text-sm my-4">
                    <li>{t("deleteAccountModal.point1")}</li>
                    <li>{t("deleteAccountModal.point2")}</li>
                    <li>{t("deleteAccountModal.point3")}</li>
                </ul>
                <p className='text-headingColor text-sm my-1'>{t("deleteAccountModal.proceedMessage")}</p>
                <p className='text-headingColor text-sm my-1'>{t("deleteAccountModal.cancelMessage")}</p>

                <div className="flex gap-6 mt-6">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={onDelete}
                    >
                       {t("deleteAccountModal.deleteAccount")}
                    </button>
                    <button
                        className="bg-cyan-100 text-btnColor px-12 py-2 rounded-md"
                        onClick={closeModal}
                    >
                        {t("deleteAccountModal.close")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;