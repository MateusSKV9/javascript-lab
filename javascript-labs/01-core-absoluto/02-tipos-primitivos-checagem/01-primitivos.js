let a = 10;
let b = a; // Copiou o valor '10'
b = 20;

console.log(a); // 10 (a não foi alterado)

// ——————————————————————————————————————

let usuario; // JS atribuiu undefined automaticamente
const busca = { resultado: null }; // Desenvolvedor explicitou que não há resultado

// ——————————————————————————————————————

const s1 = Symbol("id");
const s2 = Symbol("id");

console.log(s1 === s2); // false!

// ——————————————————————————————————————

// Criado adicionando o sufixo 'n' ou via função BigInt()
const idDoBanco = 90071992547409919999n;
const saldoCripto = BigInt("1000000000000000000000000");

// ⚠️ ATENÇÃO: Você NÃO pode misturar BigInt e Number em operações aritméticas!
// 10n + 5 -> TypeError: Cannot mix BigInt and other types
const resultado = 10n + BigInt(5); // 15n

// ——————————————————————————————————————

typeof "Mateus"; // "string"
typeof 100; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof 10n; // "bigint"
typeof function () {}; // "function" (Apesar de funções serem objetos, typeof trata como 'function')

// ——————————————————————————————————————

// ✅ Checagem limpa para validar se é um Objeto Real (não-null, não-array)
function isRealObject(valor) {
	return typeof valor === "object" && valor !== null && !Array.isArray(valor);
}

// ✅ Como checar se um valor é um Número VÁLIDO (Exclui NaN)
function isNumeroValido(valor) {
	return typeof valor === "number" && !Number.isNaN(valor);
}
