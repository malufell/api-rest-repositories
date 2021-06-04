const uploadDeArquivo = require("../infraestrutura/arquivos/upload");
const repositorio = require("../repositories/pet");

class Pet {
  adiciona(pet) {
    return new Promise((resolve, reject) => {
      uploadDeArquivo(pet.nome, pet.imagem, (erro, novoCaminho) => {
        if (erro) {
          reject(erro);
        } else {
          pet.imagem = novoCaminho;
          return repositorio.adiciona(pet).then((resultados) => {
            resolve(resultados);
          });
        }
      });
    });
  }
}
module.exports = new Pet();
