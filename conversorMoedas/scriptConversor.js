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

const botaoConverter = document.getElementById("botao-converter");
botaoConverter.addEventListener("click", converter);

const botaoLimpar = document.getElementById("botao-limpar");
botaoLimpar.addEventListener("click", limpar);

const botaoInverter = document.getElementById("botao-inverter");
botaoInverter.addEventListener("click", inverter);

const botaoAceitarMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitarMensagem.addEventListener("click", aceitarMensagem);

let valorUsuario = document.getElementById("valor_entrada");
valorUsuario.addEventListener("keypress", function(event) {
    
    if (event.ctrlKey && event.key == "L") {
        event.preventDefault();
        limpar();
    }

    if (event.ctrlKey && event.code == "KeyI") {
        inverter();
    }

    if (event.key == "Enter") {
        converter();
    }
})

function converter() {
    let valorUsuario = document.getElementById("valor_entrada").value;

    if (valorUsuario <= 0 || valorUsuario == "") {
        alert("O valor não pode ser vazio, negativo ou zero(0)! Verifique o valor!");
        return;
    }

    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;

    if (moeda1 == moeda2) {
        alert("As moedas são iguais!!");
        return;
    }

    let simbolo = valoresConversao[moeda2]["simbolo"];

    let resultado = valorUsuario * valoresConversao[moeda1][moeda2];

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + " " + resultado.toFixed(2);

    let objetoResultado = {
        valorDoUsuario: valorUsuario,
        valorMoeda1: moeda1,
        valorMoeda2: moeda2,
        valorResultado: resultado.toFixed(2)
    }

   // let objetoResultadoJSON = JSON.stringify(objetoResultado);

    // localStorage.setItem("historico", objetoResultadoJSON);

    salvarHistorico(objetoResultado);
}

function recuperaHistorico() {
    let historico = localStorage.getItem("historico");

    if(!historico) {
        return [];
    }

    let historicoObjeto = JSON.parse(historico);

    return historicoObjeto;
}

function salvarHistorico(conversao) {
    let historico = recuperaHistorico(); // histórico é um array de obj
    
    historico.push(conversao);
    historico = JSON.stringify(historico);
    localStorage.setItem("historico", historico);

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

function aceitarMensagem() {
    const divMensagemUsuario = document.getElementById("mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");

    localStorage.setItem("aceitouCookie", "1");
}

if (localStorage.getItem("aceitouCookie") == "1") {
    aceitarMensagem();
}
