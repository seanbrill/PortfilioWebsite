import React, { useEffect } from "react";
import Home from "../../pages/home/home";

function Redirect(props) {
  useEffect(() => {
    setTimeout(() => {
      let a = document.createElement("a");
      a.href = props.href;
      //a.target = props.target;
      a.click();
    }, 100);
  }, []);
  if (props.target === "__blank" || props.target === "_blank") return <Home />;
}

export default Redirect;
