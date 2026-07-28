// ——————————————————————————————————————

// Exemplo de HOF que RECEBE uma função (callback)
function executarOperacao(a, b, operacao) {
	return operacao(a, b);
}

// Exemplo de HOF que RETORNA uma função
function criarMultiplicador(fator) {
	return function (numero) {
		return numero * fator;
	};
}

// ——————————————————————————————————————

const numeros = [1, 2, 3, 4, 5];

// A arrow function passada para o .filter() é um CALLBACK SÍNCRONO
const pares = numeros.filter((num) => num % 2 === 0);

// ——————————————————————————————————————

// A callback só será enviada para a Call Stack após 1000ms
setTimeout(() => {
	console.log("Executado após 1 segundo");
}, 1000);

// ——————————————————————————————————————

function criarPaginador(itensPorPagina) {
	// 'itensPorPagina' fica gravado no Closure da função interna
	return function (arrayDeDados, pagina) {
		const inicio = (pagina - 1) * itensPorPagina;
		const fim = inicio + itensPorPagina;
		return arrayDeDados.slice(inicio, fim);
	};
}

const paginarPor10 = criarPaginador(10);
const produtos = Array.from({ length: 50 }, (_, i) => `Produto ${i + 1}`);

console.log(paginarPor10(produtos, 1)); // [Produto 1 ... Produto 10]
console.log(paginarPor10(produtos, 2)); // [Produto 11 ... Produto 20]

// ——————————————————————————————————————

// HOF de Autorização / Middleware
const validarPermissao = (permissaoRequerida) => (usuario) => {
	if (!usuario || !usuario.permissoes.includes(permissaoRequerida)) {
		throw new Error(`Acesso negado. Requer permissão: ${permissaoRequerida}`);
	}
	return true;
};

const ehAdmin = validarPermissao("ADMIN");

const usuarioComum = { nome: "Mateus", permissoes: ["USER"] };
const usuarioAdmin = { nome: "Ana", permissoes: ["USER", "ADMIN"] };

// Uso limpo e reutilizável:
try {
	ehAdmin(usuarioAdmin); // OK
	// ehAdmin(usuarioComum); // Lança o erro
} catch (error) {
	console.error(error.message);
}

// ——————————————————————————————————————

// HOF que mede a performance de qualquer função síncrona
function medidorDePerformance(fn) {
	return function (...args) {
		const inicio = performance.now();
		const resultado = fn(...args);
		const fim = performance.now();

		console.log(`[PERF] Função "${fn.name}" levou ${(fim - inicio).toFixed(4)}ms para executar.`);
		return resultado;
	};
}

function processarListaGiga() {
	return Array.from({ length: 1_000_000 }).map((_, i) => i * 2);
}

const processarComLog = medidorDePerformance(processarListaGiga);
processarComLog();
// Output no console: [PERF] Função "processarListaGiga" levou 24.1200ms para executar.

// ——————————————————————————————————————

const numeros2 = ["1", "2", "3"];
const resultado = numeros2.map(parseInt);

console.log(resultado);

// ——————————————————————————————————————

numeros.map((num) => parseInt(num, 10)); // [1, 2, 3]

// ——————————————————————————————————————
