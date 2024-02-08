import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import logo from "../../assets/images/SeanLogo.png";
import moon from "../../assets/images/moon.png";
import sun from "../../assets/images/sun.png";
import "./navbar.css";
import { useNavigate } from "react-router";
import { wait } from "../../utils/genericUtils";
import ToggleSwitch from "../toggle-switch/toggle-switch";

function Navbar(props) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [navOpen, setNavOpen] = useState(false);

  const router = useNavigate();

  //once per load
  useEffect(() => {
    if (navOpen) {
      document.querySelector("#nav-shelf").style.maxHeight = "200px";
      document.querySelector("#nav-shelf").style.paddingTop = "20px";
      document.querySelector("#nav-shelf").style.paddingBottom = "20px";
    } else {
      document.querySelector("#nav-shelf").style.maxHeight = "0px";
      document.querySelector("#nav-shelf").style.paddingTop = "0px";
      document.querySelector("#nav-shelf").style.paddingBottom = "0px";
    }
  }, [navOpen]);

  function toggleTheme() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  function toggleNav() {
    let toggle = document.querySelector("#nav-toggle");
    toggle.classList.toggle("open");
    setNavOpen(!navOpen);
  }

  function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
      behavior: "smooth",
      block: "start", // Scroll to the start of the target element
      inline: "start", // Scroll to the nearest edge of the target element
      scrollMargin: "-100px", // Add padding to the scroll
    });
  }

  function getCurrentPage() {
    // Get the current URL
    const url = window.location.href;

    // Extract the pathname from the URL
    const pathname = new URL(url).pathname;

    // Extract the current page from the pathname
    const currentPage = pathname.split("/").pop();

    return currentPage;
  }

  function setAllInactive() {
    document.querySelectorAll("a.active").forEach((link) => {
      link.classList.remove("active");
    });
  }

  function setActive(evt, id) {
    setAllInactive();
    if (!id) {
      let el = evt.target;
      el.classList.add("active");
    } else {
      let el = document.querySelector(id);
      el.classList.add("active");
    }
  }

  async function Home(evt) {
    toggleNav();
    let currentPage = getCurrentPage();
    setActive(evt);
    if (currentPage === "") {
      smoothScroll("#header");
    } else {
      router("/");
      await wait(500);
      smoothScroll("#header");
      setActive(null, "#header-link");
    }
  }

  async function AboutMe(evt) {
    toggleNav();
    let currentPage = getCurrentPage();
    setActive(evt);
    if (currentPage === "") {
      smoothScroll("#about");
    } else {
      router("/");
      await wait(500);
      smoothScroll("#about");
      setActive(null, "#about-me-link");
    }
  }

  async function Experience(evt) {
    toggleNav();
    let currentPage = getCurrentPage();
    setActive(evt);
    if (currentPage === "") {
      smoothScroll("#resume");
    } else {
      router("/");
      await wait(500);
      smoothScroll("#resume");
      setActive(null, "#experience-link");
    }
  }

  async function Projects(evt) {
    toggleNav();
    let currentPage = getCurrentPage();
    setActive(evt);
    if (currentPage === "") {
      smoothScroll("#projects");
    } else {
      router("/");
      await wait(500);
      smoothScroll("#projects");
      setActive(null, "#projects-link");
    }
  }

  return (
    <nav id="nav" className="navbar">
      <section className="nav-container">
        <section className="nav-left">
          <div className="logo-container">
            <img className="logo-image" src={logo} alt="sean logo" />
          </div>
          <section className="nav-title-section">
            <p className="title-name">Sean Brill,</p>
            <p className="title-position">Software Engineer</p>
          </section>
        </section>

        <section className="links-section">
          {/* Home */}
          <a
            id="header-link"
            className={getCurrentPage() === "" ? "nav-link active" : "nav-link"}
            onClick={(e) => {
              Home(e);
            }}
          >
            Home
          </a>
          {/* About Me */}
          <a
            id="about-me-link"
            className="nav-link"
            onClick={(e) => {
              AboutMe(e);
            }}
          >
            About Me
          </a>
          {/* Experience */}
          <a
            className="nav-link"
            id="experience-link"
            onClick={(e) => {
              Experience(e);
            }}
          >
            Experience
          </a>
          {/* Projects */}
          <a
            className="nav-link"
            id="projects-link"
            onClick={(e) => {
              Projects(e);
            }}
          >
            Projects
          </a>
          <div className="theme-button" onClick={toggleTheme}>
            {theme == "light" ? (
              <img className="theme-image" src={moon} alt="Dark Theme" />
            ) : (
              <img className="theme-image" src={sun} alt="Light Theme" />
            )}
          </div>
        </section>

        <section className="responsive-links">
          <button id="nav-toggle" className="nav-toggle" onClick={toggleNav}>
            <div className="nav-toggle-brgr"></div>
          </button>
        </section>
      </section>

      <section id="nav-shelf" className="nav-shelf">
        <div className="theme-toggle-switch-container">
          <span className="toggle-label">Dark Theme</span>
          <div className="theme-toggle-switch">
            <ToggleSwitch
              id="theme-toggle-switch"
              initialLoad={props.initialLoad}
              active={theme === "dark" ? true : false}
              onActive={() => {
                setTheme("dark");
              }}
              onInActive={() => {
                setTheme("light");
              }}
              // activeImage={sun}
              // inactiveImage={moon}
            />
          </div>
        </div>
        {/* Home */}
        <a
          id="header-link-mobile"
          className="nav-link active"
          onClick={(e) => {
            Home(e);
          }}
        >
          Home
        </a>
        {/* About Me */}
        <a
          id="about-me-link-mobile"
          className="nav-link"
          onClick={(e) => {
            AboutMe(e);
          }}
        >
          About Me
        </a>
        {/* Experience */}
        <a
          id="experience-link-mobile"
          className="nav-link"
          onClick={(e) => {
            Experience(e);
          }}
        >
          Experience
        </a>
        {/* Projects */}
        <a
          id="projects-link-mobile"
          className="nav-link"
          onClick={(e) => {
            Projects(e);
          }}
        >
          Projects
        </a>
      </section>
    </nav>
  );
}

export default Navbar;
