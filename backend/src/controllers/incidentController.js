const connection = require("../database/connection");

module.exports = {
  async index(Request, Response) {
    const incidents = await connection("incidents").select("*");

    return Response.json(incidents);
  },
  async create(Request, Response) {
    const { title, description, value } = Request.body;

    const ong_id = Request.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return Response.json({ id });
  }
};
