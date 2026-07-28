// ——————————————————————————————————————

let a = 10;
let b = a; // Copia o VALOR. Se mudar 'b', 'a' continua 10.

let objA = { nome: "Mateus" };
let objB = objA; // Copia a REFERÊNCIA!
objB.nome = "Lucas";

console.log(objA.nome); // "Lucas" -> Ambos apontavam para a mesma gaveta de memória!

// ——————————————————————————————————————

const usuarioOriginal = {
	id: 1,
	nome: "Mateus",
	preferencias: { tema: "dark" }, // Objeto aninhado!
};

// Criando Shallow Copy via Spread
const usuarioCopia = { ...usuarioOriginal };

// Modificando propriedade de 1º nível (Primitivo)
usuarioCopia.nome = "Lucas";
console.log(usuarioOriginal.nome); // "Mateus" -> Desconectados no 1º nível!

// Modificando propriedade de 2º nível (Objeto interno)
usuarioCopia.preferencias.tema = "light";
console.log(usuarioOriginal.preferencias.tema); // "light"! -> COMPARTILHAM a mesma referência!

// ——————————————————————————————————————

const usuarioOriginal2 = {
	id: 1,
	preferencias: { tema: "dark" },
	criadoEm: new Date(),
};

const cloneProfundo = structuredClone(usuarioOriginal2);

cloneProfundo.preferencias.tema = "light";
console.log(usuarioOriginal2.preferencias.tema); // "dark" (100% isolado!)
console.log(cloneProfundo.criadoEm instanceof Date); // true (Preserva instâncias de Date!)

// ——————————————————————————————————————

// Exemplo: Atualizando um item dentro de um array dentro de um objeto (Estado Imutável)
const carrinho = {
	clienteId: "usr_100",
	itens: [
		{ id: "p1", qtd: 1 },
		{ id: "p2", qtd: 3 },
	],
};

// Maneira manual limpa usando Spread por nível:
const carrinhoAtualizado = {
	...carrinho,
	itens: carrinho.itens.map((item) => (item.id === "p1" ? { ...item, qtd: item.qtd + 1 } : item)),
};

// Ou com structuredClone se precisar duplicar todo o estado com segurança de tipo:
const novoCarrinho = structuredClone(carrinho);
const itemP1 = novoCarrinho.itens.find((i) => i.id === "p1");
if (itemP1) itemP1.qtd += 1;

// ——————————————————————————————————————

const configPadrao = {
	timeout: 5000,
	headers: { "Content-Type": "application/json" },
};

function criarClienteHTTP(customConfig = {}) {
	// Garantindo que a configuração base nunca seja mutada por requisições paralelas
	const config = structuredClone(configPadrao);
	Object.assign(config.headers, customConfig.headers);

	return config;
}
