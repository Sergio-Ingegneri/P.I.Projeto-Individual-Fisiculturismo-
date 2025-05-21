/* public/js/dashboard.js */

var chartRadar, chartPizza, chartBarrasBlocos, chartBarrasNiveis;

/* =============== CARREGA DADOS =============== */
function inicializarDashboard() {
  var idUsuario = sessionStorage.ID_USUARIO;
  if (!idUsuario) {
    alert("Usuário não logado.");
    window.location.href = "login.html";
    return;
  }

  fetch("/dashboard/dados/" + idUsuario)
    .then(function (res) { return res.json(); })
    .then(function (data) {

      /* zera possíveis NULL do MySQL 5.6 */
      ["acertos","erros","treino","alimentacao","diversos",
       "iniciante","intermediario","avancado"].forEach(function (k) {
        if (data[k] == null) data[k] = 0;
      });

      preencherKPIs(data);
      gerarGraficos(data);
      gerarRecomendacoes(data);
    })
    .catch(function (e) {
      console.error("Dash erro:", e);
      alert("Falha ao buscar dados.");
    });
}

/* =============== KPIs =============== */
function preencherKPIs(obj) {
  var acertos = obj.acertos;
  var erros   = obj.erros;
  var total   = acertos + erros;
  var pct     = total ? Math.round((acertos / total) * 100) : 0;

  var nivel = "Iniciante";
  if (pct >= 70)      nivel = "Avançado";
  else if (pct >= 40) nivel = "Intermediário";

  document.getElementById("kpiPontuacao").innerHTML =
    "✅ Pontuação: " + acertos + "/" + total + " (" + pct + "%)";
  document.getElementById("kpiClassificacao").innerHTML =
    "🎓 Classificação: " + nivel;
  document.getElementById("kpiUsuarios").innerHTML =
    "👥 Total de usuários: " + obj.total_usuarios;
}

/* =============== GRÁFICOS =============== */
function gerarGraficos(obj) {
  /* destrói se já existirem */
  if (chartRadar)        chartRadar.destroy();
  if (chartPizza)        chartPizza.destroy();
  if (chartBarrasBlocos) chartBarrasBlocos.destroy();
  if (chartBarrasNiveis) chartBarrasNiveis.destroy();

  /* Radar */
  chartRadar = new Chart(document.getElementById("graficoRadar"), {
    type: "radar",
    data: {
      labels: ["Treinamento", "Alimentação", "Diversos"],
      datasets: [{ data: [obj.treino, obj.alimentacao, obj.diversos], borderWidth: 2 }]
    },
    options: radarOptions()
  });

  /* Pizza */
  chartPizza = new Chart(document.getElementById("graficoPizza"), {
    type: "pie",
    data: {
      labels: ["Treino", "Alimentação", "Diversos"],
      datasets: [{ data: [obj.treino, obj.alimentacao, obj.diversos], borderWidth: 1 }]
    },
    options: legendWhite()
  });

  /* Barras – acertos por bloco */
  chartBarrasBlocos = new Chart(document.getElementById("graficoBarrasBlocos"), {
    type: "bar",
    data: {
      labels: ["Treino", "Alimentação", "Diversos"],
      datasets: [{ label: "Acertos", data: [obj.treino, obj.alimentacao, obj.diversos], borderWidth: 1 }]
    },
    options: barrasOptions()
  });

  /* Barras – nível geral dos usuários */
  var labelsN  = ["Iniciante","Intermediário","Avançado"];
  var valoresN = [obj.iniciante, obj.intermediario, obj.avancado];

  chartBarrasNiveis = new Chart(document.getElementById("graficoBarrasNiveis"), {
    type: "bar",
    data: { labels: labelsN, datasets: [{ label: "Usuários", data: valoresN, borderWidth: 1 }] },
    options: barrasOptions()
  });
}

/* =============== RECOMENDAÇÕES =============== */
function gerarRecomendacoes(obj) {
  var msgs = [];
  obj.treino      <= 2 ? msgs.push("⚠️ Reforce métodos de treino.")     : msgs.push("✅ Ótimo em Treino.");
  obj.alimentacao <= 2 ? msgs.push("⚠️ Aprimore nutrição esportiva.")   : msgs.push("✅ Bom em Alimentação.");
  obj.diversos    <= 2 ? msgs.push("⚠️ Revise temas gerais.")           : msgs.push("✅ Conteúdo geral ok.");

  document.getElementById("recomendacao").innerHTML =
    msgs.map(function (m) { return "<p>" + m + "</p>"; }).join("");
}

/* =============== HELPERs de estilo =============== */
function legendWhite() {
  return { plugins: { legend: { labels: { color: "white" } } } };
}
function barrasOptions() {
  return {
    scales: { x: { ticks: { color: "white" } }, y: { ticks: { color: "white" } } },
    plugins: legendWhite().plugins
  };
}
function radarOptions() {
  return {
    plugins: legendWhite().plugins,
    scales: {
      r: {
        pointLabels: { color: "white" },
        grid:       { color: "gray"  },
        angleLines: { color: "gray"  },
        ticks:      { color: "white", backdropColor: "transparent" }
      }
    }
  };
}
