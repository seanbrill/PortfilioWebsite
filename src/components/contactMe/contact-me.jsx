import React, { useRef } from "react";
import { useEffect, useContext } from "react";
import { moveElement, fadeIn, fadeOut } from "../../utils/elementUtils";
import ThemeContext from "../../context/ThemeContext";
import "./contact-me.css";

import exitLight from "../../assets/images/exitLight.png";
import exitDark from "../../assets/images/exit.png";

import mail1 from "../../assets/images/communication.png";
import mail2 from "../../assets/images/email.png";
import mail3 from "../../assets/images/gmail.png";
import { SendMessage } from "../../utils/ContactMe";
import { LogEvent } from "../../utils/EventLogging";

function ContactMe(props) {
  const { theme, setTheme } = useContext(ThemeContext);
  const active = useRef(false);
  const animationTime = 550;
  useEffect(() => {
    if (props.initialLoad) {
      //maybe do something
    } else {
      if (props.show === true) {
        Show();
      }
    }
  }, [props]);

  function Show() {
    if (active.current) return;
    LogEvent("show contact form");
    let el = document.querySelector("#contact-me-popup");
    moveElement(el, animationTime, { bottom: "-600px" }, { bottom: 0 }, () => {
      active.current = true;
    });
  }

  function Hide() {
    let el = document.querySelector("#contact-me-popup");
    moveElement(el, animationTime, { bottom: 0 }, { bottom: "-600px" }, () => {
      active.current = false;
    });
    if (props.onHide) props.onHide();
  }

  function showLoader() {
    let loaderbg = document.querySelector("#contact-loader-bg");
    loaderbg.style.display = "flex";
  }

  function hideLoader() {
    let loaderbg = document.querySelector("#contact-loader-bg");
    loaderbg.style.display = "none";
  }

  async function Submit() {
    LogEvent("submit contact form");
    showLoader();
    let subject = document.querySelector("#subject-input").value;
    let name = document.querySelector("#name-input").value;
    let email = document.querySelector("#email-input").value;
    let message = document.querySelector("#message-input").value;

    //validate
    let v1 = validateSubject();
    let v2 = validateName();
    let v3 = validateEmail(email);
    let v4 = validateMessage();
    if (v1 && v2 && v3 && v4) {
      let response = await SendMessage(subject, email, name, message);
      if (response.success) {
        //show sent!
        Hide();
      } else {
        alert(response.error);
      }
    }
    hideLoader();
  }

  const invalidClass = "invalid";

  function validateSubject() {
    let isValid = true;
    let subjectInput = document.querySelector("#subject-input");
    if (subjectInput.value.trim().length <= 2) {
      isValid = false;
      subjectInput.placeholder = "Subject Required";
      subjectInput.classList.add(invalidClass);
    }
    if (isValid) subjectInput.classList.remove(invalidClass);
    return isValid;
  }

  function validateName() {
    let isValid = true;
    let nameInput = document.querySelector("#name-input");
    if (nameInput.value.trim().length <= 2) {
      isValid = false;
      nameInput.placeholder = "Name Required";
      nameInput.classList.add(invalidClass);
    }
    if (isValid) nameInput.classList.remove(invalidClass);
    return isValid;
  }

  function validateEmail(email) {
    const validDomains = [
      ".com",
      ".io",
      ".org",
      ".net",
      ".edu",
      ".gov",
      ".biz",
      ".info",
      ".co",
      ".me",
      ".tv",
      ".name",
      ".us",
      ".ca",
      ".uk",
      ".au",
      ".eu",
      ".jp",
      ".cn",
      ".in",
      ".mx",
      ".br",
      ".de",
      ".fr",
      ".es",
      ".it",
      ".nl",
      ".ch",
      ".se",
      ".no",
      ".fi",
      ".dk",
      ".be",
      ".at",
      ".ru",
      ".pl",
      ".cz",
      ".hu",
      ".gr",
      ".tr",
      ".pt",
      ".ro",
      ".kr",
      ".tw",
      ".sg",
      ".vn",
      ".th",
      ".id",
      ".ph",
      ".my",
      ".hk",
      ".ae",
      ".sa",
      ".qa",
      ".kw",
      ".bh",
      ".om",
      ".jo",
      ".lb",
      ".eg",
      ".ma",
      ".dz",
      ".tn",
      ".ke",
      ".ng",
      ".za",
      ".ug",
      ".gh",
      ".et",
      ".sd",
      ".ly",
      ".sy",
      ".iq",
      ".ir",
      ".af",
      ".pk",
      ".bd",
      ".lk",
      ".np",
      ".mm",
      ".kz",
      ".uz",
      ".tm",
      ".az",
      ".ge",
      ".am",
      ".tr",
      ".cy",
      ".md",
      ".ee",
      ".lv",
      ".lt",
      ".by",
      ".ua",
      ".mk",
      ".hr",
      ".ba",
      ".si",
      ".sk",
      ".bg",
      ".rs",
      ".me",
      ".al",
      ".is",
      ".fo",
      ".gl",
      ".gi",
      ".mt",
      ".lu",
      ".gg",
      ".je",
      ".im",
      ".fk",
      ".pn",
      ".cc",
      ".as",
      ".to",
      ".fm",
      ".mh",
      ".pw",
      ".tk",
      ".wf",
      ".nu",
      ".ms",
      ".sr",
      ".ss",
      ".bi",
      ".cv",
      ".dj",
      ".er",
      ".ga",
      ".gn",
      ".gw",
      ".lr",
      ".mg",
      ".ml",
      ".mr",
      ".mu",
      ".mw",
      ".mz",
      ".nc",
      ".ne",
      ".ng",
      ".re",
      ".rw",
      ".sc",
      ".sl",
      ".sn",
      ".so",
      ".st",
      ".td",
      ".tg",
      ".tz",
      ".ug",
      ".yt",
      ".vu",
      ".sz",
      ".ls",
      ".bw",
      ".zm",
      ".zw",
      ".cd",
      ".cg",
      ".cm",
      ".cf",
      ".ga",
      ".gq",
      ".gn",
      ".ml",
      ".mr",
      ".mu",
      ".mw",
      ".mz",
      ".ne",
      ".so",
      ".sd",
      ".sn",
      ".tg",
      ".td",
      ".bj",
      ".bf",
      ".cv",
      ".ci",
      ".gm",
      ".gh",
      ".gw",
      ".gn",
      ".lr",
      ".ne",
      ".ng",
      ".sh",
      ".st",
      ".sl",
      ".tg",
    ];
    let isValid = true;

    let emailInput = document.querySelector("#email-input");

    if (!email.includes("@")) {
      isValid = false;
      let validationMessage = "Invalid Email";
      emailInput.value = "";
      emailInput.placeholder = validationMessage;
      emailInput.classList.add(invalidClass);
    }

    let match = false;
    validDomains.forEach((domain) => {
      let provided_domain = "." + email.split(".").pop();
      if (provided_domain === domain) {
        match = true;
      }
    });

    if (!match) {
      isValid = false;
      let validationMessage = "Invalid Email";
      emailInput.value = "";
      emailInput.placeholder = validationMessage;
      emailInput.classList.add(invalidClass);
    }

    if (email.charAt(email.indexOf("@") + 1) === ".") {
      isValid = false;
      let validationMessage = "Invalid Email";
      emailInput.value = "";
      emailInput.placeholder = validationMessage;
      emailInput.classList.add(invalidClass);
    }

    if (isValid) emailInput.classList.remove(invalidClass);
    return isValid;
  }

  function validateMessage() {
    let isValid = true;
    let messageInput = document.querySelector("#message-input");
    if (messageInput.value.trim().length <= 1) {
      isValid = false;
      messageInput.placeholder = "Message Required";
      messageInput.classList.add(invalidClass);
    }
    if (isValid) messageInput.classList.remove(invalidClass);
    return isValid;
  }

  return (
    <>
      {/* POST Loader */}
      <div id="contact-loader-bg">
        <div id="contact-loader"></div>
      </div>
      <section id="contact-me-popup">
        {/* Mail image */}
        <div className="contact-me-header">
          <img className="mail-icon" src={mail3} alt="mail icon" />
          <h3 className="contact-header-text">Send Me a Message</h3>
          <button className="contact-exit-button" onClick={Hide}>
            <img src={theme === "light" ? exitLight : exitDark} alt="exit icon" />
          </button>
        </div>
        <input id="subject-input" className="contact-field" type="text" placeholder="Subject" />
        <input id="name-input" className="contact-field" type="text" placeholder="Your Name" />
        <input id="email-input" className="contact-field" type="email" placeholder="Your Email" />
        <textarea id="message-input" className="contact-message" name="message" placeholder="Message" cols="30" rows="10" resize="none"></textarea>
        <button className="send-email-button" onClick={Submit}>
          Send Message!
        </button>
      </section>
    </>
  );
}

export default ContactMe;
