import React, { useEffect, useContext } from "react";
import seanPhoto from "../../assets/images/sean.png";
import * as elementUtils from "../../utils/elementUtils";
import * as genericUtils from "../../utils/genericUtils";
import ThemeContext from "../../context/ThemeContext";
import "./header.css";

import linkedinDark from "../../assets/images/linkedin_light.png";
import linkedinLight from "../../assets/images/linkedin_dark.png";

import githubLight from "../../assets/images/github_light.png";
import githubDark from "../../assets/images/github_dark.png";

import resume_1 from "../../assets/images/resume_1.png";
import resume_1_light from "../../assets/images/resume_1_light.png";
import resume_1_light_2 from "../../assets/images/resume_1_light_2.png";
import resume_2 from "../../assets/images/resume_2.png";
import resume_3 from "../../assets/images/resume_3.png";
import resume_4 from "../../assets/images/resume_4.png";

function Header(props) {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (props.initialLoad) {
      HeaderAnimation();
    }
  }, []);

  async function HeaderAnimation() {
    let photo = document.querySelector("#photo");
    let bio = document.querySelector("#bio");
    let fadeTime = 1500;
    let moveTime = 1500;
    //fade in elements
    elementUtils.fadeIn(photo, fadeTime / 2, 0, "flex");
    elementUtils.fadeIn(bio, fadeTime / 2, 0, "flex");
    //move from off screen
    let photo_rect = photo.getBoundingClientRect();
    let bio_rect = bio.getBoundingClientRect();
    let startingLeft = window.innerWidth / 2 - photo_rect.width + 40 + "px";
    let startingRight = window.innerWidth / 2 - bio_rect.width * 1 - 65 + "px";

    if (window.innerWidth <= 750) {
      startingLeft = window.innerWidth / 2 - photo_rect.width / 2 + "px";
      startingRight = window.innerWidth / 2 - bio_rect.width / 2 + "px";
    }
    console.log("left:", startingLeft);
    console.log("right:", startingRight);

    let callbackDelay = 1000;

    //Move Photo Right
    elementUtils.moveElement(
      photo,
      moveTime,
      { left: "-300px" },
      { left: startingLeft },
      () => {
        photo.style.position = "initial";
      },
      callbackDelay
    );

    //Move Bio Left
    elementUtils.moveElement(
      bio,
      moveTime,
      { right: "-300px" },
      { right: startingRight },
      () => {
        bio.style.position = "initial";
      },
      callbackDelay
    );

    genericUtils.wait(moveTime).then(() => {
      document.querySelectorAll(".quick-button").forEach((button) => {
        elementUtils.fadeIn(button, 2000, 1, "flex");
      });
    });
  }

  function Linkedin() {
    window.open("https://www.linkedin.com/in/sean-brill-590752142/");
  }

  function Github() {
    window.open("https://github.com/seanbrill");
  }

  function Resume() {
    //window.open(resume);
  }

  return (
    <section id="header">
      <div id="photo" className="sean-image-outer">
        <img className="sean-image" src={seanPhoto} alt="an image of sean brill" />
      </div>
      <div id="bio">
        <p>
          Experienced Full Stack Engineer with a degree in Information Sciences and Technology from
          Pennsylvania State University. Proficient in Node.js, React/TypeScript, and backend
          services, with a strong background in Data Structures and knowledge of XR and game
          development. Currently a Software Engineer II, showcasing consistent expertise in diverse
          technologies. Excited to apply skills to innovative software engineering projects.
        </p>
        {/* quick links */}
        <section id="quick-buttons" className="quick-buttons-section">
          <button
            id="linkedin-quick"
            className="quick-button"
            style={{ backgroundColor: theme === "light" ? "#136bc5" : "white" }}
          >
            <img src={theme === "light" ? linkedinDark : linkedinLight} alt="Linkedin icon" />
          </button>
          <button
            id="github-quick"
            className="quick-button"
            style={{ backgroundColor: theme === "light" ? "black" : "white" }}
          >
            <img src={theme === "light" ? githubDark : githubLight} alt="GitHub icon" />
          </button>
          <button
            id="resume-quick"
            className="quick-button"
            style={{ backgroundColor: theme === "light" ? "darkgray" : "white" }}
          >
            <img src={theme === "light" ? resume_1_light_2 : resume_1} alt="Resume icon" />
          </button>
        </section>
      </div>
    </section>
  );
}

export default Header;
