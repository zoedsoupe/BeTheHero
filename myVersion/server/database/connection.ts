import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI || "mongodb://localhost/BeTheHero";

mongoose.connect(mongoUri, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
