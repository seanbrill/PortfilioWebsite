import React, { useEffect, useRef, useState } from "react";
import "./image-carousel.css";
import leftChevron from "../../assets/images/chevron_left.png";
import rightChevron from "../../assets/images/chevron_right.png";
import * as elementUtils from "../../utils/elementUtils";
import * as genericUtils from "../../utils/genericUtils";

function ImageCarousel(props) {
  const [images, setImages] = useState(props.images);
  const [activeIndex, setActiveIndex] = useState(0);
  const [forceRender, setForceRender] = useState(false);
  const isMoving = useRef(true);
  const animationTime = 550;
  useEffect(() => {
    console.log("rendering");
    if (props.initialLoad) {
      isMoving.current = false;
      hideShade();
      LockShadeToViewport();
    }

    let resizeTimeout;
    const handleResize = () => {
      showShade();
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(async () => {
        if (activeIndex > 0) {
          await genericUtils.wait(100);
          await ResetPositions();
          console.log("positions reset");
        }
        hideShade();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
  }, [activeIndex, forceRender]);

  function ResetPositions() {
    return new Promise((resolve) => {
      let leftImg = document.querySelector(`#${props.id}-viewport-img-left`);
      let middleImg = document.querySelector(`#${props.id}-viewport-img-middle`);
      let rightImg = document.querySelector(`#${props.id}-viewport-img-right`);

      let middleRect = middleImg.getBoundingClientRect();
      middleImg.style.left = -parseFloat(middleRect.width) + "px";

      if (leftImg) {
        let leftRect = leftImg.getBoundingClientRect();
        leftImg.style.left = -parseFloat(leftRect.width) + "px";
      }

      if (rightImg) {
        let rightRect = rightImg.getBoundingClientRect();
        rightImg.style.left = -parseFloat(rightRect.width) + "px";
      }
      return resolve();
    });
  }

  function LockShadeToViewport() {
    let shade = document.querySelector(`#${props.id}-blackout-shade`);
    let viewport = document.querySelector(`#${props.id}-viewport`);
    elementUtils.lockPosition(shade, viewport);
  }

  function showShade() {
    let shade = document.querySelector(`#${props.id}-blackout-shade`);
    elementUtils.fadeIn(shade, 0, 1, "flex");
  }

  function hideShade() {
    let shade = document.querySelector(`#${props.id}-blackout-shade`);
    elementUtils.fadeOut(shade, 300, 0);
  }

  function next() {
    return new Promise(async (resolve) => {
      if (isMoving.current === true) return resolve();
      if (activeIndex + 1 < images.length) {
        isMoving.current = true;

        let rightImg = document.querySelector(`#${props.id}-viewport-img-right`);
        let middleImg = document.querySelector(`#${props.id}-viewport-img-middle`);

        //transition (old middle image) to left
        if (rightImg) {
          let rect = rightImg.getBoundingClientRect();
          let left = parseFloat(rightImg.style.left);
          if (isNaN(left)) left = 0;

          console.log("right from:", left);
          console.log("right to:", -parseFloat(rect.width) + "px");
          elementUtils.moveElement(
            rightImg,
            animationTime,
            { left: left + "px" },
            {
              left: left * Math.min(activeIndex, 1) - parseFloat(rect.width) + "px",
            },
            () => {
              if (activeIndex + 1 > 1) {
                rightImg.style.left = -rect.width + "px";
              }
            },
            0,
            false
          );
        }

        //transition the active image off to the left
        if (middleImg) {
          let rect = middleImg.getBoundingClientRect();
          let left = parseFloat(middleImg.style.left);
          if (isNaN(left)) left = 0;
          console.log("middle from:", left);
          console.log("middle to:", -parseFloat(rect.width) + "px");
          elementUtils.moveElement(
            middleImg,
            animationTime,
            { left: left + "px" },
            {
              left: left * Math.min(activeIndex, 1) - parseFloat(rect.width) + "px",
            },
            async () => {
              isMoving.current = false;
              if (activeIndex + 1 > 1) {
                middleImg.style.left = -rect.width + "px";
              }
              setActiveIndex(activeIndex + 1);
              return resolve();
            },
            0,
            false,
            false
          );
        }
      } else {
        return resolve();
      }
    });
  }

  function previous() {
    return new Promise(async (resolve) => {
      if (isMoving.current === true) return resolve();
      if (activeIndex - 1 >= 0) {
        isMoving.current = true;

        let leftImg = document.querySelector(`#${props.id}-viewport-img-left`);
        let middleImg = document.querySelector(`#${props.id}-viewport-img-middle`);

        //transition left image to right
        if (leftImg) {
          let rect = leftImg.getBoundingClientRect();
          let left = parseFloat(-rect.width);
          if (isNaN(left)) left = 0;

          console.log("left from:", left);
          console.log("left to:", parseFloat(rect.width) + "px");
          elementUtils.moveElement(
            leftImg,
            animationTime,
            { left: left + "px" },
            {
              left: left + parseFloat(rect.width) + "px",
            },
            () => {
              if (activeIndex + 1 > 1) {
                leftImg.style.left = rect.width + "px";
              }
            },
            0,
            false
          );
        }

        //transition the active image off to the right
        if (middleImg) {
          let rect = middleImg.getBoundingClientRect();
          let left = parseFloat(middleImg.style.left);
          if (isNaN(left)) left = 0;
          console.log("middle from:", left);
          console.log("middle to:", parseFloat(rect.width) + "px");
          elementUtils.moveElement(
            middleImg,
            animationTime,
            { left: left + "px" },
            {
              left: left * Math.min(activeIndex, 1) + parseFloat(rect.width) + "px",
            },
            async () => {
              isMoving.current = false;
              middleImg.style.left = -parseFloat(rect.width) + "px";
              setActiveIndex(activeIndex - 1);
              if (activeIndex - 1 == 0) {
                middleImg.style.left = "0px";
                //find right image if it exists and update its position to + width
                let right_img = document.querySelector(`#${props.id}-viewport-img-right`);
                if (right_img) {
                  right_img.style.left = "0px";
                }
              }
              return resolve();
            },
            0,
            false,
            false
          );
        }
      } else {
        return resolve();
      }
    });
  }

  return (
    <section id={props.id} className="image-carousel">
      {/* Previous Button */}
      <button
        onClick={async () => {
          await previous();
        }}
        className="image-carousel-button btn-left"
      >
        <img src={leftChevron} alt="next button" />
      </button>
      <div id={props.id + "-viewport"} className="carousel-viewport">
        {/* Left Image */}
        {activeIndex > 0 ? (
          <div
            id={props.id + "-viewport-img-left"}
            className="viewport-image-container offscreen-left"
          >
            <img src={images[activeIndex - 1]} alt={props.alt} />
          </div>
        ) : null}
        {/* Blackout Shade */}
        <div id={props.id + "-blackout-shade"} className="shade"></div>
        {/* Center Image */}
        <div id={props.id + "-viewport-img-middle"} className="viewport-image-container onscreen">
          <img src={images[activeIndex]} alt={props.alt} />
        </div>
        {/* Right Image */}
        {activeIndex < images.length ? (
          <div
            id={props.id + "-viewport-img-right"}
            className="viewport-image-container offscreen-right"
          >
            <img src={images[activeIndex + 1]} alt={props.alt} />
          </div>
        ) : null}
      </div>

      {/* Next Button */}
      <button
        onClick={async () => {
          await next();
        }}
        className="image-carousel-button btn-right"
      >
        <img src={rightChevron} alt="previous button" />
      </button>
    </section>
  );
}

export default ImageCarousel;
