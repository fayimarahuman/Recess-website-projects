import React from 'react';
import '../styles/About.css';
import Diffusers from '../assets/diffusers.jpg';
import Bulb from '../assets/lighting bulb10.jpg';
import FloorLamp from '../assets/floor lamp23.jpg';
import about from '../assets/c5.jpg';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Caroline Ways Ltd</h1>
        <p>
          Caroline Ways Ltd is a leading Ugandan retailer and wholesaler specializing in high-quality electrical products. 
          Since our founding in 2019, we have committed ourselves to delivering reliable, affordable, and innovative electrical solutions 
          that empower homes, businesses, and contractors across Uganda.
        </p>
      </section>

      <section style={aboutSection}>
        <h2 style={sectionTitle}>Why Choose Us?</h2>
        <p style={sectionText}>
          At Caroline Ways, we bring you premium lighting solutions tailored to modern living spaces. From stunning chandeliers to elegant wall lights, our collections combine style, functionality, and energy efficiency.
        </p>
      </section>

      <section style={gridSection}>
        <div style={gridItem}>
          <img src={FloorLamp} alt="Modern Design" style={gridImage} />
          <h3 style={gridTitle}>Modern Designs</h3>
          <p style={gridText}>Sophisticated lighting styles crafted for contemporary interiors.</p>
        </div>
        <div style={gridItem}>
          <img src={Bulb} alt="Eco Friendly" style={gridImage} />
          <h3 style={gridTitle}>Eco-Friendly</h3>
          <p style={gridText}>Energy-saving bulbs and sustainable materials used in every piece.</p>
        </div>
        <div style={gridItem}>
          <img src={Diffusers} alt="Excellent Scents" style={gridImage} />
          <h3 style={gridTitle}>Excellent Scents</h3>
          <p style={gridText}>Transform your space with our premium fragrance diffusers.</p>
        </div>
      </section>


      <section className="about-content">
        <h2>Our Story</h2>
        <p>
          Founded with a vision to bridge the gap between quality electrical supplies and affordability, Caroline Ways Ltd has grown steadily 
          to become a trusted supplier known for exceptional customer service and product reliability. Our journey started from a small shop 
          at Energy Center, Kampala, and today we serve a diverse clientele ranging from individual homeowners to large-scale commercial clients.
        </p>
        <p>
          At the core of our operations lies a dedication to sourcing the best products from reputable manufacturers and offering a wide range 
          of lighting accessories, electrical parts, and fragrance diffusers — all tailored to meet the unique needs of our customers.
        </p>

        <h2>Our Vision</h2>
        <p>
          To be the foremost provider of innovative and sustainable electrical solutions in Uganda, recognized for exceptional quality, customer satisfaction, and community impact.
        </p>

        <h2>Our Mission</h2>
        <p>
          To supply reliable and affordable electrical products that enhance the safety, comfort, and efficiency of homes and businesses, while fostering lasting relationships with our customers and partners through trust and excellence.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>High-quality LED lights and lamps that blend functionality with aesthetics</li>
          <li>Durable parts and spares to keep your electrical installations running smoothly</li>
          <li>Innovative fragrance diffusers to enhance your living and working spaces</li>
          <li>Exceptional customer support that guides you through every purchase</li>
        </ul>

        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/images/products/CEO.jpg" alt="Nakalya Caroline." />
            <h3>Nakalya Caroline</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="/images/products/confident-business-woman-portrait-smiling-face.jpg" alt="James K." />
            <h3>Justin K.</h3>
            <p>Head of Operations</p>
          </div>
          <div className="team-member">
            <img src="/images/products/person.avif" alt="Emma T." />
            <h3>Emma T.</h3>
            <p>Customer Relations Manager</p>
          </div>
          <div className="team-member">
            <img src="/images/products/person2.avif" alt="Michael B." />
            <h3>Michael B.</h3>
            <p>Product Specialist</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const aboutSection = {
  backgroundImage: `url(${about})`,
  padding: '4rem 2rem',
  textAlign: 'center',
  backgroundColor: '#f4f4f4ff',
};

const sectionTitle = { fontSize: '2rem', marginBottom: '1rem', color: '#FF7F00' };
const sectionText = { fontSize: '1rem', color: '#ece6e6ff', maxWidth: '700px', margin: '0 auto' };
const gridSection = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
  gap: '2rem',
  padding: '3rem 2rem',
  backgroundColor: '#f6f6f6'
};

const gridItem = {
  backgroundColor: '#fff',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
  padding: '1.5rem'
};

const gridImage = { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px' };
const gridTitle = { color: '#FF7F00', marginTop: '1rem' };
const gridText = { color: '#333', fontSize: '0.95rem' };
export default About;
