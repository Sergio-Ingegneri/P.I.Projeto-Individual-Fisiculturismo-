var dashboardModel = require("../models/dashboardModel");

function pegarTotalUsuarios(req, res) {
    dashboardModel.totalUsuarios()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro);
        });
}

function pegarKpi(req, res) {
    var idUsuario = req.params.id;

    dashboardModel.kpiUltimasRespostas(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro);
        });
}

function pegarRadar(req, res) {
    var idUsuario = req.params.id;

    dashboardModel.desempenhoPorArea(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro);
        });
}

module.exports = {
    pegarTotalUsuarios,
    pegarKpi,
    pegarRadar
};
