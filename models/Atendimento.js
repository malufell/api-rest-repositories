const moment = require("moment");
const repositorio = require("../repositories/atendimento");

class Atendimento {
  constructor() {
    this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao);

    this.clienteEhValido = ({ tamanho }) => tamanho == 11;

    this.validacoes = [
      {
        nome: "data",
        valido: this.dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: this.clienteEhValido,
        mensagem: "Deve informar um CPF de 11 caracteres",
      },
    ];

    this.valida = parametros =>
      this.validacoes.filter(campo => {
        const { nome } = campo;
        const parametro = parametros[nome];

        return !campo.valido(parametro);
      });
  }

  adiciona(atendimento) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");

    const parametros = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length },
    };

    const erros = this.valida(parametros);
    const existemErros = erros.length;

    //criada uma promise aqui pois é a forma de passar os erros adiante para o controller
    //antes da promise tinha direto res.send, mas com a refatoração o model não pode responder direto
    if (existemErros) {
      return new Promise((resolve, reject) => reject(erros));
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };

      return repositorio.adiciona(atendimentoDatado).then((resultados) => {
        const id = resultados.insertId;
        return { ...resultados, id }; 
      });
    }
  }

  lista() {
    return repositorio.lista();
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id);
  }

  altera(novosDados, id) {
    if (novosDados.data) {
      novosDados.data = moment(novosDados.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");
    }
    return repositorio.altera({ ...novosDados }, id );
}

  deleta(id) {
    return repositorio.deleta(id);
  }
}

module.exports = new Atendimento();
