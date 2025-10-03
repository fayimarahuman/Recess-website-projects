import React, { useState } from "react";
import { api } from "../api/client";
import "../styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/inquiry/create", form); // Send message to backend
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" }); // Reset form
    } catch (err) {
      console.error("Error sending message", err);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <div className="contact-info">
        <div className="map">
          <iframe
            title="Caroline Ways Ltd Location"
            src="https://www.google.com/maps?q=Market+Street+Energy+Center+H1-44+Kampala+Uganda&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="details">
          <p><strong>Address:</strong> Caroline Ways Limited, Market Street Energy Center H1-44, P.O. Box 4143, Kampala, Uganda</p>
          <p><strong>Phone:</strong> 0774433927, 0754433927, 0752950250, 0707280933</p>
          <p><strong>Email:</strong> info@carolineways.com</p>
          <p><strong>Note:</strong> <em>Goods once sold are not returnable.</em></p>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Send Us a Message</h3>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        ></textarea>
        <button type="submit">Send Message</button>
        {status && <p className="contact-status">{status}</p>}
      </form>
    </div>
  );
};

export default Contact;