import React from 'react'
import BreadCrumb from '../common/breadCrumb/breadCrumb'

const CookiePolicyContent = ({ t }) => {
  return (
    <div>
      <BreadCrumb heading={t("cookiePolicy.title")} />
      <div className='text-desColor space-y-2 px-5'>
        <p className='my-2'>{t("cookiePolicy.para1")}</p>
        <p>{t("cookiePolicy.para2")}</p>
        <p>{t("cookiePolicy.para3")}</p>
        <h1 className='font-bold'>{t("cookiePolicy.heading1")}</h1>
        <p>{t("cookiePolicy.para4")}</p>
        <h2 className='font-bold'>{t("cookiePolicy.heading2")}</h2>
        <p>{t("cookiePolicy.para5")}</p>
        <h3 className='font-bold'>{t("cookiePolicy.heading3")}</h3>
        <p>{t("cookiePolicy.para6")}</p>
        <ul className="list-disc pl-10 mt-4">
          <li>{t("cookiePolicy.bullet1")}</li>
          <p>{t("cookiePolicy.line1")}</p>
          <li>{t("cookiePolicy.bullet2")}</li>
          <p>{t("cookiePolicy.line2")}</p>
          <li>{t("cookiePolicy.bullet3")}</li>
          <p>{t("cookiePolicy.line3")}</p>
          <li>{t("cookiePolicy.bullet4")}</li>
          <p>{t("cookiePolicy.line4")}</p>
        </ul>
        <h3 className='font-bold'>{t("cookiePolicy.heading4")}</h3>
        <p>{t("cookiePolicy.para7")}</p>
        <h3 className='font-bold'>{t("cookiePolicy.heading5")}</h3>
        <p>{t("cookiePolicy.para8")}</p>
        <h3 className='font-bold'>{t("cookiePolicy.heading6")}</h3>
        <p>{t("cookiePolicy.para9")}</p>
        <p>{t("cookiePolicy.para10")}</p>
      </div>
    </div>
  )
}

export default CookiePolicyContent