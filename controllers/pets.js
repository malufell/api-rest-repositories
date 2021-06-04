const Pet = require("../models/Pet");

module.exports = (app) => {

  app.post("/pet", (req, resp) => {
    const pet = req.body;
    console.log(Pet.adiciona(pet))


    Pet.adiciona(pet).then((resultados) => resp.status(201).json(resultados))
      .catch((erros) => resp.status(400).json(erros));


  });
};
