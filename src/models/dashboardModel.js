var database = require("../database/config");

function totalUsuarios() {
  return database.executar(`
        SELECT COUNT(id) AS total FROM usuario;
    `).then(function (res) {
    return [{
      tipo: "USU",
      acertos: res[0].total,
      erros: null,
      area: null,
      titulo: null
    }];
  });
}

function kpiUltimasRespostas(idUsuario) {
  return database.executar(`
        SELECT SUM(acertou) AS acertos, SUM(NOT acertou) AS erros
        FROM (
            SELECT acertou
            FROM resposta
            WHERE fk_usuario = ${idUsuario}
            ORDER BY id DESC
            LIMIT 9
        ) AS ultimas;
    `).then(function (res) {
    return [{
      tipo: "KPI",
      acertos: res[0].acertos || 0,
      erros: res[0].erros || 0,
      area: null,
      titulo: null
    }];
  });
}

function desempenhoPorArea(idUsuario) {
  return database.executar(`
        SELECT p.area, SUM(r.acertou) AS acertos, SUM(NOT r.acertou) AS erros
        FROM (
            SELECT *
            FROM resposta
            WHERE fk_usuario = ${idUsuario}
            ORDER BY id DESC
            LIMIT 9
        ) r
        JOIN pergunta p ON r.fk_pergunta = p.id
        GROUP BY p.area;
    `).then(function (res) {
    var resultado = [];
    for (var i = 0; i < res.length; i++) {
      resultado.push({
        tipo: "AREA",
        acertos: res[i].acertos,
        erros: res[i].erros,
        area: res[i].area,
        titulo: null
      });
    }
    return resultado;
  });
}

function topPerguntasMaisErradas() {
  return database.executar(`
        SELECT p.titulo, COUNT(*) AS erros
        FROM resposta r
        JOIN pergunta p ON r.fk_pergunta = p.id
        WHERE r.acertou = 0
        GROUP BY p.id
        ORDER BY erros DESC
        LIMIT 5;
    `).then(function (res) {
    var resultado = [];
    for (var i = 0; i < res.length; i++) {
      resultado.push({
        tipo: "TOP",
        acertos: null,
        erros: res[i].erros,
        area: null,
        titulo: res[i].titulo
      });
    }
    return resultado;
  });
}

// FUNÇÃO FINAL QUE JUNTA TUDO
function obterDados(idUsuario) {
  var resultadoFinal = [];

  return totalUsuarios().then(function (r1) {
    resultadoFinal.push(...r1);
    return kpiUltimasRespostas(idUsuario);
  }).then(function (r2) {
    resultadoFinal.push(...r2);
    return desempenhoPorArea(idUsuario);
  }).then(function (r3) {
    resultadoFinal.push(...r3);
    return topPerguntasMaisErradas();
  }).then(function (r4) {
    resultadoFinal.push(...r4);
    return resultadoFinal;
  });
}

module.exports = { obterDados };
