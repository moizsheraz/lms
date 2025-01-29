"use client"
import Footer from '@/components/common/footer/footer'
import Header from '@/components/common/header/header'
import TermsAndConditions from '@/components/termsAndConditions/termsAndConditions'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TermsConditions = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <TermsAndConditions t={t} />
      <Footer />
    </div>
  )
}

export default TermsConditions