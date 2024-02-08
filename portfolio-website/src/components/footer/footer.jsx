import React from "react";
import { useEffect } from "react";
import "./footer.css";

function Footer() {
  useEffect(() => {}, []);

  return (
    <footer id="footer">
      <p className="copyright">© 2024 Sean Brill</p>
      <p className="thanks">Thanks for checking out my portfolio site 👋🏼</p>
      <section id="contact" className="contact">
        <p className="get-in-touch">Want to get in touch?</p>
        <a className="email" href="mailto:seanbrill54@gmail.com">
          seanbrill54@gmail.com
        </a>
        <a className="phone" href="tel:215-275-8617">
          (215)-275-8617
        </a>
      </section>
    </footer>
  );
}

export default Footer;
