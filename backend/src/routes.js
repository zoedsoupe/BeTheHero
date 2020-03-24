const express = require("express");

const routes = express.Router();

routes.post("/users", (Request, Response) => {
  const body = Request.body;

  console.log(body);

  return Response.json({
    evento: "Semana OmniStack 11",
    aluno: "Cleiton Souza"
  });
});

module.exports = routes;
