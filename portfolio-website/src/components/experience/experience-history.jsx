import React, { useEffect } from "react";
import "./experience-history.css";
import { fadeIn } from "../../utils/elementUtils";

const defaultData = {
  id: "sample-experience",
  header: "example header",
  subHeader: "Jan 13th 2000",
  intro:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, corrupti iste? Atque cupiditate facere quidem quasi ab incidunt labore mollitia aut itaque minus neque quibusdam, numquam suscipit vitae corporis nihil",
  details: ["detail1", "detail2", "detail3"],
  start: "2018",
  end: "2022",
  timeDelay: 1,
};

function ExperienceHistory(data = defaultData) {
  useEffect(() => {
    if (!data.id) throw new Error("experience id required");
    setTimeout(() => {
      let graphBody = document.querySelector(`#${data.id + "-graph-body"}`);
      if (graphBody) {
        let rootEl = graphBody.parentNode.parentNode;
        graphBody.style.height = rootEl.getBoundingClientRect().height + "px";
        let graphTime = document.querySelector(`#${data.id + "-graph-time"}`);
        if (graphTime) {
          let t = data.timeDelay ?? 100;
          setTimeout(() => {
            fadeIn(graphTime, 1000, 1, "block");
          }, t);
        }
      }
    }, 300);
  }, []);

  function FormatDetails(details = []) {
    return details.map((detail, index) => (
      <li key={index} className="experience-detail">
        {detail}
      </li>
    ));
  }

  return (
    <section id={data.id} className="experience-outer">
      {/* side graphic */}
      <div className="graph-container">
        <div className="graph-point"></div>
        <div id={data.id + "-graph-body"} className="graph-body">
          {data.start && data.end ? (
            <span id={data.id + "-graph-time"} className="experience-time-text">
              {data.start + "-" + data.end}
            </span>
          ) : null}
        </div>
      </div>
      {/* content */}
      <div className="experience-content-container">
        <h1 className="experience-main-heading">{data.header}</h1>
        {data.subHeader ? <h2 className="experience-sub-heading">{data.subHeader}</h2> : null}
        {data.intro ? <p className="experience-intro">{data.intro}</p> : null}

        <ul className="experience-details-list">{FormatDetails(data.details)}</ul>
      </div>
    </section>
  );
}

export default ExperienceHistory;
