function calcularTMB() {
    var sexoSelecionado = document.querySelector('input[name="sexo"]:checked');
    var biotipoSelecionado = document.querySelector('input[name="biotipo"]:checked');
    var alturaInput = document.getElementById('altura');
    var pesoInput = document.getElementById('peso');
    var idadeInput = document.getElementById('idade');
    var resultado = document.getElementById('resultado');

    var altura = parseFloat(alturaInput.value);
    var peso = parseFloat(pesoInput.value);
    var idade = parseInt(idadeInput.value);

    if (!sexoSelecionado || !biotipoSelecionado || isNaN(altura) || isNaN(peso) || isNaN(idade)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    var sexo = sexoSelecionado.value;
    var biotipo = biotipoSelecionado.value;
    var tmbBase = 0;

    if (sexo === 'masculino') {
        tmbBase = 66 + (13.7 * peso) + (5 * altura) - (6.8 * idade);
    } else {
        tmbBase = 665 + (9.6 * peso) + (1.8 * altura) - (4.7 * idade);
    }

    if (biotipo === 'mesomorfo') {
        tmbBase -= 200;
    } else if (biotipo === 'endomorfo') {
        tmbBase -= 400;
    }

    resultado.innerHTML = 'Sua Taxa Metabólica Basal é: <strong>' + tmbBase.toFixed(2) + ' calorias';
    resultado.style.display = 'block';
}
