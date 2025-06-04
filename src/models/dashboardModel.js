var database = require("../database/config");

function totalUsuarios() {
    var instrucaoSql = `
        SELECT COUNT(id) AS total FROM usuario;
    `;
    return database.executar(instrucaoSql);
}

function kpiUltimasRespostas(idUsuario) {
    var instrucaoSql = `
        select sum(acertou) as acertos, sum(not acertou) as erros
        from (
            select acertou
            from resposta r
            where fk_usuario = ${idUsuario}
            order by id DESC
            limit 9
        ) r;
    `;
    return database.executar(instrucaoSql);
}

function desempenhoPorArea(idUsuario) {
    var instrucaoSql = `
        select p.area, sum(r.acertou) as acertos
        from (
            select *
            from resposta r
            where fk_usuario = ${idUsuario}
            order by id DESC
            limit 9
        ) r
        join pergunta p on r.fk_pergunta = p.id
        group by p.area;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    totalUsuarios,
    kpiUltimasRespostas,
    desempenhoPorArea
};
