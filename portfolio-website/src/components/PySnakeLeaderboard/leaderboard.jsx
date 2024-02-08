import React, { useEffect, useState } from "react";
import { tryParse } from "../../utils/genericUtils";
import "./leaderboard.css";

function PySnakeLeaderboard(props) {
  const leaderboard_api_url =
    "https://pysnake.azurewebsites.net/api/GetLeaderboard?code=vXJK0waIlMK8zpls6ibRtP1tqJZt3F4-Qa6wRUNTLHmJAzFufclnrw==";

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (props.initialLoad) {
      GetLeaderboard();
    }
  }, []);

  function GetLeaderboard() {
    let request = new XMLHttpRequest();
    request.open("GET", leaderboard_api_url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.send();
    request.onload = () => {
      let response = tryParse(request.response);
      if (response && response.success) {
        setLeaderboard(response.leaderboard);
      }
    };
  }

  function formatLeaderboard() {
    return leaderboard.map((row, index) => (
      <div key={index} className="leaderboard-row">
        <span className="order">{index + 1}</span>
        <span className="name">{row.name}</span>
        <span className="score">{row.score}</span>
      </div>
    ));
  }

  return (
    <section className="leaderboard-section">
      <h2 className="leaderboard-header">PySnake Live Leaderboard</h2>
      {formatLeaderboard()}
    </section>
  );
}

export default PySnakeLeaderboard;
