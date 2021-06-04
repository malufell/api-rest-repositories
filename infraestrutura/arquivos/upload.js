const fs = require("fs");
const path = require("path");

module.exports = (nomeDoArquivo, caminho, callbackImagemCriada) => {
  const extensoesValidas = ["jpg", "png", "jpeg"];

  //identifica a extensão do arquivo com o path
  const extensaoArquivo = path.extname(caminho);

  //substring é pra desconsiderar o '.' da busca que tem no nome da extensão
  //indexOf retorna a posição do array que o item está. se não localizar nada, retorna '-1'
  //se o retorno de indexOf for diferente de -1, extensaoEhValida será true
  const extensaoEhValida = extensoesValidas.indexOf(extensaoArquivo.substring(1)) !== -1;

  if (extensaoEhValida) {
    const novoCaminho = `assets/imagens/${nomeDoArquivo}${extensaoArquivo}`;
    fs.createReadStream(caminho)
      .pipe(fs.createWriteStream(novoCaminho))
      .on("finish", () => callbackImagemCriada(false, novoCaminho)); //false é pq não tem erro
  } else {
    const erro = "A extensão do arquivo é inválida!";
    console.log(erro);
    callbackImagemCriada(erro);
  }
};
