// ——————————————————————————————————————

function calcularTotal(preco, quantidade) {
	return preco * quantidade;
}

// ——————————————————————————————————————

// Funciona perfeitamente devido ao Hoisting de definição:
const resultado = somar(5, 10); // 15

function somar(a, b) {
	return a + b;
}

// ——————————————————————————————————————

// Anônima
const calcularTotal = function (preco, quantidade) {
	return preco * quantidade;
};

// Nomeada (ótima para depuração e recursão)
const fatorial = function calcularFatorial(n) {
	if (n <= 1) return 1;
	return n * calcularFatorial(n - 1);
};

// ——————————————————————————————————————

// TypeError ou ReferenceError dependendo de como a variável foi declarada
executar(); // Uncaught ReferenceError: Cannot access 'executar' before initialization

const executar = function () {
	console.log("Executando...");
};

// ——————————————————————————————————————

// Sintaxe padrão
const dobro = (numero) => {
	return numero * 2;
};

// ——————————————————————————————————————

// Return implícito direto
const dobro2 = (numero) => numero * 2;

// Retornando objetos de forma implícita (obrigatório envolver em parênteses)
const criarUsuario = (nome, idade) => ({ nome, idade, ativo: true });

// ——————————————————————————————————————

const carrinho = {
	itens: [{ nome: "Notebook", preco: 4500 }],
	desconto: 0.1,

	// Método usando Function Expression / Shorthand (this referencia o objeto carrinho)
	calcularTotal() {
		return this.itens.reduce((acc, item) => acc + item.preco, 0) * (1 - this.desconto);
	},

	// CUIDADO: Arrow function aqui faria o `this` apontar para o escopo global/módulo
	calcularTotalIncorreto: () => {
		// this.itens seria undefined
	},
};

// ——————————————————————————————————————

// Middleware / Função de alta ordem (HOF)
const aplicarDesconto = (taxa) => (preco) => preco - preco * taxa;

const descontoDeDezPorCento = aplicarDesconto(0.1);
console.log(descontoDeDezPorCento(100)); // 90
