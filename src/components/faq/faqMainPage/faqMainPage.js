"use client"
import BreadCrumb from '@/components/common/breadCrumb/breadCrumb'
import React from 'react'
import FaqContent from '../faqContent/faqContent'
import { useTranslation } from 'react-i18next';

const FaqMainPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <BreadCrumb heading={t("faqSection.title")} />
      <FaqContent t={t} />
    </div>
  )
}

export default FaqMainPage