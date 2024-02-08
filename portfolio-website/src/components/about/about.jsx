import React, { useEffect, useRef } from "react";
import "./about.css";
import { fadeIn, moveElement, onNodeVisible } from "../../utils/elementUtils";
import { wait } from "../../utils/genericUtils";

function About(props) {
  const observers = useRef([]);
  useEffect(() => {
    if (props.initialLoad) {
      let about = document.querySelector("#about");
      observers.current.push(onNodeVisible(about, AboutAnimation));
      setNavAboutMe();
    }
  }, []);

  function setAllInactive() {
    document.querySelectorAll("a.active").forEach((link) => {
      link.classList.remove("active");
    });
  }

  function setNavAboutMe() {
    let header = document.querySelector("#about-me");
    onNodeVisible(
      header,
      () => {
        setAllInactive();
        document.querySelector("#about-me-link").classList.add("active");
        document.querySelector("#about-me-link-mobile").classList.add("active");
      },
      0.5
    );
  }

  async function AboutAnimation() {
    let animationTime = 500;
    let fadeTimeMultiplier = 2;
    let sectionDelay = 500;

    let aboutMe = document.querySelector("#about-me");
    let aboutHobbies = document.querySelector("#about-hobbies");
    let aboutInterests = document.querySelector("#about-interests");

    fadeIn(aboutMe, animationTime * fadeTimeMultiplier, 1, "flex");
    moveElement(aboutMe, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {
      aboutMe.style.position = "initial";
      observers.current.forEach((observer) => {
        observer.disconnect();
      });
    });
    //delay
    await wait(sectionDelay);
    fadeIn(aboutHobbies, animationTime * fadeTimeMultiplier, 1, "flex");
    moveElement(aboutHobbies, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {
      aboutHobbies.style.position = "initial";
      observers.current.forEach((observer) => {
        observer.disconnect();
      });
    });
    //delay
    await wait(sectionDelay);
    fadeIn(aboutInterests, animationTime * fadeTimeMultiplier, 1, "flex");
    moveElement(aboutInterests, animationTime, { bottom: "-100px" }, { bottom: "0px" }, () => {
      aboutInterests.style.position = "initial";
      observers.current.forEach((observer) => {
        observer.disconnect();
      });
    });
  }

  return (
    <section id="about">
      <div className="about-sections-container">
        {/* General About */}
        <section id="about-me" className="about-section">
          <h1 className="about-header">About</h1>
          <p className="about-text">
            Hello 👋🏼,
            <br /> My name is Sean, a Penn State graduate and Software Engineer. My coding journey started with Python in 2018, reflecting on the{" "}
            {new Date().getFullYear() - 2018} years since that first line of code, the amount that I've learned and improved has been truly amazing.
            In 2021, during my computer science internship with Seisan Consulting, I delved into the realm of web technologies. This experience became
            a crucible for learning new languages, tackling real-world challenges, and evolving into a more adept developer. After graduating in May
            2022, Seisan offered me a full-time position, where I've continued to hone my skills, delivering innovative software solutions for both
            the company and its clients.
          </p>
        </section>

        {/* Hobbies */}
        <section id="about-hobbies" className="about-section">
          <h1 className="about-header">Hobbies</h1>
          <p className="about-text">
            <br /> Outside of work and coding, I find joy in a variety of activities, such as hitting the gym, unwinding with video games, tuning into
            podcasts, and enjoying movies or shows. Family time is a cherished priority for me. On weekends, I make an effort to have some fun with
            friends or simply appreciate the serenity of nature outdoors. Whether it's a simple stroll or a more elaborate outing, these moments
            contribute to a well-rounded and fulfilling lifestyle outside of the tech realm.
          </p>
        </section>

        {/* Interests */}

        <section id="about-interests" className="about-section">
          <h1 className="about-header">Interests</h1>
          <p className="about-text">
            <br />I have a keen interest in diving into new languages, frameworks, and emerging technologies, particularly in the realm of AI. While
            navigating the exciting landscape of tech is invigorating, I'm equally fascinated by the intricacies of low-level code and understanding
            the inner workings of technology. Beyond the tech domain, my passions extend to martial arts, the high-energy world of UFC, and the
            soulful realms of music and comedy. As a devoted supporter, I find joy in following the Philadelphia Phillies and cheering for the Eagles,
            adding a spirited touch to my diverse range of interests.
          </p>
        </section>
      </div>
    </section>
  );
}

export default About;
