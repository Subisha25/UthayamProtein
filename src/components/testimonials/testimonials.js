// import React, { useState } from "react";
// import "../testimonials/testimonials.css"; // Ensure correct CSS file

// import { BsArrowLeft } from "react-icons/bs";
// import { BsArrowRight } from "react-icons/bs";


// const testimonials = [
//   {
//     name: "Sivakumar",
//     location: "Kalmandabam",
//     review:
//       "I bought meat at their shop. And I saw they provide meat with honesty and their meat totally comes from their own farm in a natural and organic way.",
//   },
//   {
//     name: "Manikandan",
//     location: "Salaipudur",
//     review:
//       "Their market price is less than any other shop in the market when I visit the market and they give meat in a very hygienic and fresh environment.",
//   },
//   {
//     name: "Thillaikumar",
//     location: "Trichy",
//     review:
//       "I bought meat at their shop. And I saw they provide meat with honesty and their meat totally comes from their own farm in a natural and organic way.",
//   },
//   {
//     name: "Arun",
//     location: "Madurai",
//     review:
//       "Their customer service is excellent, and the quality of the meat is outstanding. Highly recommended!",
//   },
//   {
//     name: "Vignesh",
//     location: "Coimbatore",
//     review:
//       "I love how fresh and hygienic their products are. Best place to buy organic meat!",
//   },
//   {
//     name: "Karthik",
//     location: "Chennai",
//     review:
//       "Best meat shop in the city! The meat is fresh and the staff is very friendly.",
//   },
// ];

// const Testimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const visibleCards = 4;

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex + visibleCards >= testimonials.length ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? testimonials.length - visibleCards : prevIndex - 1
//     );
//   };

//   return (
//     <div className="testimonials">
//       {/* Title Section */}
//       <div className="testimonials-header">
//         <div>
//           <h4 className="testimonials-title">TESTIMONIALS</h4>
//           <h2 className="testimonials-heading">Why People Believe in Us!</h2>
//         </div>
//         {/* Arrows Positioned on the Right */}
//         <div className="arrows-container">
//           <button className="arrow left" onClick={prevSlide}>
//           <BsArrowLeft />
//           </button>
//           <button className="arrow right" onClick={nextSlide}>
//           <BsArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* Testimonial Cards */}
//       <div className="testimonials-slider">
//         <div className="testimonial-container">
//           {testimonials
//             .slice(currentIndex, currentIndex + visibleCards)
//             .map((testimonial, index) => (
//               <div key={index} className="testimonial-card">
//                 <p className="testimonial-text">{testimonial.review}</p>
//                 <div className="testimonial-info">
//                   <div className="avatar"></div>
//                   <div>
//                     <h4 className="testimonial-name">{testimonial.name}</h4>
//                     <p className="testimonial-location">{testimonial.location}</p>
//                   </div>
//                 </div>
//                 <div className="stars">★★★★★</div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;



import React, { useState } from "react";
import "../testimonials/testimonials.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Footer from "../footer/footer";

const testimonials = [
  { name: "Sivakumar", location: "Kalmandabam", image:"https://filestore.community.support.microsoft.com/api/profileimages/02b5e7d4-a569-4182-a312-60e83ad68a91", review: "I bought meat at their shop. And I saw they provide meat with honesty and their meat totally comes from their own farm in a natural and organic way." },
  { name: "Manikandan", location: "Salaipudur", image:"https://filestore.community.support.microsoft.com/api/profileimages/02b5e7d4-a569-4182-a312-60e83ad68a91", review: "Their market price is less than any other shop in the market when I visit the market and they give meat in a very hygienic and fresh environment." },
  { name: "Thillaikumar", location: "Trichy", image:"https://filestore.community.support.microsoft.com/api/profileimages/02b5e7d4-a569-4182-a312-60e83ad68a91", review: "I bought meat at their shop. And I saw they provide meat with honesty and their meat totally comes from their own farm in a natural and organic way." },
  { name: "Arun", location: "Madurai", image:"https://filestore.community.support.microsoft.com/api/profileimages/02b5e7d4-a569-4182-a312-60e83ad68a91", review: "Their customer service is excellent, and the quality of the meat is outstanding. Highly recommended!" },
  { name: "Vignesh", location: "Coimbatore", image:"https://filestore.community.support.microsoft.com/api/profileimages/02b5e7d4-a569-4182-a312-60e83ad68a91", review: "I love how fresh and hygienic their products are. Best place to buy organic meat!" },
  { name: "Karthik", location: "Chennai", image:"https://filestore.community.support.microsoft.com/api/profileimages/02b5e7d4-a569-4182-a312-60e83ad68a91", review: "Best meat shop in the city! The meat is fresh and the staff is very friendly." },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3; // Full + Partial visibility

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length - (visibleCards - 1) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - visibleCards : prevIndex - 1
    );
  };

  return (
    <>
    <div className="testimonials">
      {/* Title Section */}
      <div className="testimonials-header">
        <div>
          <h4 className="testimonials-title">TESTIMONIALS</h4>
          <h2 className="testimonials-heading">Why People Believe in Us!</h2>
        </div>
        {/* Arrows */}
        <div className="arrows-container">
          <button className="arrow left" onClick={prevSlide}>
            <BsArrowLeft />
          </button>
          <button className="arrow right" onClick={nextSlide}>
            <BsArrowRight />
          </button>
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="testimonials-slider">
        <div
          className="testimonial-container"
          style={{ transform: `translateX(-${currentIndex * 360}px)` }} // Moves left per card
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">{testimonial.review}</p>
              <div className="testimonial-info">
 

  {/* Name, Stars, Location (Right Side) */}
  <div className="testimonial-details">
    <div className="stars">★★★★★</div>
    <h4 className="testimonial-name">{testimonial.name}</h4>
    <p className="testimonial-location">{testimonial.location}</p>
  </div>
   {/* Avatar (Left Side) */}
   <div
    className="avatar"
    style={{ backgroundImage: `url(${testimonial.image})` }}
  ></div></div>

            </div>
          ))}
        </div>
      </div>
       {/* Arrows */}
       <div className="arrows-container2">
          <button className="arrow left" onClick={prevSlide}>
            <BsArrowLeft />
          </button>
          <button className="arrow right" onClick={nextSlide}>
            <BsArrowRight />
          </button>
        </div>
    </div>
    <Footer/>
    </>
  );
};

export default Testimonials;
