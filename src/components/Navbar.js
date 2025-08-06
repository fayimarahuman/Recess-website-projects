import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaWhatsapp, FaPhone, FaSms } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const phone = "256753670268";

  // Optional: customize the WhatsApp message for the navbar (generic)
  const whatsAppMessage = "Hello, I'm interested in your products.";

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/logo.JPG" alt="Caroline Ways Ltd" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><NavLink to="/" exact="true">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/faq">FAQ</NavLink></li>
        <li><NavLink to="/privacypolicy">Privacy</NavLink></li>

        {/* Contact Actions (no email) */}
        <li>
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(whatsAppMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp className="icon-contact" />
          </a>
        </li>
        <li>
          <a href={`sms:+${phone}`} title="Send SMS">
            <FaSms className="icon-contact" />
          </a>
        </li>
        <li>
          <a href={`tel:+${phone}`} title="Call Now">
            <FaPhone className="icon-contact" />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
