// ——————————————————————————————————————

// Funciona perfeitamente!
obterStatus();

function obterStatus() {
	console.log("Sistema ativo");
}

// ——————————————————————————————————————

console.log(usuario); // undefined (não lança erro!)
var usuario = "Mateus";
console.log(usuario); // "Mateus"

// Como o JS enxerga internamente:
// var usuario;           <- Elevado na fase 1
// console.log(usuario);  <- Executado na fase 2
// usuario = "Mateus";    <- Atribuição acontece aqui

// ——————————————————————————————————————

{
	// <-- Início da TDZ para 'total'

	// Tentar acessar 'total' aqui lança ReferenceError!
	// console.log(total);

	const taxa = 0.1;
	let total = 100 * taxa; // <-- Fim da TDZ para 'total'

	console.log(total); // 10 (Acesso permitido)
}

// ——————————————————————————————————————

function executar() {
	// A função é chamada DEPOIS da inicialização, então funciona!
	console.log(mensagem);
}

// Início da TDZ de 'mensagem'
let mensagem = "Olá, mundo!"; // Fim da TDZ de 'mensagem'

executar(); // Imprime: "Olá, mundo!"

// ——————————————————————————————————————

// Exemplo Moderno e Limpo em TypeScript

// ❌ Evite: Depender de hoisting de funções espalhadas pelo arquivo
export function inicializarApp() {
	configurarBanco();
	carregarRotas();
}

function configurarBanco() {
	/* ... */
}
function carregarRotas() {
	/* ... */
}

// ✅ Recomendado: Ordem de leitura topo-para-baixo previsível
const configurarBanco = () => {
	/* ... */
};
const carregarRotas = () => {
	/* ... */
};

export const inicializarApp = () => {
	configurarBanco();
	carregarRotas();
};

// ——————————————————————————————————————
