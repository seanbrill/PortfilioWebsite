import React, { useEffect } from "react";
import { LogEvent } from "../../utils/EventLogging";

function SiteVisitedEvent(props) {
  useEffect(() => {
    if (props.initialLoad) {
      setTimeout(() => {
        LogEvent("/" + props.page ?? "Home").then((res) => {});
      }, 500);
    }
    //returns no html
  }, []);
}

export default SiteVisitedEvent;
