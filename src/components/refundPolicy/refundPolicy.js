import React from 'react'
import BreadCrumb from '../common/breadCrumb/breadCrumb'

const RefundPolicyContent = ({ t }) => {
  return (
    <div>
      <BreadCrumb heading={t("refundPolicy.title")} />
      <div className='text-desColor space-y-2 px-5'>
        <h1 className='font-bold my-2'>{t("refundPolicy.heading1")}</h1>
        <p>{t("refundPolicy.para1")}</p>
        <h2 className='font-bold'>{t("refundPolicy.heading2")}</h2>
        <p className='font-bold'>{t("refundPolicy.point1")}</p>
        <p>{t("refundPolicy.bullet1")}</p>
        <p className='font-bold'>{t("refundPolicy.point2")}</p>
        <p>{t("refundPolicy.bullet2")}</p>
        <h3 className='font-bold'>{t("refundPolicy.heading3")}</h3>
        <p className='font-bold'>{t("refundPolicy.point3")}</p>
        <p>{t("refundPolicy.bullet3")}</p>
        <p className='font-bold'>{t("refundPolicy.point4")}</p>
        <p>{t("refundPolicy.bullet4")}</p>
        <h4 className='font-bold'>{t("refundPolicy.heading4")}</h4>
        <p>{t("refundPolicy.bullet5")}</p>
        <p>{t("refundPolicy.bullet6")}</p>
        <p>{t("refundPolicy.lastUpdate")}</p>
      </div>
    </div>
  )
}

export default RefundPolicyContent