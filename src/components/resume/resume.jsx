import React, { useEffect, useRef, useState } from "react";
import "./resume.css";
import ExperienceHistory from "../experience/experience-history";
import { fadeIn, moveElement, onNodeVisible } from "../../utils/elementUtils";
import { wait } from "../../utils/genericUtils";
import Skill from "../skill/skill";

function Resume(props) {
  const observers1 = useRef([]);
  const observers2 = useRef([]);
  const skillsObserver = useRef([]);

  //skill circle size
  const skillCirlceSize = "120px";
  //skill percentage circles animation triggers
  const [sk1, setSk1] = useState(false);
  const [sk2, setSk2] = useState(false);
  const [sk3, setSk3] = useState(false);
  const [sk4, setSk4] = useState(false);
  const [sk5, setSk5] = useState(false);
  const [sk6, setSk6] = useState(false);

  const animationTime = 300;

  useEffect(() => {
    if (props.initialLoad) {
      let education = document.querySelector("#Education");
      let experience = document.querySelector("#Experience");
      let skillsContainer = document.querySelector("#Skills");
      observers1.current.push(onNodeVisible(education, ResumeAnimation));
      observers2.current.push(onNodeVisible(experience, ExperienceAnimation));
      skillsObserver.current.push(onNodeVisible(skillsContainer, StickySkills, 1));
      setNavResume();
    }
  }, []);

  function setAllInactive() {
    document.querySelectorAll("a.active").forEach((link) => {
      link.classList.remove("active");
    });
  }

  function setNavResume() {
    let header = document.querySelector("#resume");
    onNodeVisible(
      header,
      () => {
        setAllInactive();
        document.querySelector("#experience-link").classList.add("active");
        document.querySelector("#experience-link-mobile").classList.add("active");
      },
      window.innerWidth > 750 ? 0.4 : 0.1
    );
  }

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
      SkillsAnimation();
    });
  }

  async function ExperienceAnimation() {
    let experience = document.querySelector("#Experience");
    let exp2 = document.querySelector("#exp-2");
    let exp3 = document.querySelector("#exp-3");
    let exp4 = document.querySelector("#exp-4");
    let exp5 = document.querySelector("#exp-5");

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
      //exp5
      fadeIn(exp5, animationTime, 1, "flex");
      moveElement(exp5, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {});
    });
  }

  async function SkillsAnimation() {
    setSk1(true);
    await wait(animationTime);
    setSk2(true);
    await wait(animationTime);
    setSk3(true);
    await wait(animationTime);
    setSk4(true);
    await wait(animationTime);
    setSk5(true);
    await wait(animationTime);
    setSk6(true);
  }

  function StickySkills() {
    if (window.innerWidth >= 700) {
      //detach the observer
      skillsObserver.current.forEach((observer) => {
        observer.disconnect();
      });

      let skillsContainer = document.querySelector("#Skills");
      skillsContainer.style.position = "relative";
      let speed = 0.7;
      let skillTop = 0;
      let maxTop = 1200;
      let prevY = window.scrollY;
      window.addEventListener("scroll", (e) => {
        let delta = window.scrollY - prevY;
        //scrolling back up
        if ((delta < 0 && window.scrollY > 2800) || (delta > 0 && window.scrollY < 1000)) {
          prevY = window.scrollY;
          return;
        }
        //scrolling down
        if (
          (delta > 0 && skillTop < maxTop && window.scrollY > 1200) ||
          (delta < 0 && skillTop > 0)
        ) {
          skillTop = skillTop + delta * speed;
          skillsContainer.style.top = skillTop + "px";
        }
        prevY = window.scrollY;
      });
    }
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
              details={["3.4 GPA", "Deans List"]}
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
              details={[
                `Technical lead on an ambitious mobile application currently available on the App Store and Google Play
                with over 6,000 downloads , 300 DAU, and growing.
                `,
                `Building and deploying highly available and scalable REST APIs hosted in AWS and Azure Cloud
                services. One of these Apis average around 32,000 requests per day and is still growing.
                `,
                `Collaborating with project managers, stakeholders, and developers to efficiently scope tasks, delegate
                work, and engineer software solutions.
                `,
                `Overhauling client’s existing .NET applications to enhance backend services and front-end UI/UX.
                Engineering custom Unity Android plugins for native functionality and Google Sign-In using OAuth.`,
              ]}
              start={"2023"}
              end={"present"}
              timeDelay={2500}
            />

            <ExperienceHistory
              id={"exp-3"}
              header={"Software Engineer"}
              subHeader={"Seisan Consulting"}
              details={[
                `Specializing in full-stack software engineering for .NET & NodeJs web development, mobile, and game
                development, including AR and VR experiences.
                `,
                `Devising solutions to optimize app bundle sizes to comply with Google Play standards.`,
                `Leading the development of an ambitious WebXR art gallery project. Oversaw the architecture of a React
                user interface, a Node.js backend hosted on an AWS EC2 instance, and a WebGL gallery editor/viewer
                hosted in S3.
                `,
              ]}
              start={"2022"}
              end={"2023"}
              timeDelay={3000}
            />

            <ExperienceHistory
              id={"exp-4"}
              header={"Computer Science Intern"}
              subHeader={"Seisan Consulting"}
              details={[
                `Gained hands-on experience with full-stack development in a fast-paced environment.
                `,
                `Quickly acquiring proficiency in a multitude of different tech stacks for client applications.`,
                `Completing assigned tasks without compromising project timelines or coding standards.`,
              ]}
              start={"2021"}
              end={"2022"}
              timeDelay={3500}
            />

            <ExperienceHistory
              id={"exp-5"}
              header={"Assistant Information Officer & Developer"}
              subHeader={"StarCage"}
              details={[
                `Facilitated technical meetings and coordinated with students from multiple universities and other countries to develop a professional social network platform.`,
                `Collaborated closely with the founder to develop the web application using HTML, CSS, JavaScript, and
              PHP.`,
                `Successfully launched the platform, attracting an initial user base from Penn State, before strategically
              winding down the project to prioritize academic pursuits and internship opportunities.`,
              ]}
              start={"2020"}
              end={"2021"}
              timeDelay={3000}
            />
          </section>
        </div>
        {/* Container For Next Two Sections */}
        <section className="resume-right">
          <div className="resume-right-top">
            {/* Summary */}
            {/* <div className="resume-summary">
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
            </div> */}
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
