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
  },

  async delete(Request, Response) {
    const { id } = Request.params;
    const ong_id = Request.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return Response.status(401).json({ error: "Operation not permitted" });
    }

    await connection("incidents")
      .where("id", id)
      .delete();

    return Response.status(204).send();
  }
};
