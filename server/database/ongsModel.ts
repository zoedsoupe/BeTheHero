import mongoose, { Schema, Document } from "mongoose";

import { Incident } from "../database/incidentsModel";

interface Ong extends Document {
  id: string;
  name: string;
  email: string;
  wpp: string;
  city: string;
  uf: string;
  incidents?: Incident[];
}

const ongSchema = new Schema({
  id: String,
  name: String,
  email: String,
  wpp: String,
  city: String,
  uf: String,
  incidents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incidents",
    },
  ],
});

const Ong = mongoose.model<Ong>("Ong", ongSchema);

export default Ong;
