import React, { useEffect } from "react";
import "./resume.css";

function Resume(props) {
  useEffect(() => {
    if (props.initialLoad) {
    }
  }, []);

  function ResumeAnimation() {}

  return (
    <section id="resume">
      <div className="resume-sections-container">
        <section id=""></section>
      </div>
    </section>
  );
}

export default Resume;
