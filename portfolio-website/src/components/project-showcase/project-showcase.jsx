import React, { useEffect } from "react";
import "./project-showcase.css";
import ImageCarousel from "../image-carousel/image-carousel";

const defaultProps = {
  id: "project-id",
  projectName: "Sample Project",
  images: ["url"],
  embed: "url",
  description: "gjwedgwej",
};

function ProjectShowcase(props = defaultProps) {
  useEffect(() => {
    if (props.initialLoad) {
    }
  }, []);
  return (
    <section id={props.id} className="project-showcase-outer">
      {/* Top */}
      <div>
        {props.images.length > 0 ? (
          <ImageCarousel images={props.images} alt={props.projectName + " project image"} />
        ) : null}
      </div>
      {/*  Bottom */}
      <div>
        <h2>{props.projectName}</h2>
        <p>{props.description}</p>
      </div>
    </section>
  );
}

export default ProjectShowcase;
