import React from "react";

const TaxReturnItem = ({ taxReturn }) => {
 const {
  adjustedGrossIncome,
  exemptions,
  filingStatus,
  selfEmploymentTax,
  taxPerReturn,
  taxYear,
  taxableIncome,
 } = taxReturn;
 return (
  <div className='card'>
   <ul>
    <li>Year:{taxYear}</li>
    <li>AGI:{adjustedGrossIncome}</li>
    <li>Taxable Income:{taxableIncome}</li>
    <li>Taxes Per Return:{taxPerReturn}</li>
    <li>Filing Status:{filingStatus}</li>
    {exemptions !== "0" && <li>Exemptions: {exemptions}</li>}
    {selfEmploymentTax !== "0" && <li>Self Employment Tax: {exemptions}</li>}
    <li></li>
   </ul>
  </div>
 );
};

export default TaxReturnItem;
