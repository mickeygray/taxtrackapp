import React from "react";

const TransactionItem = ({ transaction }) => {
 const { period, date, code, description, amount } = transaction;
 return (
  <div className='card bg-secondary'>
   <ul>
    <li>Tax Year : {period}</li>
    <li>Date: {date}</li>
    <li>
     Code {code}: {description}
    </li>
    <li>{amount !== "$0.00" && `Amount: ${amount}`}</li>
   </ul>
  </div>
 );
};

export default TransactionItem;
