let conteudo;

conteudo = document.getElementById("titulos");

conteudo.innerHTML = "<marquee> Esse conteudo está vindo do javascript</marquee>"

let conteudo2 = document.getElementById("paragrafo-legal");
conteudo2.innerHTML = "<p>esse paragrafo vem do javascript</p>"

console.log(typeof(conteudo));
console.log(conteudo);











// Imprima no console do navegador os número de 1 a 5:
//for (let numero = 1; numero < 6; numero++) {
//    console.log(numero);
//}

/* let i = 1;

while (i < 6) {
    console.log(i);
    i++;
}
 */


/* 
let idade = 18;
let nome = "joao"

if (idade >= 18 || nome === "joao") {
    console.log("pode entrar")
}

let meuArray = [1, 2, 3]

console.log(meuArray[0]);
console.log(meuArray)

console.log(meuArray.length)

let pessoa = {
    nome: "joao",
    idade: 18,
    altura: 1.78
}

console.log("a idade da pessoa " + pessoa['nome'] + " é " + pessoa.idade) */