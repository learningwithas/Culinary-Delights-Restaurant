import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  reservationInfo: { type: Array, required: true },
  status: { type: String, default: "Pending" },
});
const reservationModel =
  mongoose.models.reservation ||
  mongoose.model("reservation", reservationSchema);
export default reservationModel;
