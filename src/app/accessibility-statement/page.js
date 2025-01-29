"use client"
import AccessibilityStatementContent from '@/components/accessibilityStatement/accessibilityStatement'
import Footer from '@/components/common/footer/footer'
import Header from '@/components/common/header/header'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Accessibilitystatement = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <AccessibilityStatementContent t={t} />
      <Footer />
    </div>
  )
}

export default Accessibilitystatement