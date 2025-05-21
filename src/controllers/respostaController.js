var respostaModel = require("../models/respostaModel");

function cadastrar(req, res) {
    var idUsuario = req.body.idUsuario;
    var respostas = req.body.respostas; // [{pergunta, resposta, correta, acertou}]

    if (idUsuario === undefined) {
        res.status(400).send("idUsuario undefined");
        return;
    }
    if (!Array.isArray(respostas) || respostas.length === 0) {
        res.status(400).send("respostas undefined");
        return;
    }

    var promessas = [];
    for (var i = 0; i < respostas.length; i++) {
        var r = respostas[i];
        promessas.push(
            respostaModel.cadastrar(
                idUsuario,
                r.pergunta,
                r.resposta,
                r.correta,
                r.acertou
            )
        );
    }

    Promise.all(promessas)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao gravar respostas:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar: cadastrar
};
