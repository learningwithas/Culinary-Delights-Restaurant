// ReservationForm.js
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReservationForm.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReservationForm = () => {
  let { url, token } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    noOfGuests: "",
    occasion: "",
    date: "",
    time: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let reservationData = {
      reservationInfo: data,
    };

    console.log("token : " + token);
    console.log(reservationData);
    try {
      const response = await axios.post(
        url + "/api/reservation/addReservation",
        reservationData,
        { headers: { token } }
      );

      console.log("API Response:", response.data); // Log the response

      if (response.data.success) {
        toast.success("Reservation added successfully");

        // Reset form fields after successful submission
        setData({
          name: "",
          email: "",
          contact: "",
          noOfGuests: "",
          occasion: "",
          date: "",
          time: "",
        });
      } else {
        toast.error("Error: Reservation not added");
      }
    } catch (error) {
      toast.error("Error: Reservation not added");
      // console.error("Reservation Error:", error);
    }
  };

  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/login");
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="container mt-5 main-box-container" id="reservation-form">
      <h2>Restaurant Reservation</h2>
      <div className="res-form">
        <form onSubmit={handleSubmit}>
          <div className="grid-container">
            <div className="mb-3">
              <label className="form-label">Occasion</label>
              <select
                className="form-select"
                name="occasion"
                value={data.occasion}
                onChange={onChangeHandler}
                required
              >
                <option value="">Select an Occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Wedding">Wedding</option>
                <option value="Business Meeting">Business Meeting</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Number of Guests</label>
              <input
                type="number"
                className="form-control"
                name="noOfGuests"
                value={data.noOfGuests}
                onChange={onChangeHandler}
                min="1"
                required
              />
            </div>
          </div>

          <div className="grid-container">
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={data.date}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={data.time}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="grid-container">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="tel"
                className="form-control"
                name="contact"
                value={data.contact}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>
          {token ? (
            <button type="submit" className="btn btn-primary btn-color">
              Reserve
            </button>
          ) : (
            <div className="text-center mb-4 ifNoLogin">
              Reserve Button will Appear when you Login to your Account. Thanks
            </div>
          )}
          {/* <button type="submit" className="btn btn-primary btn-color">
            Reserve
          </button> */}
        </form>

        <div className="res-img">
          <img
            src="https://images.unsplash.com/photo-1503591099259-a96e250e0a67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
