import React, { useEffect } from "react";
import "./project-showcase.css";
import ImageCarousel from "../image-carousel/image-carousel";

const defaultProps = {
  id: "project-id",
  projectName: "Sample Project",
  images: ["url"],
  mainComponent: null,
  sideComponent: null,
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
      <section className="project-showcase-top">
        {/* Carousel */}
        {props.images.length > 0 && !props.mainComponent ? (
          <div className="carousel-container">
            <ImageCarousel
              id={props.id}
              images={props.images}
              alt={props.projectName + " project image"}
              initialLoad={props.initialLoad}
            />
          </div>
        ) : (
          props.mainComponent ?? null
        )}
        {/* Side Component */}
        {props.sideComponent ? props.sideComponent : null}
      </section>
      {/*  Bottom */}
      <section className="project-showcase-bottom">
        <div className="project-details-container">
          <h2 className="project-header-text">{props.projectName}</h2>
          <p className="project-description-text">{props.description}</p>
        </div>
      </section>
    </section>
  );
}

export default ProjectShowcase;
