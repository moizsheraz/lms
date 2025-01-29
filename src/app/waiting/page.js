"use client"
import WaitingMainPage from '@/components/waiting/waitingMainPage/waitingMainPage'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Waiting = () => {
  const { t } = useTranslation();

  return (
    <div>
      <WaitingMainPage t={t} />
    </div>
  )
}

export default Waiting