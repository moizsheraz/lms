import React from 'react'
import BreadCrumb from '../common/breadCrumb/breadCrumb'

const PrivacyPolicyContent = ({ t }) => {
  return (
    <div>
      <BreadCrumb heading={t("privacyPolicy.title")} />
      <div className='px-5 text-desColor space-y-2'>
        <p className='my-2'>{t("privacyPolicy.para1")}</p>
        <h1 className='font-bold'>{t("privacyPolicy.heading1")}</h1>
        <p>{t("privacyPolicy.para2")}</p>
        <p className='pl-6'>{t("privacyPolicy.point1")}</p>
        <p className='pl-6'>{t("privacyPolicy.point2")}</p>
        <p>{t("privacyPolicy.para3")}</p>
        <p>{t("privacyPolicy.para4")}</p>
        <p className='font-bold'>{t("privacyPolicy.heading2")}</p>
        <p>{t("privacyPolicy.para5")}</p>
        <ul className="list-disc pl-10">
          <li>{t("privacyPolicy.bullet1")}</li>
          <li>{t("privacyPolicy.bullet2")}</li>
          <li>{t("privacyPolicy.bullet3")}</li>
        </ul>
        <p className='font-bold'>{t("privacyPolicy.heading3")}</p>
        <p>{t("privacyPolicy.para6")}</p>
        <ul className="list-disc pl-10 mt-4">
          <li>{t("privacyPolicy.bullet4")}</li>
          <li>{t("privacyPolicy.bullet5")}</li>
        </ul>
        <p className='font-bold'>{t("privacyPolicy.heading4")}</p>
        <p>{t("privacyPolicy.para7")}</p>
        <p className='font-bold'>{t("privacyPolicy.heading5")}</p>
        <p>{t("privacyPolicy.para8")}</p>
        <p className='font-bold'>{t("privacyPolicy.heading6")}</p>
        <p>{t("privacyPolicy.para9")}</p>
        <p className='font-bold'>{t("privacyPolicy.heading7")}</p>
        <p>{t("privacyPolicy.para10")}</p>
        <p>{t("privacyPolicy.para11")}</p>
        <p>{t("privacyPolicy.para12")}</p>
        <p className='font-bold'>{t("privacyPolicy.heading8")}</p>
        <p>{t("privacyPolicy.para13")}</p>
        <p className='font-bold'>{t("privacyPolicy.heading9")}</p>
        <p>{t("privacyPolicy.para14")}</p>
        <p>{t("privacyPolicy.lastUpdate")}</p>
      </div>
    </div>
  )
}

export default PrivacyPolicyContent