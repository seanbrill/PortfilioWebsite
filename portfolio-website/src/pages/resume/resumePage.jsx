import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import pdf from "../../assets/pdfs/Resume.pdf";
import "./resume-page.css";

function ResumePage() {
  const url = window.location.origin + "/redirect/resume";
  let url2 = "http://localhost:3000";
  console.log("resume page url:", url);
  useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      <iframe src={url} title={"Resume"} frameBorder={0}></iframe>
    </>
  );
}

export default ResumePage;
