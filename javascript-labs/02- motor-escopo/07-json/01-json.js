// ——————————————————————————————————————
const usuario = {
	id: 1,
	nome: "Mateus",
	senhaHash: "secr3t_hash",
	criadoEm: new Date(),
};

// 1. Passando um Array de chaves permitidas (White-list):
const jsonFiltrado = JSON.stringify(usuario, ["id", "nome"]);
// Resultado: '{"id":1,"nome":"Mateus"}'

// 2. Passando uma Função Replacer:
const jsonSanitizado = JSON.stringify(usuario, (key, value) => {
	if (key === "senhaHash") return undefined; // Omitir a propriedade
	return value;
});

// ——————————————————————————————————————

const jsonString = '{"id":1,"criadoEm":"2026-07-29T19:00:00.000Z"}';

const usuarioParsed = JSON.parse(jsonString, (key, value) => {
	// Converte automaticamente strings ISO em objetos Date verdadeiros
	if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
		return new Date(value);
	}
	return value;
});

console.log(usuarioParsed.criadoEm instanceof Date); // true!

// ——————————————————————————————————————

const dado = { id: 1n };
// JSON.stringify(dado); // ❌ TypeError: Do not know how to serialize a BigInt

// Solução com Replacer:
JSON.stringify(dado, (_, value) => (typeof value === "bigint" ? value.toString() : value));

// ——————————————————————————————————————
