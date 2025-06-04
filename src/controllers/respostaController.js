var respostaModel = require("../models/respostaModel");

function cadastrar(req, res) {
  var idUsuario = req.body.idUsuario;
  var respostas = req.body.respostas;

  if (!idUsuario || !Array.isArray(respostas) || respostas.length == 0) {
    res.status(400).send("Dados inválidos!");
  } else {
    var insercoes = 0;

    for (var i = 0; i < respostas.length; i++) {
      var r = respostas[i];

      respostaModel.cadastrar(idUsuario, r.idPergunta, r.resposta, r.correta, r.acertou)
        .then(function () {
          insercoes++;
          if (insercoes == respostas.length) {
            res.status(200).send("Respostas salvas com sucesso!");
          }
        })
        .catch(function (erro) {
          res.status(500).json(erro.sqlMessage);
        });
    }
  }
}

module.exports = {
  cadastrar
};
