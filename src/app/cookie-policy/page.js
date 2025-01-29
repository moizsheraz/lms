"use client"
import Footer from '@/components/common/footer/footer'
import Header from '@/components/common/header/header'
import CookiePolicyContent from '@/components/cookiePolicy/cookiePolicy'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CookiePolicy = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Header />
            <CookiePolicyContent t={t} />
            <Footer />
        </div>
    )
}

export default CookiePolicy