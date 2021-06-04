const query = require("../infraestrutura/database/queries");
const axios = require("axios");

class Atendimento {
  adiciona(atendimento) {
    const sql = "INSERT INTO atendimentos SET ?";
    return query(sql, atendimento);
  }

  lista() {
    const sql = "SELECT * FROM atendimentos";
    return query(sql);
  }

  async buscaPorId(id) {
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;
    const atendimento = query(sql, id);
    const cpf = atendimento.cliente;
    const { data } = await axios.get(`http://localhost:8082/${cpf}`);
    atendimento.cliente = data;
    return atendimento;
  }

  altera(novosDados, id) {
    const sql = `UPDATE atendimentos SET ? WHERE id=${id}`;
    return query(sql, novosDados);
  }

  deleta(id) {
    const sql = `DELETE FROM atendimentos WHERE id=${id}`;
    return query(sql);
  }
}

module.exports = new Atendimento();
