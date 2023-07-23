import React from "react";

const Spinner = () => (
 <img
  src={process.env.PUBLIC_URL + "/images/spinner.gif"}
  style={{ width: "200px", margin: "auto", display: "block" }}
  alt='Loading...'
 />
);

export default Spinner;
