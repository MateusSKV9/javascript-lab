// ——————————— Escopo de bloco ———————————

if (true) {
	let tecnologia = "TypeScript";
	const versão = 5;
}

// console.log(tecnologia); // não definidos
// console.log(versão); // não definidos

// ——————————— Temporal Dead Zone & Hoisting ———————————

// console.log(stack); // TDZ

let stack = "Node.js";
console.log(stack);

// ——————————— Reatribuição vs Imutabilidade ———————————

let contador = 0;
contador += 1;

const maxTentativas = 3;
// maxTentativas = 5; // error

const usuario = {
	id: "123",
	nome: "Mateus",
	roles: ["admin"],
};

console.log(usuario);

usuario.nome = "Mateus Silva";
usuario.roles.push("developer");

console.log(usuario);

// ——————————— Imutabilidade de Objetos (rasa) ———————————

const configuracao = Object.freeze({
	env: "production",
	port: 3000,
});

configuracao.port = 8000; // ignora
console.log(configuracao.port);
