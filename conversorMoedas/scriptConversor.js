const valoresConversao = {
    real: {
        euro: 0.19,
        dolar: 0.20,
        simbolo: "R$"
    },
    dolar: {
        real: 4.99,
        euro: 0.92,
        simbolo: "US$"
    },
    euro: {
        real: 5.40,
        dolar: 1.08,
        simbolo: "€"
    }
}

function converter() {
    let valorUsuario = document.getElementById("valor_entrada").value;

    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;

    if (moeda1 == moeda2) {
        alert("As moedas são iguais!!");
        return;
    } else if (valorUsuario == "") {
        alert("Insira um valor para a conversão!!");
        return;
    } else if (valorUsuario <= 0) {
        alert("Valor não suportado!!");
        return;
    }

    let simbolo = valoresConversao[moeda2]["simbolo"];

    let resultado = valorUsuario * valoresConversao[moeda1][moeda2];

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + " " + resultado.toFixed(2);
}

function limpar() {
    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = "";

    let valorEntrada = document.getElementById("valor_entrada");
    valorEntrada.value = "";
}

function inverter() {
    let valorMoeda1 = document.getElementById("moeda1").value;
    let valorMoeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = valorMoeda2;
    document.getElementById("moeda2").value = valorMoeda1;
}