import React, { useEffect, useRef, useState } from "react";
import { tryParse, wait } from "../../utils/genericUtils";
import packageJson from "../../../package.json";
import "./leaderboard.css";
import { LogEvent } from "../../utils/EventLogging";

function PySnakeLeaderboard(props) {
  const leaderboard_api_url = packageJson.isDev ? "GetLeaderboard?code=vXJK0waIlMK8zpls6ibRtP1tqJZt3F4-Qa6wRUNTLHmJAzFufclnrw==" : "https://pysnake.azurewebsites.net/api/GetLeaderboard?code=vXJK0waIlMK8zpls6ibRtP1tqJZt3F4-Qa6wRUNTLHmJAzFufclnrw==";

  const [elements, setElements] = useState(null);

  useEffect(() => {
    if (props.initialLoad) {
    }
  }, [elements]);

  function GetLeaderboard(iteration = 0) {
    showLoader();
    return new Promise(async (resolve) => {
      let request = new XMLHttpRequest();
      request.open("GET", leaderboard_api_url);
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Access-Control-Allow-Origin", "*");
      request.send();
      request.onload = async () => {
        let response = tryParse(request.response);

        if (response && response.success) {
          hideLoader();
          return resolve(response.leaderboard);
        }

        //request failed resource probably scaled down
        if (response && !response.success && iteration < 50) {
          return resolve(await GetLeaderboard(iteration + 1));
        }

        return resolve([]);
      };
    });
  }

  function formatLeaderboard(leaderboard) {
    return leaderboard.map((row, index) => (
      <div key={index} className="leaderboard-row">
        <span className="order">{index + 1}</span>
        <span className="name">{row.name}</span>
        <span className="score">{row.score}</span>
      </div>
    ));
  }

  async function loadLeaderboard() {
    LogEvent("PySnake:LoadLeaderboard");
    setElements([]);
    let data = await GetLeaderboard();
    setElements(formatLeaderboard(data));
  }

  function showLoader() {
    let preloadText = document.querySelector("#preload-text");
    if (preloadText) preloadText.style.display = "none";
    let loaderBG = document.querySelector("#leaderboard-loader-bg");
    loaderBG.style.display = "flex";
  }

  function hideLoader() {
    let loaderBG = document.querySelector("#leaderboard-loader-bg");
    loaderBG.style.display = "none";
  }

  return (
    <section className="leaderboard-section">
      <h2 className="leaderboard-header">PySnake Live Leaderboard</h2>
      {/* scrollable elements list */}
      <div className="leaderboard-list">{elements}</div>
      {/* show this text if elements is null */}
      {elements ? null : (
        <p id="preload-text" className="preload-text">
          Click the button to load the leaderboard.
        </p>
      )}

      {/* Mini Loader */}
      <div id="leaderboard-loader-bg">
        <div id="leaderboard-loader"></div>
      </div>
      <button onClick={loadLeaderboard} className="load-leaderboard-button">
        Load Leaderboard
      </button>
    </section>
  );
}

export default PySnakeLeaderboard;
