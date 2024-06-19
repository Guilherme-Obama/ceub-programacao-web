const relacaoNomesMoedas = { real: "BRL", dolar: "USD", euro: "EUR"};

const botaoConverter = document.getElementById("botao-converter");
botaoConverter.addEventListener("click", converter);

const botaoLimpar = document.getElementById("botao-limpar");
botaoLimpar.addEventListener("click", limpar);

const botaoInverter = document.getElementById("botao-inverter");
botaoInverter.addEventListener("click", inverter);

const botaoAceitarMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitarMensagem.addEventListener("click", aceitarMensagem);

// Atalhos do teclado
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

// Funções principais
function limpar() {
    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = "";

    let valorEntrada = document.getElementById("valor_entrada");
    valorEntrada.value = "";
};

function inverter() {
    let valorMoeda1 = document.getElementById("moeda1").value;
    let valorMoeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = valorMoeda2;
    document.getElementById("moeda2").value = valorMoeda1;
};

function converter() {
    //let historicoRecuperado = recuperaHistorico();

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
    
    buscaConversaoAPI(relacaoNomesMoedas[moeda1], relacaoNomesMoedas[moeda2]).then(function(fatorConversao){
        let simbolo = fatorConversao["simbolo"];
        let resultado = valorUsuario * fatorConversao["cotacao"];
        let paragrafoResultado = document.getElementById("resultado");
        paragrafoResultado.textContent = simbolo + " " + resultado.toFixed(2);
    
        let objetoResultado = {
            valorDoUsuario: valorUsuario,
            valorMoeda1: moeda1,
            valorMoeda2: moeda2,
            valorResultado: resultado.toFixed(2)
        }
    
        salvarHistorico(objetoResultado, objetoResultado, relacaoNomesMoedas[moeda1] + relacaoNomesMoedas[moeda2]);

    })
};

function salvarHistorico(conversao) {
    fetch(`http://localhost:4000/historico/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: conversao })
    }).then(response => {
        if (response.status === 201) {
            console.log("Historico salvo com sucesso");
            carregarHistorico();
        } else {
            console.error("Erro ao salvar historico");
        }
    }).catch(error => {
        console.error("Erro ao salvar historico: ", error);
    });
};

function carregarHistorico() {
    fetch('http://localhost:4000/historico')
        .then(response => response.json())
        .then(data => {
            console.log("Histórico carregado:", data);
            let historicoContainer = document.getElementById("historico-conversoes");
            historicoContainer.innerHTML = ""; // Clear the existing history

            data.forEach(item => {
                let listItem = document.createElement("li");
                listItem.textContent = `${item.valorDoUsuario} ${relacaoNomesMoedas[item.valorMoeda1] } -> ${item.valorResultado} ${relacaoNomesMoedas[item.valorMoeda2]}`;
                historicoContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar histórico:", error);
        });
}

function aceitarMensagem() {
    const divMensagemUsuario = document.getElementById("mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");
    
    localStorage.setItem("aceitouCookie", "1");
};

if (localStorage.getItem("aceitouCookie") == "1") {
    aceitarMensagem();
};

function buscaConversaoAPI(moedaOrigem, moedaDestino){
    let urlAPI = "http://localhost:4000/conversao/";
    urlAPI = urlAPI + moedaOrigem + "-" + moedaDestino;
    
    return fetch(urlAPI).then(function(response) {
        if (response.status == 200) {
            console.log("A chamada foi feita com sucesso")
        }
        return response.json();
        
    }).then(function(data){
        return data;
        
    }).catch(function(error){
        console.log(error);
    })
    
};

// Carregar o histórico ao iniciar a aplicação
document.addEventListener("DOMContentLoaded", carregarHistorico);


/* Salvamento Local Storage

function salvarHistorico(conversao) {
    let historico = recuperaHistorico(); // histórico é um array de obj
    
    historico.push(conversao);
    historico = JSON.stringify(historico);
    localStorage.setItem("historico", historico);

}; */

/* function recuperaHistorico() {
    let historico = localStorage.getItem("historico");

    if(!historico) {
        return [];
    }

    let historicoObjeto = JSON.parse(historico);

    return historicoObjeto;
} */