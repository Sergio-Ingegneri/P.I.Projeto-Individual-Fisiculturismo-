var dashboardModel = require("../models/dashboardModel");

function obterDados(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.obterDados(idUsuario)
        .then(function (resultado) {
            res.json(resultado);            
        })

        .catch(function (erro) {
            console.log("Erro dash:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = { obterDados };
