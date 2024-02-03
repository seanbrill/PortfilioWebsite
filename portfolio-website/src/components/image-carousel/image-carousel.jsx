import React, { useEffect, useState } from "react";
import "./image-carousel.css";

function ImageCarousel(props) {
  const [images, setImages] = useState(props.images);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (props.initialLoad) {
    }
  }, []);

  function next() {
    if (activeIndex + 1 < images.length) {
      setActiveIndex(activeIndex + 1);
    }
  }

  function previous() {
    if (activeIndex - 1 >= 0) {
      setActiveIndex(activeIndex - 1);
    }
  }

  return (
    <section id={props.id} className="image-carousel">
      <button onClick={next} className="image-carousel-button btn-left">
        {"<"}
      </button>
      <div className="carousel-viewport">
        {activeIndex > 0 ? <img src={images[activeIndex - 1]} alt={props.alt} /> : null}
        <img src={images[activeIndex]} alt={props.alt} />
        {activeIndex > 0 ? <img src={images[activeIndex + 1]} alt={props.alt} /> : null}
      </div>
      <button onClick={next} className="image-carousel-button btn-right">
        {">"}
      </button>
    </section>
  );
}

export default ImageCarousel;
