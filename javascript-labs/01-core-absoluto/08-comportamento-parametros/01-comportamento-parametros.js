// ——————————————————————————————————————

// A forma legada e problemática
function criarUsuario(nome, idade) {
	idade = idade || 18; // Se idade for 0 (falsy), assume 18!
	return { nome, idade };
}

// ——————————————————————————————————————

function criarUsuario(nome = "Visitante", idade = 18) {
	return { nome, idade };
}

criarUsuario("Mateus", 0); // { nome: "Mateus", idade: 0 } -> Respeita o 0 pois não é undefined!
criarUsuario("Mateus", undefined); // { nome: "Mateus", idade: 18 } -> Ativa o valor padrão
criarUsuario("Mateus", null); // { nome: "Mateus", idade: null } -> ATENÇÃO: null não ativa o padrão!

// ——————————————————————————————————————

// Válido: 'imposto' usa o valor de 'subtotal' que já foi definido
function calcularTotal(subtotal, imposto = subtotal * 0.1) {
	return subtotal + imposto;
}

// ERRO (TDZ - Temporal Dead Zone): 'b' tenta acessar 'a' antes dele ser inicializado
function incorreto(a = b, b = 10) {}

// ——————————————————————————————————————

function somarTudo(...numeros) {
	// 'numeros' é um Array genuíno, com acesso direto a métodos de array
	return numeros.reduce((acc, num) => acc + num, 0);
}

somarTudo(10, 20, 30); // 60

// ——————————————————————————————————————

// VÁLIDO: Separa os dois primeiros e agrupa o restante
function agruparConfiguracoes(ambiente, porta, ...flags) {
	return { ambiente, porta, flags };
}

// ERRO DE SINTAXE (Rest deve ser o último)
// function invalido(...flags, ambiente) {} // Uncaught SyntaxError: Rest element must be last element

// ——————————————————————————————————————

const primos = [2, 3, 5];
const pares = [4, 6, 8];

// Unindo Arrays sem concat()
const combinados = [...primos, ...pares]; // [2, 3, 5, 4, 6, 8]

// Passando elementos de um array como argumentos para uma função
const menorNumero = Math.min(...primos); // Math.min(2, 3, 5) -> 2

// ——————————————————————————————————————

const configuracaoPadrao = { tema: "dark", notificacoes: true, metadata: { versao: 1 } };
const preferenciasUsuario = { tema: "light" };

const configFinal = { ...configuracaoPadrao, ...preferenciasUsuario };
// { tema: "light", notificacoes: true, metadata: { versao: 1 } }

// CUIDADO com a cópia rasa:
configFinal.metadata.versao = 2;
console.log(configuracaoPadrao.metadata.versao); // 2! (Ambos apontam para a mesma referência em memória)

// ——————————————————————————————————————

const estadoInicial = {
	usuario: { id: "123", nome: "Mateus" },
	permissoes: ["ler", "escrever"],
	ativo: true,
};

// Adicionando uma nova permissão sem alterar o objeto/array original (Imutabilidade)
const novoEstado = {
	...estadoInicial,
	permissoes: [...estadoInicial.permissoes, "deletar"],
};

// ——————————————————————————————————————

function requisitar(url, { metodo = "GET", headers = {}, timeout = 5000 } = {}) {
	// Nota o '= {}' acima: garante que a função não quebre caso nenhum objeto seja passado!
	console.log(`Fazendo requisição ${metodo} para ${url} com timeout de ${timeout}ms`);
}

requisitar("https://api.com/v1/users"); // Funciona sem passar o 2º parâmetro!
requisitar("https://api.com/v1/users", { metodo: "POST" });
