import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import ThemeContext from "./context/ThemeContext";
import { useEffect, useState } from "react";
import "./App.css";
import themes from "./themes/themes.json";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [theme, setTheme] = useState("dark");

  //once per render
  useEffect(() => {
    if (localStorage.getItem("theme") == null) {
      console.log("initally saving theme preference: " + theme);
      localStorage.setItem("theme", theme);
    }

    if (initialLoad && localStorage.getItem("theme") != null) {
      setTheme(localStorage.getItem("theme"));
      setInitialLoad(false);
    }
    updateSiteTheme();
  }, [theme]);

  function updateSiteTheme() {
    var r = document.querySelector(":root");
    let colors = themes[theme];
    r.style.setProperty("--primary", colors.primary);
    r.style.setProperty("--secondary", colors.secondary);
    r.style.setProperty("--tertiary", colors.tertiary);
    r.style.setProperty("--navbar", colors.navbar);
    r.style.setProperty("--header-background", colors.headerBackground);
    r.style.setProperty("--about-background", colors.aboutBackground);
    r.style.setProperty("--about-header", colors.aboutHeader);
    r.style.setProperty("--about-text", colors.aboutText);
    r.style.setProperty("--logo-border", colors.logoBorder);
    r.style.setProperty("--nav-name-text", colors.navNameText);
    r.style.setProperty("--nav-position-text", colors.navPositionText);
    r.style.setProperty("--theme-button-border", colors.themeButtonBorder);
    r.style.setProperty("--theme-button-hover", colors.themeButtonHover);
    r.style.setProperty("--photo-border", colors.photoBorder);
    r.style.setProperty("--text-primary", colors.textPrimary);
    r.style.setProperty("--text-secondary", colors.textSecondary);
    r.style.setProperty("--text-tertiary", colors.textTertiary);
    //save theme in local storage
    if (!initialLoad) {
      localStorage.setItem("theme", theme);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
