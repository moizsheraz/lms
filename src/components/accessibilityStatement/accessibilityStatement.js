import React from 'react'
import BreadCrumb from '../common/breadCrumb/breadCrumb'

const AccessibilityStatementContent = ({ t }) => {
  return (
    <div>
      <BreadCrumb heading={t("accessibilityStatement.title")} />
      <div className='text-desColor space-y-2 px-5'>
        <p className='my-4'>{t("accessibilityStatement.para1")}</p>
        <p>{t("accessibilityStatement.para2")}</p>
        <p>{t("accessibilityStatement.para3")}</p>
        <p>{t("accessibilityStatement.para4")}</p>
        <p>{t("accessibilityStatement.para5")}</p>
        <p>{t("accessibilityStatement.para6")}</p>
        <h1 className='font-bold'>{t("accessibilityStatement.heading1")}</h1>
        <p>{t("accessibilityStatement.para7")}</p>
        <p>{t("accessibilityStatement.para8")}</p>
        <ul className="list-disc pl-10">
          <li>{t("accessibilityStatement.bullet1")}</li>
          <li>{t("accessibilityStatement.bullet2")}</li>
        </ul>
        <p>{t("accessibilityStatement.para9")}</p>
        <h2 className='font-bold'>{t("accessibilityStatement.heading2")}</h2>
        <p>{t("accessibilityStatement.para10")}</p>
        <p>{t("accessibilityStatement.para11")}</p>
        <p>{t("accessibilityStatement.para12")}</p>
        <p>{t("accessibilityStatement.para13")}</p>
        <p>{t("accessibilityStatement.para14")}</p>
        <h2 className='font-bold'>{t("accessibilityStatement.heading3")}</h2>
        <ul className="list-disc pl-10">
          <li>{t("accessibilityStatement.bullet3")}</li>
          <li>{t("accessibilityStatement.bullet4")}</li>
          <li>{t("accessibilityStatement.bullet5")}</li>
          <li>{t("accessibilityStatement.bullet6")}</li>
          <li>{t("accessibilityStatement.bullet7")}</li>
          <li>{t("accessibilityStatement.bullet8")}</li>
          <li>{t("accessibilityStatement.bullet9")}</li>
        </ul>
        <h2 className='font-bold'>{t("accessibilityStatement.heading4")}</h2>
        <ul className="list-disc pl-10">
          <li>{t("accessibilityStatement.bullet10")}</li>
          <li>{t("accessibilityStatement.bullet11")}</li>
          <li>{t("accessibilityStatement.bullet12")}</li>
          <li>{t("accessibilityStatement.bullet13")}</li>
          <li>{t("accessibilityStatement.bullet14")}</li>
          <li>{t("accessibilityStatement.bullet15")}</li>
          <li>{t("accessibilityStatement.bullet16")}</li>
          <li>{t("accessibilityStatement.bullet17")}</li>
          <li>{t("accessibilityStatement.bullet18")}</li>
          <li>{t("accessibilityStatement.bullet19")}</li>
          <li>{t("accessibilityStatement.bullet20")}</li>
          <li>{t("accessibilityStatement.bullet21")}</li>
        </ul>
        <h2 className='font-bold'>{t("accessibilityStatement.heading5")}</h2>
        <p>{t("accessibilityStatement.para15")}</p>
        <p>{t("accessibilityStatement.para16")}</p>
        <h2 className='font-bold'>{t("accessibilityStatement.heading6")}</h2>
        <p>{t("accessibilityStatement.para17")}</p>
        <ul className="list-disc pl-10">
          <li>{t("accessibilityStatement.bullet22")}</li>
          <li>{t("accessibilityStatement.bullet23")}</li>
          <li>{t("accessibilityStatement.bullet24")}</li>
          <li>{t("accessibilityStatement.bullet25")}</li>
          <li>{t("accessibilityStatement.bullet26")}</li>
          <li>{t("accessibilityStatement.bullet27")}</li>
        </ul>
        <p>{t("accessibilityStatement.para18")}</p>
        <h2 className='font-bold'>{t("accessibilityStatement.heading7")}</h2>
        <p>{t("accessibilityStatement.para19")}</p>
        <h2 className='font-bold'>{t("accessibilityStatement.heading8")}</h2>
        <p>{t("accessibilityStatement.para20")}</p>
        <ul className="list-disc pl-10">
          <li>{t("accessibilityStatement.bullet28")}</li>
          <li>{t("accessibilityStatement.bullet29")}</li>
          <li>{t("accessibilityStatement.bullet30")}</li>
          <li>{t("accessibilityStatement.bullet31")}</li>
          <li>{t("accessibilityStatement.bullet32")}</li>
        </ul>
        <p>{t("accessibilityStatement.line1")}</p>
        <p>{t("accessibilityStatement.line2")}</p>
        <p>{t("accessibilityStatement.line3")}</p>
        <p>{t("accessibilityStatement.line4")}</p>
        <p>{t("accessibilityStatement.lastUpdate")}</p>
      </div>
    </div>
  )
}

export default AccessibilityStatementContent