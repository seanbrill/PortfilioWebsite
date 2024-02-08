import React, { useEffect } from "react";
import "./skill.css";
import PercentageCircle from "../percent-circle/percentage-circle";
import { fadeIn, moveElement } from "../../utils/elementUtils";

function Skill(props) {
  const animationTime = 500;
  useEffect(() => {
    if (props.animateTrigger == true) {
      Animate();
    }
  }, [props.animateTrigger]);

  function Animate() {
    let skill = document.querySelector(`#${props.id}-outer`);
    fadeIn(skill, animationTime, 1, "flex");
    moveElement(skill, animationTime, { bottom: "-100px" }, { bottom: "0px" });
  }

  return (
    <div id={props.id + "-outer"} className="skill">
      <PercentageCircle
        id={props.id}
        value={props.value}
        initialLoad={props.initialLoad}
        animate={props.animateTrigger ?? true}
        size={props.size ?? "150px"}
        color={props.color ?? null}
      />
      <p style={{ color: props.color ?? "black" }} className="skill-name-text">
        {props.skillName ?? "skill name here"}
      </p>
    </div>
  );
}

export default Skill;
