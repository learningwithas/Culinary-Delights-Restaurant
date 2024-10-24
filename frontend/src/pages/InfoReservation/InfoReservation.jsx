import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InfoReservation.css";
import { toast } from "react-toastify";

const InfoReservation = () => {
  const { url, token } = useContext(StoreContext);
  const [reservationData, setReservationData] = useState([]);

  const fetchReservationData = async () => {
    const response = await axios.post(
      url + "/api/reservation/listReservations",
      {},
      { headers: { token } }
    );
    console.log(response.data.data);
    const userReservations = response.data.data;
    setReservationData(userReservations);
  };

  const reservationStatusChange = async (reservationId, status) => {
    try {
      const response = await axios.post(
        url + "/api/reservation/updatereservationstatus",
        { reservationId, status },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Reservation status updated!");
        // Refetch the reservations to reflect the change
        fetchReservationData();
      } else {
        toast.error("Failed to update reservation status");
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      toast.error("An error occurred while updating status.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchReservationData();
      console.log(reservationData);
    }
  }, [token]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Reservations</h2>
      <div className="row justify-content-center">
        {reservationData.length > 0 ? (
          reservationData.map((reservation, index) => {
            return (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm">
                  {/* Dynamically changing background color based on status */}
                  <div
                    className={`card-header text-white ${
                      reservation.status === "Cancelled"
                        ? "bg-danger"
                        : reservation.status === "Confirmed"
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                  >
                    Reservation ID: {reservation._id}
                  </div>
                  <div className="card-body">
                    {reservation.reservationInfo.map((info, idx) => (
                      <div key={idx}>
                        <p>
                          <strong>Name:</strong> {info.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {info.email}
                        </p>
                        <p>
                          <strong>Contact:</strong> {info.contact}
                        </p>
                        <p>
                          <strong>Occasion:</strong> {info.occasion}
                        </p>
                        <p>
                          <strong>No. of Guests:</strong> {info.noOfGuests}
                        </p>
                        <p>
                          <strong>Date:</strong> {info.date}
                        </p>
                        <p>
                          <strong>Time:</strong> {info.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Status display with dynamic background color */}
                  <div
                    className={`card-header text-white ${
                      reservation.status === "Cancelled"
                        ? "bg-danger"
                        : reservation.status === "Confirmed"
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                  >
                    Reservation Status: {reservation.status}
                  </div>
                  <div className="card-footer text-center">
                    {reservation.status === "Pending" ||
                    reservation.status === "Confirmed" ? (
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          reservationStatusChange(reservation._id, "Cancelled")
                        }
                      >
                        Cancel
                      </button>
                    ) : reservation.status === "Cancelled" ? (
                      <div className="cancel-reservation">
                        This Reservation is Cancelled
                      </div>
                    ) : (
                      <div className="confirm-reservation">
                        This Reservation is Confirmed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center">
            <p>No reservations found for this user.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoReservation;
