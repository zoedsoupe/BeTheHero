import mongoose, { Schema, Document } from "mongoose";

export interface Incident extends Document {
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

export const IncidentsModel = mongoose.model<Incident>("Incidents", incidentsSchema);
