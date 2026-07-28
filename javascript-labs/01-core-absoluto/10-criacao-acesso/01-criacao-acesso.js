// ——————————————————————————————————————

const usuario = {};

// Criação / Atribuição
usuario.nome = "Mateus";
usuario.idade = 22;

// Acesso
console.log(usuario.nome); // "Mateus"

// ——————————————————————————————————————

const usuario = {};

// Criação com caracteres especiais / números
usuario["primeiro nome"] = "Mateus";
usuario["user-id"] = "usr_9988";
usuario[100] = "Status OK"; // 100 é convertido para a string "100"

// Acesso
console.log(usuario["primeiro nome"]); // "Mateus"

// ——————————————————————————————————————

const mapa = {};
const chaveObjeto = { id: 1 };

mapa[chaveObjeto] = "Valor 1";

// O que aconteceu internamente?
// chaveObjeto.toString() resultou em "[object Object]"
// Portanto: mapa["[object Object]"] = "Valor 1"

console.log(mapa[{ id: 2 }]); // "Valor 1"! (Pois { id: 2 }.toString() também é "[object Object]")

// ——————————————————————————————————————

// Exemplo de handler genérico para formulários
function atualizarCampoFormulario(estadoAtual, evento) {
	const { name, value } = evento.target; // name pode ser "email", "senha", etc.

	return {
		...estadoAtual,
		[name]: value, // Propriedade computada do ES6 (usa Bracket Notation sob o capô)
	};
}

const estado = { email: "", senha: "" };
const novoEstado = atualizarCampoFormulario(estado, {
	target: { name: "email", value: "contato@dev.com" },
});

console.log(novoEstado); // { email: "contato@dev.com", senha: "" }

// ——————————————————————————————————————

function extrairValorAninhado(objeto, caminho) {
	// caminho ex: "usuario.endereco.cidade"
	const chaves = caminho.split(".");

	return chaves.reduce((acc, chave) => {
		// Usando Bracket Notation para navegar dinamicamente
		if (acc && acc[chave] !== undefined) {
			return acc[chave];
		}
		return undefined;
	}, objeto);
}

const payloadAPI = { usuario: { endereco: { cidade: "Jequié" } } };

console.log(extrairValorAninhado(payloadAPI, "usuario.endereco.cidade")); // "Jequié"
console.log(extrairValorAninhado(payloadAPI, "usuario.perfil.foto")); // undefined (sem quebrar a aplicação)

// ——————————————————————————————————————
