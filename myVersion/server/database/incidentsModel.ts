import mongoose, { Schema, Document } from "mongoose";

interface Incident extends Document {
  title: String;
  description: String;
  value: number;
}

const incidentsSchema = new Schema({
  title: String,
  description: String,
  value: Number,
});

const Incidents = mongoose.model<Incident>("Incidents", incidentsSchema);

export default Incidents;
