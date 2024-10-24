import express from "express";
import {
  addReservation,
  deleteReservation,
  listReservations,
  listReservationsForUser,
  updateReservationStatus,
} from "../controllers/reservationController.js";
import authMiddleware from "../middleware/auth.js";

const reservationRoute = express.Router();

reservationRoute.post("/addReservation", authMiddleware, addReservation);
reservationRoute.post(
  "/listReservations",
  authMiddleware,
  listReservationsForUser
);
reservationRoute.get("/reservationSender", listReservations);
reservationRoute.post(
  "/updatereservationstatus",

  updateReservationStatus
);
reservationRoute.post("/deleteReservation", deleteReservation);

export default reservationRoute;
