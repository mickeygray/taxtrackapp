import React, { useState, useContext } from "react";
import ProfileContext from "../../context/profile/profileContext";
import CSVReader from "react-csv-reader";
const ZipUpload = () => {
 const [file, setFile] = useState("");
 const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
 };

 const profileContext = useContext(ProfileContext);

 const { submitZips } = profileContext;

 return (
  <div>
   <CSVReader
    cssClass='csv-reader-input'
    label='Select CSV'
    onFileLoaded={(data, fileInfo) => submitZips(data)}
    parserOptions={papaparseOptions}
    inputId='zip'
    inputName='zip'
    inputStyle={{ color: "red" }}
   />
  </div>
 );
};

export default ZipUpload;
