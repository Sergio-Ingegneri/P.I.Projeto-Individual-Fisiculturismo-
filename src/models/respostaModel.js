var database = require("../database/config");

function cadastrar(idUsuario, fkPergunta, respUsuario, respCorreta, acertou) {
  var instrucaoSql = `
    insert into resposta (fk_usuario, fk_pergunta, resposta_usuario, resposta_correta, acertou)
    values (${idUsuario}, ${fkPergunta}, '${respUsuario}', '${respCorreta}', ${acertou});
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar
};
