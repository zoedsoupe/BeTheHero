import { randomBytes } from "crypto";

export default {
  generaUniqueId: () => {
    return randomBytes(4).toString("hex");
  },
};
