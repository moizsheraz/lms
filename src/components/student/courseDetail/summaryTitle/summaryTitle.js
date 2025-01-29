"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

const SummaryTitle = () => {
    const { t } = useTranslation();
    return (
        <div className='bg-gradient-to-t from-btnColorOne to-btnColor p-6 md:p-10 lg:p-20'>
            <p className='text-white font-bold text-base md:text-xl lg:text-2xl mx-auto mb-8 text-center'>
               {t("summaryTitle")}
            </p>
            <div className='w-full lg:w-[50%] mx-auto bg-white p-3 border rounded-md'>
               <p className='text-xs text-paraColor my-2'>UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. </p>
               <p className='text-xs text-paraColor my-2'>UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. UX (User Experience) is the process of creating products that are easy, efficient, and enjoyable to use. </p>
            </div>
        </div>
    )
}

export default SummaryTitle