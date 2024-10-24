import reservationModel from "../models/reservationModel.js";

const addReservation = async (req, res) => {
  try {
    const newReservation = new reservationModel({
      userId: req.body.userId,
      reservationInfo: req.body.reservationInfo,
    });
    await newReservation.save();

    res.json({ success: true, message: "Reservation created" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error : Reservation not created" });
  }
};

const listReservationsForUser = async (req, res) => {
  try {
    const reservations = await reservationModel.find({
      userId: req.body.userId,
    });
    res.json({ success: true, data: reservations });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
const listReservations = async (req, res) => {
  try {
    const reservations = await reservationModel.find({});
    res.json({ success: true, data: reservations });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateReservationStatus = async (req, res) => {
  try {
    await reservationModel.findByIdAndUpdate(req.body.reservationId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.body;

    // Find the reservation by ID and delete it
    await reservationModel.findByIdAndDelete(reservationId);

    res.json({ success: true, message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.json({
      success: false,
      message: "Error: Could not delete reservation",
    });
  }
};

export {
  addReservation,
  listReservations,
  listReservationsForUser,
  updateReservationStatus,
  deleteReservation,
};
