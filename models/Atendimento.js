const moment = require("moment");
const axios = require("axios");
const conexao = require("../infraestrutura/conexao");

class Atendimento {
  adiciona(atendimento, resp) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    //validação de dados
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao); //retorna booleano
    const clienteEhValido = atendimento.cliente.length >= 5;

    //um array de objetos com os campos a serem validados. utiliza booleanos para definir se é válido
    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clienteEhValido,
        mensagem: "Nome deve ter no mínimo cinco caracteres",
      },
    ];

    //irá filtrar somente o que for inválido
    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length; //retorna false se for 0

    if (existemErros) {
      resp.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };
      const sql = "INSERT INTO atendimentos SET ?";

      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          resp.status(404).json(erro);
        } else {
          resp.status(201).json(atendimento);
        }
      });
    }
  }

  lista(resp) {
    const sql = "SELECT * FROM atendimentos";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        resp.status(400).json(erro);
      } else {
        resp.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, resp) {
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;

    conexao.query(sql, async (erro, resultados) => {
      //para não retornar um array, somente o objeto, já que a busca é só um id
      const atendimento = resultados[0];
      const cpf = atendimento.cliente;

      if (erro) {
        resp.status(400).json(erro);
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        atendimento.cliente = data;

        resp.status(200).json(atendimento);
      }
    });
  }

  altera(id, valores, resp) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    const sql = "UPDATE atendimentos SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        resp.status(400).json(erro);
      } else {
        resp.status(200).json({ ...valores, id });
      }
    });
  }

  deleta(id, resp) {
    const sql = `DELETE FROM atendimentos WHERE id=?`;

    conexao.query(sql, id, (erro, resultados) => {
      if (erro) {
        resp.status(400).json(erro);
      } else {
        resp.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimento();
