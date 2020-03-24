const connection = require("../database/connection");

module.exports = {
  async create(Request, Response) {
    const { title, description, value } = Request.body;
  }
};
