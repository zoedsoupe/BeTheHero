import { connect } from "mongoose";

const mongoUri = process.env.MONGO_URI || "mongo://localhost/goBarber";

connect(mongoUri, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(`${err.name}: ${err.message}`));
