import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import logo from '../../assets/images/SeanLogo.png';
import moon from '../../assets/images/moon.png';
import sun from '../../assets/images/sun.png';
import './navbar.css';

function Navbar(){
    const {theme,setTheme} = useContext(ThemeContext);
    const [navOpen,setNavOpen] = useState(false);

    //once per load
    useEffect(()=>{

        if(navOpen){
            console.log('open');
            document.querySelector('#nav-shelf').style.maxHeight = '200px';
            document.querySelector('#nav-shelf').style.paddingTop = '20px';
            document.querySelector('#nav-shelf').style.paddingBottom = '20px';
        }else{
            console.log('closed');
            document.querySelector('#nav-shelf').style.maxHeight = '0px';
            document.querySelector('#nav-shelf').style.paddingTop = '0px';
            document.querySelector('#nav-shelf').style.paddingBottom = '0px';
        }

    },[navOpen]);

    function toggleTheme(){
        if(theme == 'light'){
            setTheme('dark');
        }else{
            setTheme('light');
        }
    }


    function toggleNav(){
        let toggle = document.querySelector('#nav-toggle');
        toggle.classList.toggle('open');
        setNavOpen(!navOpen);
    }


    return(
    <nav id="nav" className="navbar">
        <section className="nav-container">
            <section className="nav-left">
                <div className="logo-container">
                    <img className="logo-image" src={logo} alt="sean logo" />
                </div>
                <section className="nav-title-section">
                        <p className="title-name">Sean Brill,</p>
                        <p className="title-position">Software Engineer</p>
                </section>
            </section>
            
            <section className="links-section">
            <div className="theme-button"  onClick={toggleTheme}>
                    {theme == 'light' ?
                    <img className="theme-image" src={moon} alt="Dark Theme" />
                        :
                    <img className="theme-image" src={sun} alt="Light Theme" /> 
                    }
                </div>
                <a className="nav-link active">About Me</a>
                <a className="nav-link">Projects</a>
            </section>

            <section className="responsive-links">
                    <button  id="nav-toggle" className="nav-toggle" onClick={toggleNav}>
                        <div className="nav-toggle-brgr">
                        </div>
                    </button>
            </section>
        </section>

        <section id="nav-shelf" className="nav-shelf">
                <a className="nav-link active">About Me</a>
                <a className="nav-link">Projects</a>
                <div className="theme-button"  onClick={toggleTheme}>
                    {theme == 'light' ?
                    <img className="theme-image" src={moon} alt="Dark Theme" />
                        :
                    <img className="theme-image" src={sun} alt="Light Theme" /> 
                    }
                </div> 
        </section>
    </nav>
    )

}

export default Navbar;