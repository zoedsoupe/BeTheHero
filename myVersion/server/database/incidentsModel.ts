import mongoose, { Schema, Document } from "mongoose";

interface Incident extends Document {
  title: String;
  description: String;
  value: number;
  ongId: string;
}

const incidentsSchema = new Schema({
  title: String,
  description: String,
  value: Number,
  ongId: String,
});

const Incidents = mongoose.model<Incident>("Incidents", incidentsSchema);

export default Incidents;
