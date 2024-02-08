import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import Navbar from "../../components/navbar/navbar";
import Header from "../../components/header/header";
import "./home.css";
import About from "../../components/about/about";
import Resume from "../../components/resume/resume";
import Projects from "../../components/projects/projects";
import Footer from "../../components/footer/footer";

function Home() {
  const [initialLoad, setInitialLoad] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [initialLoad]);

  return (
    <div className="home-page-container">
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
