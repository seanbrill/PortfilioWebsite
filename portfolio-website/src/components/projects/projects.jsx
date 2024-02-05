import React from "react";
import { useEffect } from "react";
import "./projects.css";
import ProjectShowcase from "../project-showcase/project-showcase";
import JSEngineDemo from "../JSEngineDemo/JSEngineDemo";

import testImage from "../../assets/images/skrek.png";
import testImage2 from "../../assets/images/cado.png";
import testImage3 from "../../assets/images/testimg3.png";
import testImage4 from "../../assets/images/testimg4.png";
import testImage5 from "../../assets/images/testimg5.png";
import testImage6 from "../../assets/images/testimg6.png";

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

function Projects(props) {
  useEffect(() => {
    if (props.initialLoad) {
    }
  }, []);
  return (
    <section id="Projects">
      <section className="projects-container">
        <h1 className="projects-header">Projects</h1>
        <section className="projects-grid">
          <ProjectShowcase
            id={"js-engine-project"}
            images={[testImage, testImage2, testImage3, testImage4, testImage5, testImage6]}
            projectName={"JSEngine"}
            description={
              "Using ThreeJs and Webpack I decided to try and make a custom framework to help making native 3D web apps and games easier for developers like myself"
            }
            mainComponent={<JSEngineDemo />}
            // sideComponent={<h1>Side component Test</h1>}
            initialLoad={props.initialLoad}
          />

          <ProjectShowcase
            id={"py-snake-project"}
            projectName={"PySnake"}
            images={[pySnake1, pySnake2, pySnake3, pySnake4]}
            description={
              "Explore PySnake, a Python classic snake game with a sophisticated tkinter interface. This game elevates the traditional snake experience by incorporating Node.js API functions for a global leaderboard, allowing players to compete internationally. Maneuver the snake using WASD or Arrow keys, collect food to earn points, and climb the color-coded leaderboard (Green: Easy, Orange: Normal, Red: Hard) to gauge global performance. Customize your gaming experience with settings for snake and food colors, and unlock the coveted Rainbow Snake by achieving a top score of 100. PySnake leverages Azure Cloud Functions for seamless backend services. Install PySnake now for a polished and thrilling gaming experience!"
            }
            sideComponent={<PySnakeLeaderboard initialLoad={props.initialLoad} />}
            initialLoad={props.initialLoad}
          />

          <ProjectShowcase
            id={"ai-project"}
            projectName={"AI Voice Cloning"}
            images={[AIVoice1]}
            description={
              "Pinball Splash is a 2.5-D pinball game created for a mini project at Penn State. Developed in just three hours, the game features a swimming pool theme, with players controlling flippers to keep the ball in play. Various obstacles, such as springs and bumpers, add excitement and contribute to the player's score. The project involves a dedicated team of developers specializing in graphics, physics, user interface, and game design."
            }
            initialLoad={props.initialLoad}
          />

          <ProjectShowcase
            id={"pinball-splash-project"}
            projectName={"Pinball Splash"}
            images={[pinball1, pinball2, pinball3, pinball4]}
            description={
              "Pinball Splash is a 2.5-D pinball game created for a mini project at Penn State. Developed in just three hours, the game features a swimming pool theme, with players controlling flippers to keep the ball in play. Various obstacles, such as springs and bumpers, add excitement and contribute to the player's score. The project involves a dedicated team of developers specializing in graphics, physics, user interface, and game design."
            }
            initialLoad={props.initialLoad}
          />
        </section>
      </section>
    </section>
  );
}

export default Projects;
