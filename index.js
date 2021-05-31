//a única respnsabilidade de index.js é subir o servidor!


const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

//criando a conexão com o BD, ela acontece antes do servidor rodar.
conexao.connect(erro => { 
    if(erro) {
        console.log(erro);
    } else {
        console.log("conectado ao banco de dados com sucesso");

       //cria as tabelas do BD quando inicia o server
        Tabelas.init(conexao);

        //inicia o server
        const app = customExpress();
        app.listen(3000, () => console.log('servidor rodando na porta 3000'));

    }
})




