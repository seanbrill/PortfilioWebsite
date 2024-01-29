import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ThemeContext from "../../context/ThemeContext";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import cartoonHeadShot from "../../assets/images/sb-headshot-fullbody-alt-2.jpg";
import lightLinkedIn from "../../assets/images/inLight.png";
import darkLinkedIn from "../../assets/images/inDark.png";
import githubLight from "../../assets/images/GitHub.png";
import resumeIcon from "../../assets/images/ResumeIcon.png";
import resume from "../../assets/pdfs/Resume.pdf";
import bracketsLight from "../../assets/images/bracketsWhite.png";
import bracketsDark from "../../assets/images/bracketsDark.png";
import serverIcon from "../../assets/images/server.png";
import serverIconLight from "../../assets/images/serverWhite.png";
import unityLight from "../../assets/images/unityLight.png";
import unityDark from "../../assets/images/unityDark.png";

function Home() {
  const [initialLoad, setInitialLoad] = useState(0);
  const { theme, setTheme } = useContext(ThemeContext);

  //fires once per load
  useEffect(() => {
    if (initialLoad <= 0) {
      intialLoadBioAnimation();
      intialLoadExpertiseAnimation();
    }
  }, [initialLoad]);

  function intialLoadBioAnimation() {
    //time in ms
    let time = 1000;
    let bio = document.querySelector("#about-me");
    bio.style.marginTop = "1000px";
    bio.animate([{ marginTop: "1000px" }, { marginTop: "20px" }], { duration: time });
    setTimeout(() => {
      bio.style.marginTop = "20px";
      setInitialLoad(initialLoad + 1);
    }, time - 100);
  }

  function moveUpAnimation(el) {
    return new Promise((resolve, reject) => {
      //time in ms
      let time = 600;
      el.animate([{ marginTop: "500px" }, { marginTop: "0px" }], { duration: time });
      setTimeout(() => {
        el.style.marginTop = "0px";
        setInitialLoad(initialLoad + 1);
        resolve(null);
      }, time - 100);
    });
  }

  function onElementVisible(element, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(element);
  }

  async function intialLoadExpertiseAnimation() {
    let exp1 = document.querySelector("#exp1");
    let exp2 = document.querySelector("#exp2");
    let exp3 = document.querySelector("#exp3");
    exp1.style.marginTop = "500px";
    exp2.style.marginTop = "500px";
    exp3.style.marginTop = "500px";
    let targetEl = document.querySelector("#my-expertise-target");
    onElementVisible(targetEl, () => {
      moveUpAnimation(exp1);
      setTimeout(() => {
        moveUpAnimation(exp2);
      }, 500);
      setTimeout(() => {
        moveUpAnimation(exp3);
      }, 1000);
    });
  }

  function Linkedin() {
    window.open("https://www.linkedin.com/in/sean-brill-590752142/");
  }

  function Github() {
    window.open("https://github.com/seanbrill");
  }

  function Resume() {
    window.open(resume);
  }

  return (
    <div className="home-page-container">
      <Navbar />
      <section className="body-container">
        <h1 className="section-title main">About Me</h1>
        <section id="about-me">
          <div className="headshot-image"></div>
          <section className="bio">
            <h1>Sean Brill</h1>
            <p className="in-depth-bio">
              A seasoned Full Stack Engineer and graduate of Pennsylvania State University with a degree in Information Sciences and Technology (IST). My expertise spans full stack development, emphasizing proficiency in Node.js, React/TypeScript, and backend services. With a strong foundation in Data Structures and extensive knowledge of XR and game development, I bring a comprehensive skill set to the field. My experience encompasses roles from a Computer Science Intern to my current position
              as a Software Engineer II, where I've consistently demonstrated a deep understanding of diverse technologies. I'm eager to leverage my expertise to contribute to innovative software engineering projects and challenges.
            </p>

            <section className="contact-me">
              <div className="contact-box">
                <p className="contact-header">Want to get in touch?</p>
                <label htmlFor="contact" className="contact-label">
                  Contact:{" "}
                </label>
                <a id="contact" href="mailto:seanbrill54@gmail.com">
                  seanbrill54@gmail.com
                </a>
              </div>
            </section>

            <section className="social-links">
              <button className="linkedin" onClick={Linkedin}>
                {theme == "light" ? <img src={lightLinkedIn} alt="linkedin" /> : <img src={darkLinkedIn} alt="linkedin" />}
                <span>Linkedin</span>
              </button>
              <button className="github" onClick={Github}>
                {theme == "light" ? <img src={githubLight} alt="linkedin" /> : <img src={githubLight} alt="linkedin" />}
                <span>Github</span>
              </button>
              <button className="resume" onClick={Resume}>
                {theme == "light" ? <img src={resumeIcon} alt="linkedin" /> : <img src={resumeIcon} alt="linkedin" />}
                <span>Resume</span>
              </button>
            </section>
          </section>
        </section>

        <section className="Expertise">
          <h1 id="my-expertise-target" className="section-title">
            My Expertise
          </h1>
          <section className="exp-areas">
            <section id="exp1" className="frontend">
              <div className="exp-title-container">
                <h2 className="frontend-title">UI/UX</h2>
                {theme == "light" ? <img src={bracketsLight} alt="UI/UX" /> : <img src={bracketsLight} alt="UI/UX" />}
              </div>
              <p className="exp-text">Harnessing over two years of expertise in HTML, CSS, JavaScript, React JS, Vue JS, and TypeScript, I specialize in crafting responsive and engaging user experiences. Whether it's ensuring seamless navigation or delivering visually compelling interfaces, my commitment to user-centric design is evident in every project.</p>
            </section>

            <section id="exp2" className="backend">
              <div className="exp-title-container">
                <h2 className="frontend-title">Backend Services</h2>
                {theme == "light" ? <img src={serverIconLight} alt="Backend" /> : <img src={serverIconLight} alt="Backend" />}
              </div>
              <p className="exp-text">In the realm of backend services, I bring over two years of hands-on experience with Node.js, Express, AWS, Azure, Firebase, and the ASP.NET framework. My focus revolves around developing robust RESTful APIs and backend logic, contributing to the success of diverse client and personal projects. From cloud-based solutions to efficient server-side operations, I am adept at navigating the intricacies of backend development.</p>
            </section>

            <section id="exp3" className="unity">
              <div className="exp-title-container">
                <h2 className="frontend-title">Game Development</h2>
                {theme == "light" ? <img src={unityLight} alt="unity" /> : <img src={unityLight} alt="unity" />}
              </div>
              <p className="exp-text">With a rich background spanning over two years in Unity and C# game development, my expertise extends beyond traditional boundaries. I've contributed to the creation of interactive user experiences for both clients and personal projects, delving into the realms of augmented and virtual reality. In the dynamic field of game development, I continually explore innovative ways to engage and captivate audiences.</p>
            </section>
          </section>
        </section>

        <section className="Projects">
          <h1 className="projects-section-title">
            Projects Coming Soon
            <span className="loading-dot-1">.</span>
            <span className="loading-dot-2">.</span>
            <span className="loading-dot-3">.</span>
          </h1>
          <p className="projects-subheader">Make sure to check my github for new projects!</p>
        </section>
      </section>
    </div>
  );
}

export default Home;
