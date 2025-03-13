import React, { useState, useEffect } from 'react';
import './footer.css';
import FooterLogo from '../assets/Uthayam_Protein_Logo_PNG 1.png';
import Phone from '../assets/mingcute_phone-fill.png';
import Email from '../assets/fluent_mail-12-filled.png';
import Location from '../assets/typcn_location.png';
import YouTube from '../assets/mdi_youtube.png';
import FaceBook from '../assets/ic_baseline-facebook.png';
import Twitter from '../assets/prime_twitter.png';
import Instagram from '../assets/mdi_instagram.png';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* First Column - Get In Touch */}
        <div className="footer-section">
          <h2 className="footer-title">Get In {!isMobile && <br/>} Touch</h2>
        </div>

        {/* Second Column - Logo & Social Media */}
        <div className="footer-middle">
          <div className="logo-container">
            <img src={FooterLogo} alt="Uthayam Protein" className="footer-logo" />
          </div>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Facebook"> 
              <img src={FaceBook} alt="Facebook" />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <img src={Instagram} alt="Instagram" />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <img src={Twitter} alt="Twitter" />
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <img src={YouTube} alt="YouTube" />
            </a>
          </div>
        </div>

        {/* Third Column - Contact Info */}
        <div className="footer-section contact-section">
          <div className="contact-item">
            <i className="contact-icon">
              <img src={Phone} alt="Phone" />
            </i>
            <span>+91 97890 49093</span>
          </div>
          <div className="contact-item">
            <i className="contact-icon">
              <img src={Email} alt="Email" />
            </i>
            <span>info@uthayamprotein.com</span>
          </div>
          <div className="contact-item">
            <i className="contact-icon">
              <img src={Location} alt="Location" />
            </i>
            <span>443&445, Bharthi Nagar, Tiruchirappalli, Tamil Nadu 620017</span>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="copyright">
        <p>© {new Date().getFullYear()} - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;