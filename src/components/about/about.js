import React, { useEffect, useState } from "react";
import "./about.css";
import meatImage2 from "../assets/Hocus Pocus Img-1 2.png"; // Replace with actual image path
import meatImage1 from "../assets/Hocus Pocus Img-1 1.png"; // Replace with actual image path
import Tick from '../assets/Group (1).png';
import Injuct from '../assets/Vector (3).png';
import Leaf from '../assets/Vector (4).png';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const About = () => {
  const navigate = useNavigate();
  const [aboutImage1, setAboutImage1] = useState(null);
  const [aboutImage2, setAboutImage2] = useState(null);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/images");
  
        const img1 = res.data.find(item => item.title.toLowerCase() === "about image1");
        const img2 = res.data.find(item => item.title.toLowerCase() === "about image2");
  
        setAboutImage1(img1);
        setAboutImage2(img2);
      } catch (err) {
        console.error("Error fetching about images:", err);
      }
    };
  
    fetchImages();
  }, []);

  
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

          <button className="book-btn"  onClick={() => navigate("/all")}>
            Book Now <span>→</span>
          </button>
        </div>

        <div className="image-content">

        {aboutImage1 && (
  <img
    src={`http://localhost:5000/uploads/${aboutImage1.image}`}
    alt={aboutImage1.title}
     className="main-image"
  />
)}

{aboutImage2 && (
  <img
    src={`http://localhost:5000/uploads/${aboutImage2.image}`}
    alt={aboutImage2.title}
     className="overlay-image"
  />
)}

          {/* <img src={meatImage1} alt="Meat Cutting" className="main-image" />
          <img src={meatImage2} alt="Fresh Meat" className="overlay-image" /> */}
        </div>
      </div>
    </section>
  );
};

export default About;
