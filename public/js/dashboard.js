/* dashboard.js – mock */

var chartRadar, chartBarrasArea, chartPizzaAE, chartBarErros;

function inicializarDashboard() {
  /* -------- MOCK -------- */
  var dados = {
    /* KPIs */
    acertos : 7,
    erros   : 2,
    /* acertos por área (mantidos p/ radar) */
    treinoA : 3,
    nutricaoA:2,
    complA  : 2,
    /* erros por área (NOVO) */
    treinoE : 1,
    nutricaoE:2,
    complE  : 1,
    /* top 5 erros */
    topErros: [
      { texto: "Treinar sem descanso…",   erros: 5 },
      { texto: "1 g de gordura = 4 kcal", erros: 4 },
      { texto: "Gordura localizada…",     erros: 3 },
      { texto: "Overtraining é…",         erros: 2 },
      { texto: "Proteínas auxiliam…",     erros: 2 }
    ],
    total_usuarios: 42
  };

  preencherKPIs(dados);
  gerarGraficos(dados);
}

/* ===== KPIs ===== */
function preencherKPIs(d) {
  var total = d.acertos + d.erros;
  var pct   = total ? Math.round((d.acertos / total) * 100) : 0;

  var nivel = "Iniciante";
  if (pct >= 70)      nivel = "Avançado";
  else if (pct >= 40) nivel = "Intermediário";

  document.getElementById("kpiPontuacao").innerHTML =
    "✅ Pontuação: " + d.acertos + "/" + total + " (" + pct + "%)";
  document.getElementById("kpiClassificacao").innerHTML =
    "🎓 Classificação: " + nivel;
  document.getElementById("kpiUsuarios").innerHTML =
    "👥 Total de usuários: " + d.total_usuarios;
}

/* ===== GRÁFICOS ===== */
function gerarGraficos(d) {
  if (chartRadar)      chartRadar.destroy();
  if (chartBarrasArea) chartBarrasArea.destroy();
  if (chartPizzaAE)    chartPizzaAE.destroy();
  if (chartBarErros)   chartBarErros.destroy();

  /* 1. Radar (continua usando acertos por área) */
  chartRadar = new Chart(document.getElementById("graficoRadar"), {
    type: "radar",
    data: {
      labels: ["Treino", "Nutrição", "Complementar"],
      datasets: [{
        label: "Acertos",
        data : [d.treinoA, d.nutricaoA, d.complA],
        borderWidth: 2
      }]
    },
    options: radarOptions()
  });

  /* 2. Barras por área – agora ERROS */
  chartBarrasArea = new Chart(document.getElementById("graficoBarrasBlocos"), {
  type: "bar",
  data: {
    labels: ["Treino", "Nutrição", "Complementar"],
    datasets: [{
      label: "Erros",
      data : [d.treinoE, d.nutricaoE, d.complE],
      backgroundColor: "rgba(255, 99, 132, 0.5)",  // 🔴 vermelho (mesmo tom da pizza)
      borderColor:    "rgb(255, 99, 132)",
      borderWidth: 1
    }]
  },
  options: barrasOptions()
});

  /* 3. Pizza Acertos × Erros */
/* 3. Pizza Acertos × Erros */
chartPizzaAE = new Chart(document.getElementById("graficoPizzaAE"), {
  type: "pie",
  data: {
    labels: ["Acertos", "Erros"],
    datasets: [{
      data: [d.acertos, d.erros],
      backgroundColor: [
        "rgba(54, 162, 235, 0.6)",   // 🔵 azul (acertos)
        "rgba(255, 99, 132, 0.6)"    // 🔴 vermelho (erros) – igual ao de barras
      ],
      borderColor: [
        "rgb(54, 162, 235)",
        "rgb(255, 99, 132)"
      ],
      borderWidth: 1
    }]
  },
  options: legendWhite()
});

  /* 4. Barra horizontal Top 5 erros */
  chartBarErros = new Chart(document.getElementById("graficoBarErros"), {
    type: "bar",
    data: {
      labels: d.topErros.map(function (e) { return e.texto; }),
      datasets: [{ label: "Erros", data: d.topErros.map(function (e) { return e.erros; }), borderWidth: 1 }]
    },
    options: {
      indexAxis: "y",
      scales: { x: { ticks: { color: "white" } }, y: { ticks: { color: "white" } } },
      plugins: legendWhite().plugins
    }
  });
}

/* ===== Helpers ===== */
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
        grid: { color: "gray" },
        angleLines: { color: "gray" },
        ticks: { color: "white", backdropColor: "transparent" }
      }
    }
  };
}
