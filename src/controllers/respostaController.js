var respostaModel = require("../models/respostaModel");

function cadastrar(req, res){
   var idUsuario = req.body.idUsuario;
   var respostas = req.body.respostas;  // [{idPergunta, resposta, correta, acertou}]

   if(!idUsuario || !Array.isArray(respostas) || respostas.length === 0){
       res.status(400).send("payload inválido"); return;
   }

   var promessas = [];
   for (var i = 0; i < respostas.length; i++){
        var r = respostas[i];
        promessas.push(
          respostaModel.cadastrar(
              idUsuario,
              r.idPergunta,     // agora fk_pergunta
              r.resposta,
              r.correta,
              r.acertou
          )
        );
   }

   Promise.all(promessas)
     .then(function(resultado){ res.json(resultado); })
     .catch(function(erro){
        console.log("Erro ao gravar respostas:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
     });
}

module.exports = {
    cadastrar: cadastrar
};
