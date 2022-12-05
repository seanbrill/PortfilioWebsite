import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ThemeContext from "../../context/ThemeContext";
import './home.css';
import Navbar from "../../components/navbar/navbar";
import cartoonHeadShot from '../../assets/images/SeanCartoonHeadshot.png';
import lightLinkedIn from '../../assets/images/inLight.png';
import darkLinkedIn from '../../assets/images/inDark.png';
import githubLight from '../../assets/images/GitHub.png';
import resumeIcon from '../../assets/images/ResumeIcon.png';
import resume from '../../assets/pdfs/Resume.pdf';
import bracketsLight from '../../assets/images/bracketsWhite.png';
import bracketsDark from '../../assets/images/bracketsDark.png';
import serverIcon from '../../assets/images/server.png';
import serverIconLight from '../../assets/images/serverWhite.png';
import unityLight from '../../assets/images/unityLight.png';
import unityDark from '../../assets/images/unityDark.png';



function Home(){

    const [initialLoad,setInitialLoad] = useState(0);
    const {theme,setTheme} = useContext(ThemeContext);


    //fires once per load
    useEffect(()=>{
        if(initialLoad <= 0){
            intialLoadBioAnimation();
            intialLoadExpertiseAnimation();
        }
    },[initialLoad]);

    function intialLoadBioAnimation(){
        //time in ms
        let time = 1000;
        let bio = document.querySelector('#about-me');
        bio.style.marginTop = '1000px';
        bio.animate([{marginTop:'1000px'},{marginTop:'20px'}],{duration:time});
        setTimeout(()=>{
            bio.style.marginTop = '20px';
            setInitialLoad(initialLoad+1);
        },time - 100);
    }


    function moveUpAnimation(el){
        return new Promise((resolve,reject)=>{
            //time in ms
            let time = 1500;
            el.animate([{marginTop:'500px'},{marginTop:'0px'}],{duration:time});
            setTimeout(()=>{
                el.style.marginTop = '0px';
                setInitialLoad(initialLoad+1);
                resolve(null);
            },time - 100);
        })
         
    }

    async function intialLoadExpertiseAnimation(){
        let exp1 = document.querySelector('#exp1');
        let exp2 = document.querySelector('#exp2');
        let exp3 = document.querySelector('#exp3');
        exp1.style.marginTop = '500px';
        exp2.style.marginTop = '500px';
        exp3.style.marginTop = '500px';
        await moveUpAnimation(exp1);
        await moveUpAnimation(exp2);
        await moveUpAnimation(exp3);

    }


    function Linkedin(){
        window.open('https://www.linkedin.com/in/sean-brill-590752142/');
    }

    function Github(){
        window.open('https://github.com/spb5732');
    }

    function Resume(){
        window.open(resume);
    }


    return (
    <div className="home-page-container">
        <Navbar/>
        <h1 className="section-title main">About</h1>
        <section id="about-me">
                <img className="headshot-image" src={cartoonHeadShot} alt="" />
                <section className="bio">
                    <h1><span className="responsive-optional">Hi, my name is </span><span className="emphasis">Sean Brill<span className="responsive-optional-on">, </span></span><span className="responsive-optional"> and I am a </span><span className="emphasis">Full Stack Engineer.</span></h1>
                    <p className="in-depth-bio">
                        A <span className="emphasis-subtle">Penn State</span> Graduate with a B.S in (IST) Information Sciences and Technology. 
                        I started my coding journey sophmore year of college learning <span className="emphasis-subtle">python3</span>, and quickly realized that programming
                        is my passion. Junior year of college I started as a Computer Science Intern at <span className="emphasis-subtle">Seisan LLC </span>. 
                        Since graduation I have been working full time as a Software Engineer; During my time, I have gained experience with many different languages and tools like:
                        <span className="emphasis-subtle"> (Java, C#, HTML, Javascript, CSS, ASP.NET / ASP.NET Core, Unity)</span>.
                    </p>

                    <section className="social-links">
                        <button className="linkedin" onClick={Linkedin}>
                            {theme == 'light' ? 
                            <img src={lightLinkedIn} alt="linkedin" /> 
                            :
                            <img src={darkLinkedIn} alt="linkedin" />
                             }
                             <span>Linkedin</span>
                        </button>
                        <button className="github" onClick={Github}>
                            {theme == 'light' ? 
                            <img src={githubLight} alt="linkedin" /> 
                            :
                            <img src={githubLight} alt="linkedin" />
                             }
                            <span>Github</span>
                        </button>
                        <button className="resume" onClick={Resume}>
                        {theme == 'light' ? 
                            <img src={resumeIcon} alt="linkedin" /> 
                            :
                            <img src={resumeIcon} alt="linkedin" />
                             }
                            <span>Resume</span>
                        </button>
                    </section>

                </section>         
        </section>

        
        <section className="Expertise">
            <h1 className="section-title">My Expertise</h1>
            <section className="exp-areas">

                <section id="exp1" className="frontend">
                    <div className="exp-title-container">
                        <h2 className="frontend-title">UI/UX</h2>
                        {theme == 'light' ? 
                            <img src={bracketsDark} alt="UI/UX" /> 
                            :
                            <img src={bracketsLight} alt="UI/UX" />
                         }
                    </div>
                    <p className="exp-text">
                        Over two years of experience with HTML,
                        CSS, Javascript, React JS, Vue JS, and TypeScript.
                        Delivering Responsive and engaging user experiences.
                    </p>
                </section>

                <section id="exp2" className="backend">
                    <div className="exp-title-container">
                        <h2 className="frontend-title">Server Side</h2>
                        {theme == 'light' ? 
                        <img src={serverIcon} alt="Backend" /> 
                        :
                        <img src={serverIconLight} alt="Backend" />
                        }
                    </div>
                    <p className="exp-text">
                        Over two years of experience with with Node Js,
                        Express, AWS, Azure, Firebase, and ASP.NET framework.
                        Developing Restful Apis, and backend logic for various client
                        and personal projects. 
                    </p>
                </section>

                <section id="exp3" className="unity">
                    <div className="exp-title-container">
                        <h2 className="frontend-title">Unity</h2>
                        {theme == 'light' ? 
                        <img src={unityDark} alt="unity" /> 
                        :
                        <img src={unityLight} alt="unity" />
                        }
                    </div>
                    <p className="exp-text">
                        Over two years of Unity and C# game
                        development experience. Helping to create interactive
                        user experiences for clients and personal projects. Including 
                        AR and VR expereinces.
                    </p>
                </section>

            </section>
        </section>
    </div>
    )

}


export default Home;