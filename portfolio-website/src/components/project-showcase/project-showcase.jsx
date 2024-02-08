import React, { useEffect } from "react";
import "./project-showcase.css";
import ImageCarousel from "../image-carousel/image-carousel";

const defaultProps = {
  id: "project-id",
  projectName: "Sample Project",
  images: ["url"],
  links: [
    {
      text: "",
      icon: null,
      bg_color: "white",
      fg_color: "black",
      height: "45px",
      width: "45px",
      marginLeft: "0px",
      marginRight: "0px",
      bd_radius: "5px",
      onClick: () => {},
    },
  ],
  mainComponent: null,
  sideComponent: null,
  description: "gjwedgwej",
};

function ProjectShowcase(props = defaultProps) {
  useEffect(() => {
    if (props.initialLoad) {
    }
  }, []);

  function FormatLinks(props) {
    if (!props.links) return null;
    return props.links.map((link, index) => {
      return (
        <button
          key={index}
          onClick={link.onClick}
          style={{
            height: link.height ?? "auto",
            width: link.width ?? "auto",
            marginLeft: link.marginLeft,
            marginRight: link.marginRight,
            borderRadius: link.bd_radius ?? "0px",
            backgroundColor: link.bg_color,
            color: link.fg_color,
          }}
        >
          {link.text ? <span>{link.text}</span> : <img src={link.icon} />}
        </button>
      );
    });
  }

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
          <section className="project-header-section">
            <h2 className="project-header-text">{props.projectName}</h2>
            <div className="project-links">{FormatLinks(props)}</div>
          </section>
          <p className="project-description-text">{props.description}</p>
        </div>
      </section>
    </section>
  );
}

export default ProjectShowcase;
