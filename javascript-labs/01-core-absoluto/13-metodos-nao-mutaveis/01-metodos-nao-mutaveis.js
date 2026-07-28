// ——————————————————————————————————————

const original = [1, 2, 3];

// .map() NÃO altera 'original', ele RETORNA um novo array:
const dobrados = original.map((x) => x * 2);

console.log(original); // [1, 2, 3] (Intacto!)
console.log(dobrados); // [2, 4, 6] (Novo endereço de memória)

// ——————————————————————————————————————

const usuarios = [
	{ id: 1, nome: "Mateus" },
	{ id: 2, nome: "Ana" },
];
const apenasNomes = usuarios.map((u) => u.nome); // ["Mateus", "Ana"]

// ——————————————————————————————————————

const matriz = [1, [2, [3, 4]]];

matriz.flat(1); // [1, 2, [3, 4]]
matriz.flat(2); // [1, 2, 3, 4]
matriz.flat(Infinity); // Achata qualquer nível de aninhamento

// ——————————————————————————————————————

const frases = ["Olá mundo", "JavaScript moderno"];

// Com .flatMap: mapeia para array e achata em 1 nível automaticamente
const palavras = frases.flatMap((f) => f.split(" "));
// Output: ["Olá", "mundo", "JavaScript", "moderno"]

// ——————————————————————————————————————

const produtos = [
	{ nome: "Teclado", preco: 200 },
	{ nome: "Mouse", preco: 50 },
];
const caros = produtos.filter((p) => p.preco > 100); // [{ nome: "Teclado", preco: 200 }]

// ——————————————————————————————————————

const usuario = usuarios.find((u) => u.id === 1); // { id: 1, nome: "Mateus" }

// ——————————————————————————————————————

const indice = usuarios.findIndex((u) => u.id === 2); // 1

// ——————————————————————————————————————

const permissoes = ["READ", "WRITE"];
const temAcessoAdmin = permissoes.some((p) => p === "ADMIN"); // false

// ——————————————————————————————————————

const idades = [20, 25, 30, 17];
const todosMaiores = idades.every((i) => i >= 18); // false (parou no 17)

// ——————————————————————————————————————

const frutas = ["Maçã", "Banana", "Laranja", "Uva"];
const parte = frutas.slice(1, 3); // ["Banana", "Laranja"]

// Dica Imutável: .slice() sem argumentos faz uma cópia rasa do array todo!
const copiaFatiada = frutas.slice();

// ——————————————————————————————————————

const a = [1, 2];
const b = [3, 4];
const combinado = a.concat(b, 5); // [1, 2, 3, 4, 5]

// ——————————————————————————————————————

// Sintaxe: array.reduce((acumulador, elementoAtual, indice, arrayOriginal) => {}, valorInicial)

const vendas = [100, 250, 150];

const total = vendas.reduce((acc, venda) => acc + venda, 0); // 500

// ——————————————————————————————————————

const transacoes = [
	{ id: "t1", tipo: "RECEITA", valor: 1500 },
	{ id: "t2", tipo: "DESPESA", valor: 200 },
	{ id: "t3", tipo: "RECEITA", valor: 500 },
];

const agrupadoPorTipo = transacoes.reduce((acc, transacao) => {
	const { tipo } = transacao;

	// Se a chave ainda não existe no objeto acumulador, inicializa com array vazio
	if (!acc[tipo]) {
		acc[tipo] = [];
	}

	acc[tipo].push(transacao);
	return acc;
}, {});

console.log(agrupadoPorTipo);
// Output:
// {
//   RECEITA: [{ id: "t1", ... }, { id: "t3", ... }],
//   DESPESA: [{ id: "t2", ... }]
// }

// ——————————————————————————————————————

const carrinho = [
	{ produto: "Notebook", preco: 4500, disponivel: true },
	{ produto: "Mouse", preco: 80, disponivel: false },
	{ produto: "Teclado", preco: 250, disponivel: true },
];

// Requisito: Pegar o valor total apenas dos produtos disponíveis com preço acima de R$ 100
const totalDisponiveisValiosos = carrinho
	.filter((item) => item.disponivel && item.preco > 100)
	.map((item) => item.preco)
	.reduce((acc, preco) => acc + preco, 0);

console.log(totalDisponiveisValiosos); // 4750

// ——————————————————————————————————————
