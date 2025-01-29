"use client"
import Footer from '@/components/common/footer/footer'
import Header from '@/components/common/header/header'
import PrivacyPolicyContent from '@/components/privacyPolicy/privacyPolicy'
import React from 'react'
import { useTranslation } from 'react-i18next'

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <PrivacyPolicyContent t={t} />
      <Footer />
    </div>
  )
}

export default PrivacyPolicy