import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Home from "./pages/home/home";
import ThemeContext from "./context/ThemeContext";
import { useEffect, useState } from "react";
import "./App.css";
import themes from "./themes/themes.json";
import Redirect from "./components/redirect/redirect";
import resumePDF from "./assets/pdfs/Resume.pdf";
import ResumePage from "./pages/resume/resumePage";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [theme, setTheme] = useState("light");

  //once per render
  useEffect(() => {
    if (localStorage.getItem("theme") == null) {
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
    r.style.setProperty("--nav-link-text-full", colors.navLinkTextFull);
    r.style.setProperty("--nav-link-text-mobile", colors.navLinkTextMobile);
    r.style.setProperty("--inactive-toggle-color", colors.toggleInActiveColor);
    r.style.setProperty("--active-toggle-color", colors.toggleActiveColor);
    r.style.setProperty("--header-background", colors.headerBackground);
    r.style.setProperty("--about-background", colors.aboutBackground);
    r.style.setProperty("--about-header", colors.aboutHeader);
    r.style.setProperty("--about-text", colors.aboutText);
    r.style.setProperty("--resume-text", colors.resumeText);
    r.style.setProperty("--projects-header", colors.projectsHeader);
    r.style.setProperty("--project-showcase-background", colors.projectShowcaseBackground);
    r.style.setProperty(
      "--project-showcase-button-background",
      colors.projectShowcaseButtonBackground
    );
    r.style.setProperty("--project-showcase-header", colors.projectShowcaseHeader);
    r.style.setProperty("--project-showcase-description", colors.projectShowcaseDescription);
    r.style.setProperty("--logo-border", colors.logoBorder);
    r.style.setProperty("--nav-name-text", colors.navNameText);
    r.style.setProperty("--nav-position-text", colors.navPositionText);
    r.style.setProperty("--theme-button-border", colors.themeButtonBorder);
    r.style.setProperty("--theme-button-hover", colors.themeButtonHover);
    r.style.setProperty("--photo-border", colors.photoBorder);
    r.style.setProperty("--text-primary", colors.textPrimary);
    r.style.setProperty("--text-secondary", colors.textSecondary);
    r.style.setProperty("--text-tertiary", colors.textTertiary);
    r.style.setProperty("--experience-graph-color", colors.experienceGraphColor);
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
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/redirect/resume" element={<Redirect href={resumePDF} />} />
          <Route
            path="/linkedin"
            element={<Redirect href={"https://www.linkedin.com/in/sean-brill-590752142/"} />}
          />
          <Route path="/github" element={<Redirect href={"https://github.com/seanbrill"} />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
