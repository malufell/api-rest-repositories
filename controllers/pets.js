const Pet = require('../models/Pet')

module.exports = (app) => {
  app.post("/pet", (req, resp) => {
    const pet = req.body;

    Pet.adiciona(pet, resp);
  });
};
