import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./resume-page.css";
import SiteVisitedEvent from "../../components/siteVisitEvent/site-visited-event";

function ResumePage() {
  const [initialLoad, setInitialLoad] = useState(true);
  const url = window.location.origin + "/redirect/resume";
  let url2 = "http://localhost:3000";
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [initialLoad]);
  return (
    <>
      <SiteVisitedEvent initialLoad={initialLoad} page={"Resume"} />
      <Navbar />
      <section id="ResumePage">
        <div className="spacer"></div>
        <iframe src={url} title={"Resume"} frameBorder={0} scrolling="no!important" height={"150vh"}></iframe>
        <div className="spacer"></div>
      </section>
    </>
  );
}

export default ResumePage;
