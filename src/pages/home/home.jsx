import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import Navbar from "../../components/navbar/navbar";
import Header from "../../components/header/header";
import "./home.css";
import About from "../../components/about/about";
import Resume from "../../components/resume/resume";
import Projects from "../../components/projects/projects";
import Footer from "../../components/footer/footer";
import SiteVisitedEvent from "../../components/siteVisitEvent/site-visited-event";

function Home() {
  const [initialLoad, setInitialLoad] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (initialLoad) {
      window.scrollTo(0, 0);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  return (
    <div className="home-page-container">
      <SiteVisitedEvent initialLoad={initialLoad} page={"Home"} />
      <Navbar initialLoad={initialLoad} />
      <Header initialLoad={initialLoad} />
      <About initialLoad={initialLoad} />
      <Resume initialLoad={initialLoad} />
      <Projects initialLoad={initialLoad} />
      <Footer />
    </div>
  );
}

export default Home;
