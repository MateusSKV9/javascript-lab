// ——————————————————————————————————————

const produto = {
	id: "p100",
	nome: "Teclado Mecânico",
	preco: 250,
};

Object.keys(produto); // ["id", "nome", "preco"] -> Array com os nomes das chaves
Object.values(produto); // ["p100", "Teclado Mecânico", 250] -> Array com os valores
Object.entries(produto); // [["id", "p100"], ["nome", "Teclado Mecânico"], ["preco", 250]]

/// ——————————————————————————————————————

const configuracoesPadrao = { tema: "dark", notificacoes: true };
const preferenciasUsuario = { tema: "light" };

// Mesclando no objeto alvo (Cria um novo objeto se passarmos {} como 1º argumento)
const configFinal = Object.assign({}, configuracoesPadrao, preferenciasUsuario);
// { tema: "light", notificacoes: true }

/// ——————————————————————————————————————

("use strict"); // Em strict mode, tentativas de mutação lançam TypeError

const configuracao = Object.freeze({
	ambiente: "production",
	porta: 8080,
});

configuracao.porta = 3000; // Uncaught TypeError: Cannot assign to read only property 'porta'

/// ——————————————————————————————————————

const config = Object.freeze({
	db: { host: "localhost" },
});

config.db.host = "192.168.0.1"; // FUNCIONA! O objeto interno 'db' não foi congelado.

/// ——————————————————————————————————————

const usuario = { nome: "Mateus" };

Object.hasOwn(usuario, "nome"); // true
Object.hasOwn(usuario, "toString"); // false (toString vem do Object.prototype!)

/// ——————————————————————————————————————

// Exemplo que QUEBRA o método antigo:
const objSemPrototipo = Object.create(null);
objSemPrototipo.id = 123;

// objSemPrototipo.hasOwnProperty("id"); // Uncaught TypeError: objSemPrototipo.hasOwnProperty is not a function

// FUNCIONA com Object.hasOwn():
Object.hasOwn(objSemPrototipo, "id"); // true (Seguro e garantido!)

/// ——————————————————————————————————————

function removerCamposVazios(objetoFiltros) {
	// Converte em pares [chave, valor], filtra null/undefined/string vazia e reconstrói o objeto
	return Object.fromEntries(
		Object.entries(objetoFiltros).filter(([_, valor]) => {
			return valor !== null && valor !== undefined && valor !== "";
		})
	);
}

const payloadFormulario = {
	nome: "Mateus",
	status: "",
	categoria: null,
	ordem: "ASC",
};

console.log(removerCamposVazios(payloadFormulario));
// Output: { nome: "Mateus", ordem: "ASC" }

/// ——————————————————————————————————————

function deepFreeze(objeto) {
	// Congela o objeto atual
	Object.freeze(objeto);

	// Percorre todas as propriedades
	Object.values(objeto).forEach((valor) => {
		// Se o valor for um objeto válido e ainda não estiver congelado, congela recursivamente
		if (valor && typeof valor === "object" && !Object.isFrozen(valor)) {
			deepFreeze(valor);
		}
	});

	return objeto;
}

const configApp = deepFreeze({
	api: {
		endpoints: { auth: "/v1/auth" },
	},
});

// Tentativa de mutação em nível profundo
// configApp.api.endpoints.auth = "/v2/auth"; // Lança TypeError em strict mode!

/// ——————————————————————————————————————
