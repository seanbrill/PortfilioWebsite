import React from "react";
import { useEffect, useRef } from "react";
import "./projects.css";
import ProjectShowcase from "../project-showcase/project-showcase";
import JSEngineDemo from "../JSEngineDemo/JSEngineDemo";

import pySnake1 from "../../assets/images/pysnake1.png";
import pySnake2 from "../../assets/images/pysnake2.png";
import pySnake3 from "../../assets/images/pysnake3.png";
import pySnake4 from "../../assets/images/pysnake4.png";

import AIVoice1 from "../../assets/images/AIVoiceThumbnail.png";

import pinball1 from "../../assets/images/pinball1.png";
import pinball2 from "../../assets/images/pinball2.png";
import pinball3 from "../../assets/images/pinball3.png";
import pinball4 from "../../assets/images/pinball4.png";

import PySnakeLeaderboard from "../PySnakeLeaderboard/leaderboard";
import { fadeIn, moveElement, onNodeVisible } from "../../utils/elementUtils";
import { wait } from "../../utils/genericUtils";

function Projects(props) {
  const observers = useRef([]);

  useEffect(() => {
    if (props.initialLoad) {
      let projects = document.querySelector("#projects");
      observers.current.push(onNodeVisible(projects, AnimateProjects));
      setNavProjects();
    }
  }, []);

  function setAllInactive() {
    document.querySelectorAll("a.active").forEach((link) => {
      link.classList.remove("active");
    });
  }

  function setNavProjects() {
    let header = document.querySelector("#projects");
    onNodeVisible(
      header,
      () => {
        setAllInactive();
        document.querySelector("#projects-link").classList.add("active");
        document.querySelector("#projects-link-mobile").classList.add("active");
      },
      window.innerWidth > 750 ? 0.15 : 0.1
    );
  }

  function AnimateProjects() {
    let animationTime = 500;
    let projectsHeader = document.querySelector("#projects-header");

    observers.current.forEach((observer) => {
      observer.disconnect();
    });

    let p1 = document.querySelector("#p1");
    let p2 = document.querySelector("#p2");
    let p3 = document.querySelector("#p3");
    let p4 = document.querySelector("#p4");

    fadeIn(projectsHeader, animationTime, 1, "flex");
    moveElement(
      projectsHeader,
      animationTime,
      { bottom: "-100px" },
      { bottom: "0px" },
      async () => {
        fadeIn(p1, animationTime, 1, "flex");
        moveElement(p1, animationTime, { bottom: "-100px" }, { bottom: "0px" });
        await wait(100);

        fadeIn(p2, animationTime, 1, "flex");
        moveElement(p2, animationTime, { bottom: "-100px" }, { bottom: "0px" });
        await wait(100);

        fadeIn(p3, animationTime, 1, "flex");
        moveElement(p3, animationTime, { bottom: "-100px" }, { bottom: "0px" });
        await wait(100);

        fadeIn(p4, animationTime, 1, "flex");
        moveElement(p4, animationTime, { bottom: "-100px" }, { bottom: "0px" });
        await wait(100);
      }
    );
  }

  function PySnakeWindowsDownload() {
    let a = document.createElement("a");
    a.href = "./PySnake.zip";
    a.download = "PySnake.zip";
    a.click();
  }

  function JSEngineGitHub() {
    window.open("https://github.com/seanbrill/JSEngine", "_blank");
  }

  function PySnakeGithub() {
    window.open("https://github.com/seanbrill/PySnake", "_blank");
  }

  function AIVoiceCloningGitHub() {
    window.open("https://github.com/seanbrill/AI_Voice_Cloning", "_blank");
  }

  function PinballSplashGitHub() {
    window.open("https://github.com/seanbrill/PinballSplash", "_blank");
  }

  return (
    <section id="projects">
      <section className="projects-container">
        <h1 id="projects-header" className="projects-header">
          Projects
        </h1>
        <section className="projects-grid">
          <ProjectShowcase
            id={"p1"}
            images={[]}
            projectName={"JSEngine"}
            description={
              "Inspired by the power of Three.js and the flexibility of Webpack, I embarked on a mission to simplify the development process for native 3D web applications and games. Leveraging TypeScript for enhanced type safety, the JSEngine project represents my endeavor to create a custom framework tailored to the needs of developers like myself. Through meticulous crafting and fine-tuning, this framework aims to streamline the setup process, offering a cohesive solution for building immersive 3D experiences. With TypeScript at its core, the codebase is compiled to JavaScript and bundled using a custom Webpack configuration, ensuring optimal performance and scalability. JSEngine stands as a testament to my dedication to empowering developers in the exciting realm of 3D web development."
            }
            mainComponent={<JSEngineDemo />}
            links={[
              {
                text: "GitHub",
                fg_color: "white",
                bg_color: "black",
                bd_radius: "5px",
                onClick: JSEngineGitHub,
              },
            ]}
            // sideComponent={<h1>Side component Test</h1>}
            initialLoad={props.initialLoad}
          />

          <ProjectShowcase
            id={"p2"}
            projectName={"PySnake"}
            images={[pySnake1, pySnake2, pySnake3, pySnake4]}
            description={
              "Explore PySnake, a Python classic snake game with a sophisticated tkinter interface. This game elevates the traditional snake experience by incorporating Node.js API functions for a global leaderboard, allowing players to compete internationally. Maneuver the snake using WASD or Arrow keys, collect food to earn points, and climb the color-coded leaderboard (Green: Easy, Orange: Normal, Red: Hard) to gauge global performance. Customize your gaming experience with settings for snake and food colors, and unlock the coveted Rainbow Snake by achieving a top score of 100. PySnake leverages Azure Cloud Functions for seamless backend services. Install PySnake now for a polished and thrilling gaming experience!"
            }
            links={[
              {
                text: "windows .exe download",
                fg_color: "white",
                bg_color: "#d4a716",
                bd_radius: "5px",
                onClick: PySnakeWindowsDownload,
              },
              {
                text: "GitHub",
                fg_color: "white",
                bg_color: "black",
                bd_radius: "5px",
                marginLeft: "5px",
                onClick: PySnakeGithub,
              },
            ]}
            sideComponent={<PySnakeLeaderboard initialLoad={props.initialLoad} />}
            initialLoad={props.initialLoad}
          />

          <ProjectShowcase
            id={"p3"}
            projectName={"AI Voice Cloning"}
            images={[AIVoice1]}
            description={
              "AI Voice Cloning emerges as a Windows-based marvel, harnessing the capabilities of Hugging Face AI tools for voice synthesis and refinement. With a focus on versatility across various applications, this project aims to offer intuitive voice cloning functionalities. Utilizing the advanced technologies of Bark and Transformers, it endeavors to provide a seamless user experience. The primary objective is to achieve real-time voice cloning capabilities using pre-trained models. While current progress sees real-time audio output reliant on GPU computation, ongoing efforts are dedicated to advancing towards this goal. This project represents a continuous endeavor aimed at exploring the potential of AI tools from Hugging Face in the realm of voice cloning."
            }
            links={[
              {
                text: "GitHub",
                fg_color: "white",
                bg_color: "black",
                bd_radius: "5px",
                onClick: AIVoiceCloningGitHub,
              },
            ]}
            initialLoad={props.initialLoad}
          />

          <ProjectShowcase
            id={"p4"}
            projectName={"Pinball Splash"}
            images={[pinball1, pinball2, pinball3, pinball4]}
            description={
              "Pinball Splash is a 2.5-D pinball game created for a mini project at Penn State. Developed in just three hours, the game features a swimming pool theme, with players controlling flippers to keep the ball in play. Various obstacles, such as springs and bumpers, add excitement and contribute to the player's score. The project involves a dedicated team of developers specializing in graphics, physics, user interface, and game design."
            }
            links={[
              {
                text: "GitHub",
                fg_color: "white",
                bg_color: "black",
                bd_radius: "5px",
                onClick: PinballSplashGitHub,
              },
            ]}
            initialLoad={props.initialLoad}
          />
        </section>
      </section>
    </section>
  );
}

export default Projects;
