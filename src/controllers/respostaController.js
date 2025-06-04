var respostaModel = require("../models/respostaModel");

function cadastrar(req, res) {
  var idUsuario = req.body.idUsuario;
  var respostas = req.body.respostas;

  if (!idUsuario) {
    return res.status(400).send("ID do usuário não enviado!");
  }

  if (!respostas || !respostas.length) {
    return res.status(400).send("Respostas inválidas ou vazias!");
  }

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

module.exports = {
  cadastrar
};
