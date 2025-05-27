var chartRadar, chartBarrasArea, chartPizzaAE, chartBarErros;

/* ========== FETCH DOS DADOS ========== */
document.addEventListener("DOMContentLoaded", function () {

    console.log(sessionStorage.ID_USUARIO);
    
    fetch("/dashboard/dados/" + sessionStorage.ID_USUARIO)
        .then(function (resp) { return resp.json(); })
        .then(function (dados) {
            /* separa conforme o campo 'tipo' */
            var totalRow = dados.find(function (l) { return l.tipo === "USU"; });
            var kpi = dados.find(function (l) { return l.tipo === "KPI"; });
            var porArea = dados.filter(function (l) { return l.tipo === "AREA"; });
            var topErros = dados.filter(function (l) { return l.tipo === "TOP"; });

            function getArea(area, campo) {
                var linha = porArea.find(function (a) { return a.area === area; });
                return linha ? Number(linha[campo]) : 0;
            }

            var d = {
                acertos: Number(kpi.acertos),
                erros: Number(kpi.erros),

                treinoA: getArea("Treino", "acertos"),
                nutricaoA: getArea("Nutrição", "acertos"),
                complA: getArea("Complementar", "acertos"),

                treinoE: getArea("Treino", "erros"),
                nutricaoE: getArea("Nutrição", "erros"),
                complE: getArea("Complementar", "erros"),

                topErros: topErros.map(function (e) {
                return { texto: e.titulo, erros: Number(e.erros) };
                }),
                total_usuarios: Number(totalRow.acertos)
            };
            preencherKPIs(d);
            gerarGraficos(d);

        })
        .catch(function (e) {
            console.error("Dash fetch erro:", e);
        });
});

/* ========== KPI ========== */
function preencherKPIs(d) {
    var total = d.acertos + d.erros;
    var pct = total ? Math.round((d.acertos / total) * 100) : 0;

    var nivel = "Iniciante";
    if (pct >= 70) { nivel = "Avançado"; }
    else if (pct >= 40) { nivel = "Intermediário"; }

    kpiPontuacao.innerHTML = "✅ Pontuação: " + d.acertos + "/" + total + " (" + pct + "%)";
    kpiClassificacao.innerHTML = "🎓 Classificação: " + nivel;
    kpiUsuarios.innerHTML = "👥 Total de usuários: " + d.total_usuarios;
}

/* ========== GRÁFICOS ========== */
function gerarGraficos(d) {
    if (chartRadar) { chartRadar.destroy(); }
    if (chartBarrasArea) { chartBarrasArea.destroy(); }
    if (chartPizzaAE) { chartPizzaAE.destroy(); }
    if (chartBarErros) { chartBarErros.destroy(); }

    /* Radar ---------------------------------------------------- */
    chartRadar = new Chart(graficoRadar, {
        type: "radar",
        data: {
            labels: ["Treino", "Nutrição", "Complementar"],
            datasets: [{
                label: "Acertos",
                data: [d.treinoA, d.nutricaoA, d.complA],
                borderWidth: 2
            }]
        },
        options: radarOptions()
    });

    /* Barras Erros por Área ----------------------------------- */
    chartBarrasArea = new Chart(graficoBarrasBlocos, {
        type: "bar",
        data: {
            labels: ["Treino", "Nutrição", "Complementar"],
            datasets: [{
                label: "Erros",
                data: [d.treinoE, d.nutricaoE, d.complE],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1
            }]
        },
        options: barrasOptions()
    });

    /* Pizza Acertos × Erros ----------------------------------- */
    chartPizzaAE = new Chart(graficoPizzaAE, {
        type: "pie",
        data: {
            labels: ["Acertos", "Erros"],
            datasets: [{
                data: [d.acertos, d.erros],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)"
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

    /* Barra horizontal Top 5 erros ---------------------------- */
    chartBarErros = new Chart(graficoBarErros, {
        type: "bar",
        data: {
            labels: d.topErros.map(function (e) { return e.texto; }),
            datasets: [{
                label: "Erros",
                data: d.topErros.map(function (e) { return e.erros; }),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: "y",
            scales: { x: { ticks: { color: "white" } }, y: { ticks: { color: "white" } } },
            plugins: legendWhite().plugins
        }
    });
}

/* ========== SHARED OPTIONS ========== */
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
