"use client"
import Footer from '@/components/common/footer/footer'
import Header from '@/components/common/header/header'
import RefundPolicyContent from '@/components/refundPolicy/refundPolicy'
import React from 'react'
import { useTranslation } from 'react-i18next'

const RefundPolicy = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <RefundPolicyContent t={t} />
      <Footer />
    </div>
  )
}

export default RefundPolicy