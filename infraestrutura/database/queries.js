const conexao = require("./conexao");

//"parametros = ' '" pq em algumas consultas eu não passo parâmetros
const executaQuery = (query, parametros = " ") => {
  return new Promise((resolve, reject) => {
    conexao.query(query, parametros, (erros, resultados, campos) => {
      if (erros) {
        reject(erros);
      } else {
        resolve(resultados);
      }
    });
  });
};

module.exports = executaQuery;
