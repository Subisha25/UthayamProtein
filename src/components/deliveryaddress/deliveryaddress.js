import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import location_icon from "./images/duo-icons_location.png";
import contact_icon from "./images/Vector.png";
import "./deliveryAddress.css";

const DeliveryAddress = () => {
  const navigate = useNavigate();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const customerId = localStorage.getItem("customerId");
      const payload = { ...data };
      if (customerId) payload.customerId = customerId;
  
      const response = await fetch("http://localhost:5000/api/delivery-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (!customerId && result.customerId) {
        localStorage.setItem("customerId", result.customerId);
      }
  
      alert("Address saved successfully!");
      navigate("/selectaddress");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    }
  };
  

  // const onSubmit = (data) => {
  //   console.log("Saving to localStorage:", data);
    
  //   // get previous addresses
  //   const storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
  
  //   // add new address
  //   const updatedAddresses = [...storedAddresses, data];
  
  //   // save back to localStorage
  //   localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  
  //   alert("Address saved successfully!");
  //   navigate("/cart"); // or navigate("/selectaddress") based on your flow
  // };
  

  // const onSubmit = async (data) => {
  //   console.log("Sending Data:", data); // Debugging

  //   try {
  //     const response = await fetch("http://localhost:5000/api/delivery-address", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
    
  //     const result = await response.json();
  //     console.log("Full API response:", result); // Log the complete response
    
  //     if (response.ok) {
  //       alert("Address saved successfully!");
  //       navigate("/cart");
  //     } else {
  //       console.error("Error details:", result); // Log error details
  //       alert(result.message || "Something went wrong!");
  //     }
  //   } catch (error) {
  //     console.error("Error saving address:", error);
  //     alert("Failed to save address. Please try again.");
  //   }


  //   // try {
  //   //   const response = await fetch("http://localhost:5000/api/delivery-address", {
  //   //     method: "POST",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     body: JSON.stringify(data),
       
  //   //   });

  //   //   const result = await response.json();

  //   //   if (response.ok) {
  //   //     alert("Address saved successfully!");
  //   //     navigate("/cart");
  //   //   } else {
  //   //     alert(result.message || "Something went wrong!");
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error saving address:", error);
  //   //   alert("Failed to save address. Please try again.");
  //   // }
  // };

  const handleLogout = () => {
    localStorage.removeItem("customerId");
    alert("Logged out successfully!");
    navigate("/"); // or any page you want to redirect to after logout
  };
  

  return (
    <div className="cart-container">

      {/* <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button> */}
     
      <div className="container">
        <header className="cart-header">
          <span className="back-arrow" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </span>
          <p>Add Delivery Address</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section">
            <div className="address">
              <img src={location_icon} alt="location_icon" className="location-img" />
              Address Details
            </div>
            <button type="button" className="location-btn">
              <span className="icon">
                <MdMyLocation />
              </span>
              Use My Location
            </button>

            <div className="input-field">
              <input type="text" placeholder="HOUSE NO / FLAT NO / BUILDING NAME" {...register("house", { required: "This field is required" })} />
              {errors.house && <p className="error">{errors.house.message}</p>}

              <input type="text" placeholder="AREA / ROAD / COLONY NAME" {...register("area", { required: "This field is required" })} />
              {errors.area && <p className="error">{errors.area.message}</p>}

              <input
                type="text"
                placeholder="PINCODE"
                {...register("pincode", {
                  required: "This field is required",
                  pattern: { value: /^[0-9]{6}$/, message: "Enter a valid 6-digit Pincode" },
                })}
                inputMode="numeric"
              />
              {errors.pincode && <p className="error">{errors.pincode.message}</p>}

              <div className="city-state">
                <div className="input-container">
                  <input type="text" placeholder="CITY" {...register("city", { required: "This field is required" })} />
                  {errors.city && <p className="error">{errors.city.message}</p>}
                </div>

                <div className="input-container">
                  <input type="text" placeholder="STATE" {...register("state", { required: "This field is required" })} />
                  {errors.state && <p className="error">{errors.state.message}</p>}
                </div>
              </div>

              <input type="text" placeholder="LANDMARK" {...register("landmark", { required: "This field is required" })} />
              {errors.landmark && <p className="error">{errors.landmark.message}</p>}
            </div>
          </div>

          <div className="section-contact">
            <div className="section-title">
              <img src={contact_icon} alt="contact_icon" className="contact_icon" />
              Contact Person
            </div>

            <input type="text" placeholder="NAME" {...register("name", { required: "This field is required" })} />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <input
              type="text"
              placeholder="PHONE NUMBER"
              {...register("phone", {
                required: "This field is required",
                pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" },
              })}
              inputMode="numeric"
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          <button type="submit" className="save-btn">
            SAVE DELIVERY ADDRESS AND CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryAddress;
