const Atendimento = require("../models/Atendimento");

module.exports = (app) => {
  app.get("/atendimentos", (req, resp) => {
    Atendimento.lista()
      .then((resultados) => resp.status(201).json(resultados))
      .catch((erros) => resp.status(400).json(erros));
  });

  app.get("/atendimentos/:id", (req, resp) => {
    const id = parseInt(req.params.id);
    Atendimento.buscaPorId(id)
      .then((resultados) => resp.status(201).json(resultados))
      .catch((erros) => resp.status(400).json(erros));
  });

  app.post("/atendimentos", (req, resp) => {
    const atendimento = req.body;
    Atendimento.adiciona(atendimento)
      .then((resultados) => resp.status(201).json(resultados))
      .catch((erros) => resp.status(400).json(erros));
  });

  app.patch("/atendimentos/:id", (req, resp) => {
    const id = parseInt(req.params.id);
    const novosDados = req.body;
    Atendimento.altera(novosDados, id)
      .then((atendimentoAlterado) => resp.status(201).json(atendimentoAlterado))
      .catch((erros) => resp.status(400).json(erros));
  });

  app.delete("/atendimentos/:id", (req, resp) => {
    const id = parseInt(req.params.id);
    Atendimento.deleta(id)
      .then((resultados) => resp.status(201).json(resultados))
      .catch((erros) => resp.status(400).json(erros));
  });
};
