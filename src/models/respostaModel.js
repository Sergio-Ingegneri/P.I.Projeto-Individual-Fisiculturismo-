var database = require("../database/config");

/* Insere UMA resposta no banco */
function cadastrar(idUsuario, pergunta, respUsuario, respCorreta, acertou) {
    var instrucaoSql = `
        INSERT INTO quiz_resposta
            (id_usuario, pergunta, resposta_usuario, resposta_correta, acertou)
        VALUES
            (${idUsuario}, '${pergunta}', '${respUsuario}', '${respCorreta}', ${acertou});
    `;
    return database.executar(instrucaoSql);
}

module.exports = { cadastrar };
