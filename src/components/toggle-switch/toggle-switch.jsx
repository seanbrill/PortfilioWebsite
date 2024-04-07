import React, { useEffect, useState, useContext } from "react";
import "./toggle-switch.css";
import ThemeContext from "../../context/ThemeContext";

import * as elementUtils from "../../utils/elementUtils";

import { wait } from "../../utils/genericUtils";

const toggleDefaults = {
  id: "toggle-switch",
  active: false,
  initialLoad: false,
  activeImage: null,
  inactiveImage: null,
  onActive: () => {},
  onInActive: () => {},
};

function ToggleSwitch(props = toggleDefaults) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [active, setActive] = useState(theme === "dark");
  const animationTime = 300;

  useEffect(() => {
    if (props.initialLoad) {
    }
    DefaultTogglePosition(theme === "dark");
  }, [active, theme]);

  function Toggle() {
    let slider = document.querySelector("#" + props.id + "-slider");
    if (window.innerWidth > 600) return;
    if (active) {
      //currently active setting to inactive
      let parent_rect = slider.parentElement.parentElement.getBoundingClientRect();
      let slider_rect = slider.getBoundingClientRect();
      let posX = 100 - (slider_rect.width / parent_rect.width) * 100 + "%";
      elementUtils.moveElement(slider, animationTime, { left: posX }, { left: "0%" });
      setActive(false);
      if (props.onInActive) props.onInActive();
      //update slider color
    } else {
      //currently inactive setting to inactive
      let parent_rect = slider.parentElement.parentElement.getBoundingClientRect();
      let slider_rect = slider.getBoundingClientRect();
      let posX = 100 - (slider_rect.width / parent_rect.width) * 100 + "%";
      elementUtils.moveElement(slider, animationTime, { left: "0%" }, { left: posX });
      setActive(true);
      if (props.onActive) props.onActive();
    }
  }

  function DefaultTogglePosition(active) {
    setActive(active);
    let slider = document.querySelector("#" + props.id + "-slider");
    if (!active) {
      //currently active setting to inactive
      let parent_rect = slider.parentElement.parentElement.getBoundingClientRect();
      let slider_rect = slider.getBoundingClientRect();
      let posX = 100 - (slider_rect.width / parent_rect.width) * 100 + "%";
      elementUtils.moveElement(slider, animationTime, { left: posX }, { left: "0%" });
    } else {
      //currently inactive setting to inactive
      let parent_rect = slider.parentElement.parentElement.getBoundingClientRect();
      let slider_rect = slider.getBoundingClientRect();
      let posX = 100 - (slider_rect.width / parent_rect.width) * 100 + "%";
      elementUtils.moveElement(slider, animationTime, { left: "0%" }, { left: posX });
    }
  }

  const baseClass = "toggle-switch-outer ";
  return (
    <div
      data-active={props.active}
      onClick={Toggle}
      id={props.id}
      className={active || props.active ? baseClass + "toggle-active" : baseClass}
    >
      <div id={props.id + "-slider"} className="toggle-switch-inner">
        {props.activeImage && props.inactiveImage ? (
          <img
            className={"toggle-switch-image"}
            src={active || props.active ? props.activeImage : props.inactiveImage}
            alt="toggle image"
          />
        ) : null}
      </div>
    </div>
  );
}

export default ToggleSwitch;
