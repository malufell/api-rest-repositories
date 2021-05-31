//importando o módulo
const mysql = require("mysql");

//informações necessárias para criação da conexão com o banco de dados
const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin",
    database: "curso_rest_api"
})

module.exports = conexao;