import mongoose, { Schema } from "mongoose";

const ongSchema = new Schema({
  id: String,
  name: String,
  email: String,
  wpp: String,
  city: String,
  uf: String,
  incidents: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incidents"
  }
});

const Ong = mongoose.model("Ong", ongSchema);

export default Ong;
