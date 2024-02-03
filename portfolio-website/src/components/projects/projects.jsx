import React from "react";
import { useEffect } from "react";
import "./projects.css";
import ProjectShowcase from "../project-showcase/project-showcase";
import testImage from "../../assets/images/sean-psu.png";
import testImage2 from "../../assets/images/sean-psu2.png";

function Projects(props) {
  useEffect(() => {
    if (props.initialLoad) {
    }
  }, []);
  return (
    <section id="Projects">
      <section className="projects-container">
        <h1 className="projects-header">Projects</h1>

        <ProjectShowcase images={[testImage, testImage2]} projectName={"JSEngine"} />
      </section>
    </section>
  );
}

export default Projects;
