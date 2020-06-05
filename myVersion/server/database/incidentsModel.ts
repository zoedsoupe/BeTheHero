import mongoose, { Schema } from "mongoose";

const incidentsSchema = new Schema({
  title: String,
  description: String,
  value: Number,
});

const Incidents = mongoose.model("Incidents", incidentsSchema);

export default Incidents;
