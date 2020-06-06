import { randomBytes } from "crypto";

const generaUniqueId = () => {
  return randomBytes(4).toString("hex");
};

export default generaUniqueId
