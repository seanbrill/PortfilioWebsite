import React, { useEffect, useState } from "react";
import "./JSEngineDemo.css";
import thumbnail from "../../assets/images/JSEngineThumbnail.png";
import playIcon from "../../assets/images/Play.png";

import fullscreen from "../../assets/images/fullscreen.png";
import exit_fullscreen from "../../assets/images/exit_fullscreen.png";

function JSEngineDemo() {
  const [active, setActive] = useState(false);
  const [isFullscreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    let demoFrame = document.querySelector("#demo-frame");
    if (demoFrame) {
      if (isFullscreen) {
        demoFrame.classList.add("full-screen");
      } else {
        demoFrame.classList.remove("full-screen");
      }
    }
  }, [active, isFullscreen]);

  return (
    <>
      {active ? (
        <section id="demo-frame" className="demo-frame active-demo">
          <iframe src={"./demo.html"}></iframe>
          <div className="demo-controls">
            <button
              className="exit-button"
              onClick={() => {
                let demoFrame = document.querySelector("#demo-frame");
                demoFrame.classList.remove("full-screen");
                setActive(false);
              }}
            >
              Exit Demo
            </button>
            <button
              className="full-screen-button"
              onClick={() => {
                setIsFullScreen(!isFullscreen);
              }}
            >
              <img src={isFullscreen ? exit_fullscreen : fullscreen} alt="toggle full-screen" />
            </button>
          </div>
        </section>
      ) : (
        <section className="demo-frame">
          <img className="demo-thumbnail" src={thumbnail} alt="JSEngine Thumbanil" />
          <p className="try-demo-text">Try The Demo</p>
          <button
            onClick={() => {
              setActive(true);
            }}
            className="play-button"
          >
            <img src={playIcon} alt="play button" />
          </button>
        </section>
      )}
    </>
  );
}

export default JSEngineDemo;
