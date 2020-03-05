import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer bg-dark">
      <ul className="contact">
        <li className="website">
          <a
            href="http://sammysamkough.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faDesktop} size="lg" color="white" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
