import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import Navbar from "../../components/navbar/navbar";
import Header from "../../components/header/header";
import "./home.css";
import About from "../../components/about/about";
import Resume from "../../components/resume/resume";

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
      <Navbar />
      <Header initialLoad={initialLoad} />
      <About initialLoad={initialLoad} />
      <Resume initialLoad={initialLoad} />
    </div>
  );
}

export default Home;
