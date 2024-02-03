export function fadeOut(element, timeMs, opacityLevel, callback) {
  if (!element) return;
  element.animate([{ opacity: opacityLevel ? opacityLevel : 1 }, { opacity: 0 }], {
    duration: timeMs,
  });
  setTimeout(() => {
    element.style.display = "none";
    if (callback) callback();
  }, timeMs - 100);
}

export function fadeIn(element, timeMs, opacityLevel, displayType, callback) {
  if (!element) return;
  element.style.display = displayType ? displayType : "flex";
  element.animate([{ opacity: 0 }, { opacity: opacityLevel ? opacityLevel : 1 }], {
    duration: timeMs,
  });
  setTimeout(() => {
    element.style.opacity = opacityLevel ? opacityLevel.toString() : "1";
    if (callback) callback();
  }, timeMs - 1);
}

export function moveElement(
  element,
  timeMs,
  startPosition = { top: 0, left: 0, right: 0, bottom: 0 },
  endPosition = { top: 0, left: 0, right: 0, bottom: 0 },
  callback,
  callbackDelay = 0
) {
  if (!element) return;

  // Create an options object for the animate method
  const options = {
    duration: timeMs,
    fill: "forwards",
  };

  // Check and apply animations for each property
  if (endPosition.top !== startPosition.top)
    element.animate([{ top: startPosition.top }, { top: endPosition.top }], options);
  if (endPosition.left !== startPosition.left)
    element.animate([{ left: startPosition.left }, { left: endPosition.left }], options);
  if (endPosition.right !== startPosition.right)
    element.animate([{ right: startPosition.right }, { right: endPosition.right }], options);
  if (endPosition.bottom !== startPosition.bottom)
    element.animate([{ bottom: startPosition.bottom }, { bottom: endPosition.bottom }], options);

  // Set a timeout to apply final styles and execute the callback
  setTimeout(() => {
    if (endPosition.top !== startPosition.top) element.style.top = endPosition.top;
    if (endPosition.left !== startPosition.left) element.style.left = endPosition.left;
    if (endPosition.right !== startPosition.right) element.style.right = endPosition.right;
    if (endPosition.bottom !== startPosition.bottom) element.style.bottom = endPosition.bottom;
    if (callback) callback();
  }, timeMs + callbackDelay);
}

export function observeNode(element, callback) {
  // Check if the MutationObserver is supported in the current environment
  if (typeof MutationObserver === "undefined") {
    console.error("MutationObserver is not supported in this environment.");
    return;
  }

  // Create a new MutationObserver with a callback function
  const observer = new MutationObserver((mutationsList, observer) => {
    // Check if there are mutations
    if (mutationsList.length > 0) {
      // Invoke the provided callback when mutations occur
      callback(mutationsList, observer);
    }
  });

  // Configure the MutationObserver to observe attributes, childList, and subtree
  const config = { attributes: true, childList: true, subtree: true };

  // Start observing the target element with the specified configuration
  observer.observe(element, config);

  // Return the observer instance, in case you want to disconnect later
  return observer;
}

export function onNodeVisible(element, callback) {
  // Check if the IntersectionObserver is supported in the current environment
  if (typeof IntersectionObserver === "undefined") {
    console.error("IntersectionObserver is not supported in this environment.");
    return;
  }

  // Create a new IntersectionObserver with a callback function
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Check if the target element is intersecting with the viewport
      if (entry.isIntersecting) {
        // Invoke the provided callback when the element becomes visible
        callback(entry, observer);
      }
    });
  });

  // Start observing the target element
  observer.observe(element);

  // Return the observer instance, in case you want to disconnect later
  return observer;
}
