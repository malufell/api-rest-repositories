class Tabelas {
  //init é o método que vai inicializar e permitir trabalhar com essa classe(?)
  init(conexao) {
    this.conexao = conexao;

    //chama o método que cria a tabela
    this.criarAtendimento();
    this.criarPets();
  }

  //método com a criação da tabela. o .query espera um comando do SQL e depois uma função com o que será executado quando a consulta for realizada
  criarAtendimento() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Atendimentos (
          id int NOT NULL AUTO_INCREMENT, 
          cliente varchar(11) NOT NULL, 
          pet varchar(20), 
          servico varchar(20) NOT NULL, 
          data datetime NOT NULL,
          dataCriacao datetime NOT NULL,
          status varchar(20) NOT NULL, 
          observacoes text, 
          PRIMARY KEY(id))
        `;

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela atendimentos criada com sucesso");
      }
    });
  }

  criarPets() {
    const query = `
      CREATE TABLE IF NOT EXISTS Pets(
        id int NOT NULL AUTO_INCREMENT, 
        nome varchar(50), 
        imagem varchar(200),
        PRIMARY KEY (id))
      `;

    this.conexao.query(query, erro => {
      if(erro) {
          console.log(erro)
      } else {
          console.log('Tabela Pets foi criada com sucesso')
      }
    });
  }

}

//exportando pra usar no index para criar as tabelas quando o servidor for iniciado
module.exports = new Tabelas();
