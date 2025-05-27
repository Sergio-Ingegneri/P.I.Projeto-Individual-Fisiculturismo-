var database = require("../database/config");

/* grava 1 linha em tabela 'resposta' */
function cadastrar(idUsuario, fkPergunta, respUsr, respCorreta, acertou){
    var sql = `
        INSERT INTO resposta
            (fk_usuario, fk_pergunta, resposta_usuario, resposta_correta, acertou)
        VALUES
            (${idUsuario}, ${fkPergunta}, '${respUsr}', '${respCorreta}', ${acertou});
    `;
    return database.executar(sql);
}

module.exports = { cadastrar };
