import React, { useState } from "react";
import "./percentage-circle.css";
import { useEffect } from "react";
import { wait } from "../../utils/genericUtils";

function PercentageCircle(props) {
  const [animate, setAnimate] = useState(props.animate ?? false);
  useEffect(() => {
    if (props.animate) {
      setAnimate(props.animate);
      Animate();
    }
  }, [props.animate]);

  async function Animate() {
    let valueText = document.querySelector(`#${props.id}-value-text`);
    let v = 0;
    while (v <= props.value) {
      if (v < 100) {
        valueText.innerHTML = " " + v + "%";
      } else {
        valueText.innerHTML = v + "%";
      }
      v++;
      await wait(25 * (1 + props.value / 100));
    }
  }

  return (
    <div id={props.id} className="circle-outer" style={{ height: props.size, width: props.size }}>
      {animate ? (
        <>
          <span></span>
          <svg style={{ color: props.color ?? "cornflowerblue" }} viewBox="0 0 36 36">
            {/* background part */}
            <path
              className="circle-bg"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* colored part */}
            <path
              className="circle"
              stroke={animate ? "currentColor" : "transparent"}
              strokeDasharray={(animate ? props.value : 0) + ",100"}
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </>
      ) : (
        <>
          <svg style={{ color: props.color ?? "cornflowerblue" }} viewBox="0 0 36 36">
            {/* background part */}
            <path
              className="circle-bg"
              d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* colored part */}
            <path
              className="circle"
              stroke={"transparent"}
              strokeDasharray={"0,100"}
              d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </>
      )}
      <span
        id={props.id + "-value-text"}
        className="percentage-text"
        style={{ color: props.color ?? "black" }}
      >
        {animate ? props.value + "%" : "0%"}
      </span>
    </div>
  );
}

export default PercentageCircle;
