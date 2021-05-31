//todas as configurações da aplicação serão feitas aqui!

//um framework com recursos para criação de rotas, middlewares, validadores e etc.
const express = require('express');

// importando o módulo que carrega automaticamente os scripts
//Pode ser usado para modelos, rotas, esquemas, configurações, controladores, mapas de objetos, etc
const consign = require('consign');

//importando a lib responsável por traduzir as requisições em algo legível para o JS
// const bodyParser = require("body-parser"); não é mais necessário, agora usa express direto

module.exports = () => {
    const app = express();

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    consign()
        .include('controllers')
        .into(app);

    return app;
}