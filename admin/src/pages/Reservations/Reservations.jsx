import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Reservations = ({ url }) => {
  const [reservationData, setReservationData] = useState([]);

  const fetchReservationData = async () => {
    try {
      const response = await axios.get(
        url + "/api/reservation/reservationSender"
      );
      const userReservations = response.data.data;
      setReservationData(userReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const deleteReservation = async (reservationId) => {
    try {
      const response = await axios.post(
        url + "/api/reservation/deleteReservation",
        { reservationId }
      );
      if (response.data.success) {
        toast.success("Reservation deleted successfully");
        fetchReservationData(); // Refetch the reservations
      } else {
        toast.error("Failed to delete reservation");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("An error occurred while deleting reservation");
    }
  };

  const updateReservationStatus = async (reservationId, status) => {
    try {
      const response = await axios.post(
        url + "/api/reservation/updatereservationstatus",
        { reservationId, status }
      );
      if (response.data.success) {
        toast.success("Status updated successfully");
        fetchReservationData(); // Refetch the reservations
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating status");
    }
  };

  useEffect(() => {
    fetchReservationData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin - Reservations List</h2>
      <div className="row">
        {reservationData.map((reservation) => (
          <div className="col-md-4 mb-4" key={reservation._id}>
            <div className={`card shadow-sm border-light position-relative`}>
              <div
                className={`card-header d-flex justify-content-between text-white ${
                  reservation.status === "Cancelled"
                    ? "bg-danger"
                    : reservation.status === "Confirmed"
                    ? "bg-success"
                    : "bg-primary"
                }`}
              >
                <h5 className="mb-0">Reservation ID: {reservation._id}</h5>
                {/* Top-right delete button */}
                <MdDelete
                  className="text-white cursor-pointer"
                  onClick={() => deleteReservation(reservation._id)}
                />
              </div>

              {reservation.reservationInfo.map((reservationInfo) => (
                <div className="card-body" key={reservationInfo._id}>
                  <h6 className="card-title">{reservationInfo.name}</h6>
                  <p className="card-text">
                    <strong>Email:</strong> {reservationInfo.email}
                  </p>
                  <p className="card-text">
                    <strong>Contact:</strong> {reservationInfo.contact}
                  </p>
                  <p className="card-text">
                    <strong>No. of Guests:</strong> {reservationInfo.noOfGuests}
                  </p>
                  <p className="card-text">
                    <strong>Occasion:</strong> {reservationInfo.occasion}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {reservationInfo.date}
                  </p>
                  <p className="card-text">
                    <strong>Time:</strong> {reservationInfo.time}
                  </p>
                </div>
              ))}

              <div className="d-flex justify-content-between bg-light text-center p-3">
                <select
                  value={reservation.status}
                  onChange={(e) =>
                    updateReservationStatus(reservation._id, e.target.value)
                  }
                  className="form-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
