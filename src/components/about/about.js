import React from "react";
import "./about.css";
import meatImage2 from "../assets/Hocus Pocus Img-1 2.png"; // Replace with actual image path
import meatImage1 from "../assets/Hocus Pocus Img-1 1.png"; // Replace with actual image path
import Tick from '../assets/Group (1).png';
import Injuct from '../assets/Vector (3).png';
import Leaf from '../assets/Vector (4).png';
const About = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="text-content">
          <p className="sub-title">ORGANIC CHICKEN MEAT</p>
          <h1 className="main-title2">
            From our <br />
            <span>Farm to Your Home</span>
          </h1>
          <p className="description">
            We provide well-shaped fresh and organic meat from our farm in a
            very hygienic way.
          </p>

          <div className="features">
            <div className="feature-item">
              <img src={Tick} alt="" className="aboutimg"/> <br/> 
              <span className="abouticon">100% Fresh</span>
            </div>
            <div className="feature-item">
              <img src={Injuct} alt="" className="aboutimg"/><br/>
              <span className="abouticon">Hormone Free</span> 
            </div>
            <div className="feature-item">
            <img src={Leaf} alt="" className="aboutimg" /><br/>
              <span className="abouticon"> Natural</span>
            </div>
          </div>

          <button className="book-btn">
            Book Now <span>→</span>
          </button>
        </div>

        <div className="image-content">
          <img src={meatImage1} alt="Meat Cutting" className="main-image" />
          <img src={meatImage2} alt="Fresh Meat" className="overlay-image" />
        </div>
      </div>
    </section>
  );
};

export default About;
