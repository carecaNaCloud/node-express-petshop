const Atendimento = require("./../models/Atendimento");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimento.lista(res);
  });

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Atendimento.buscarPorId(res, id);
  });

  app.post("/atendimentos", (req, res) => {
    const novoAtendimento = req.body;
    Atendimento.adiciona(novoAtendimento, res);
  });

  app.patch("/atendimentos/:id", (req, response) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    Atendimento.altera(id, values, response);
  });

  app.delete(
    ("/atendimentos/:id",
    (request, response) => {
      const id = parseInt(request.params.id);
      Atendimento.delete(id, response);
    })
  );
};
