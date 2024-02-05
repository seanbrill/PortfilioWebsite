import React, { useEffect, useRef, useState } from "react";
import "./resume.css";
import ExperienceHistory from "../experience/experience-history";
import { fadeIn, moveElement, onNodeVisible } from "../../utils/elementUtils";
import { wait } from "../../utils/genericUtils";
import PercentageCircle from "../percent-circle/percentage-circle";
import Skill from "../skill/skill";
import seanPSU from "../../assets/images/sean-psu.png";
import seanPSU2 from "../../assets/images/sean-psu2.png";
import seanPSU3 from "../../assets/images/sean-library.png";

function Resume(props) {
  const observers1 = useRef([]);
  const observers2 = useRef([]);

  //skill circle size
  const skillCirlceSize = "120px";
  //skill percentage circles animation triggers
  const [sk1, setSk1] = useState(false);
  const [sk2, setSk2] = useState(false);
  const [sk3, setSk3] = useState(false);
  const [sk4, setSk4] = useState(false);
  const [sk5, setSk5] = useState(false);
  const [sk6, setSk6] = useState(false);

  const animationTime = 500;

  useEffect(() => {
    if (props.initialLoad) {
      let education = document.querySelector("#Education");
      let experience = document.querySelector("#Experience");
      observers1.current.push(onNodeVisible(education, ResumeAnimation));
      observers2.current.push(onNodeVisible(experience, ExperienceAnimation));
    }
  }, []);

  async function ResumeAnimation() {
    let summary = document.querySelector("#Summary");
    let education = document.querySelector("#Education");
    let skills = document.querySelector("#Skills");
    let exp1 = document.querySelector("#exp-1");
    let summaryText = document.querySelector("#summary-text");
    let psuImage = document.querySelector("#psu-image");

    observers1.current.forEach((observer) => {
      observer.disconnect();
    });

    //Animate Education Section
    fadeIn(education, animationTime, 1, "block");
    moveElement(education, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {
      //exp1
      fadeIn(exp1, animationTime, 1, "flex");
      moveElement(exp1, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {});
    });

    //Animate Summary Section
    fadeIn(summary, animationTime, 1, "block");
    moveElement(summary, animationTime, { bottom: "-100px" }, { bottom: "0px" }, async () => {
      //summary text
      fadeIn(summaryText, animationTime, 1, "flex");
      moveElement(summaryText, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {});
      await wait(500);
      //psu image
      fadeIn(psuImage, animationTime, 1, "flex");
      moveElement(psuImage, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {});
    });

    //Animate Technical Skills Section
    fadeIn(skills, animationTime, 1, "block");
    moveElement(skills, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {
      console.log("setting skill circle one");
      SkillsAnimation();
    });
  }

  async function ExperienceAnimation() {
    let experience = document.querySelector("#Experience");
    let exp2 = document.querySelector("#exp-2");
    let exp3 = document.querySelector("#exp-3");
    let exp4 = document.querySelector("#exp-4");

    observers2.current.forEach((observer) => {
      observer.disconnect();
    });

    //Animate Experience Section
    fadeIn(experience, animationTime, 1, "block");
    moveElement(experience, animationTime, { bottom: "-100px" }, { bottom: "0px" }, async () => {
      //exp2
      fadeIn(exp2, animationTime, 1, "flex");
      moveElement(exp2, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {});
      await wait(500);
      //exp3
      fadeIn(exp3, animationTime, 1, "flex");
      moveElement(exp3, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {});
      await wait(500);
      //exp4
      fadeIn(exp4, animationTime, 1, "flex");
      moveElement(exp4, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {});
    });
  }

  async function SkillsAnimation() {
    setSk1(true);
    await wait(500);
    setSk2(true);
    await wait(500);
    setSk3(true);
    await wait(500);
    setSk4(true);
    await wait(500);
    setSk5(true);
    await wait(500);
    setSk6(true);
  }

  return (
    <section id="resume">
      <div className="resume-sections-container">
        {/* Experiences */}
        <div className="resume-experiences">
          <section id="Education" className="resume-section">
            <h2 className="resume-section-header">Education</h2>
            <ExperienceHistory
              id={"exp-1"}
              header={"Pennsylvaniya State University"}
              subHeader={"Bachelors of Science, Information Sciences & Technology"}
              details={["Detail 1"]}
              start={"2018"}
              end={"2022"}
            />
          </section>

          <section id="Experience" className="resume-section">
            <h2 className="resume-section-header">Experience</h2>
            <ExperienceHistory
              id={"exp-2"}
              header={"Software Engineer II"}
              subHeader={"Seisan Consulting"}
              details={["Detail 1", "Detail 2", "Detail 3", "Detail 4", "Detail 5"]}
              start={"2023"}
              end={"present"}
              timeDelay={3000}
            />

            <ExperienceHistory
              id={"exp-3"}
              header={"Software Engineer"}
              subHeader={"Seisan Consulting"}
              details={["Detail 1", "Detail 2", "Detail 3", "Detail 4", "Detail 5"]}
              start={"2022"}
              end={"2023"}
              timeDelay={3500}
            />

            <ExperienceHistory
              id={"exp-4"}
              header={"Computer Science Intern"}
              subHeader={"Seisan Consulting"}
              details={["Detail 1", "Detail 2", "Detail 3", "Detail 4", "Detail 5"]}
              start={"2021"}
              end={"2022"}
              timeDelay={4000}
            />
          </section>
        </div>
        {/* Container For Next Two Sections */}
        <section className="resume-right">
          <div className="resume-right-top">
            {/* Summary */}
            <div className="resume-summary">
              <section id="Summary" className="resume-section">
                <h2 className="resume-section-header">Summary</h2>
                <p id="summary-text" className="resume-summary-text">
                  Results-driven Software Engineer with a solid foundation in Information Sciences
                  and Technology from Pennsylvania State University. Demonstrated success in leading
                  and contributing to high-impact projects throughout my tenure at Seisan
                  Consulting. Proven ability to collaborate with cross-functional teams, scope tasks
                  efficiently, and engineer innovative solutions. Specializing in full-stack
                  development with proficiency in diverse technologies, including C#, .NET
                  Framework, Java, JavaScript, React, Node.js, and Unity Game Engine. Notable
                  achievements include serving as a technical lead for a successful mobile
                  application, designing and deploying scalable REST APIs hosted in AWS and Azure,
                  and leading the development of an ambitious WebXR art gallery project. My
                  adaptability, hands-on experience, and commitment to quality make me a valuable
                  asset for driving innovation and success in software engineering.
                </p>
              </section>
            </div>
            {/* Skills */}
            <div className="resume-skills">
              <section id="Skills" className="resume-section">
                <h2 className="resume-section-header">Technical Skills</h2>

                {/* Skills Grid */}
                <section className="skills-container">
                  <Skill
                    id={"web-skill"}
                    skillName={"HTML/CSS"}
                    value={95}
                    animateTrigger={sk1}
                    size={skillCirlceSize}
                    initialLoad={props.initialLoad}
                    color={"#d64747"}
                  />

                  <Skill
                    id={"js-skill"}
                    skillName={"NodeJs/Javascript"}
                    value={90}
                    animateTrigger={sk2}
                    size={skillCirlceSize}
                    initialLoad={props.initialLoad}
                    color={"#026e00"}
                  />

                  <Skill
                    id={"NET-skill"}
                    skillName={".NET/C#"}
                    value={85}
                    animateTrigger={sk3}
                    size={skillCirlceSize}
                    initialLoad={props.initialLoad}
                    color={"#cb6fd4"}
                  />

                  <Skill
                    id={"react-skill"}
                    skillName={"React"}
                    value={90}
                    animateTrigger={sk4}
                    size={skillCirlceSize}
                    initialLoad={props.initialLoad}
                    color={"#149eca"}
                  />

                  <Skill
                    id={"backend-skill"}
                    skillName={"Backend Services"}
                    value={90}
                    animateTrigger={sk5}
                    size={skillCirlceSize}
                    initialLoad={props.initialLoad}
                    color={"#898989"}
                  />

                  <Skill
                    id={"css-skill"}
                    skillName={"AWS/Azure/GCP"}
                    value={80}
                    animateTrigger={sk6}
                    size={skillCirlceSize}
                    initialLoad={props.initialLoad}
                    color={"#f90"}
                  />
                </section>
              </section>
            </div>
          </div>
          {/* Image */}
          {/* <div
            id="psu-image"
            style={{ backgroundImage: `url(${seanPSU2})` }}
            alt="sean psu"
            className="sean-psu"
          ></div> */}
        </section>
      </div>
    </section>
  );
}

export default Resume;
