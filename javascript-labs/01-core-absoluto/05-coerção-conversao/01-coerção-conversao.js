const input = "42";
const numero = Number(input); // Explícito!

// ——————————————————————————————————————

const resultado = "O valor é " + 10; // "O valor é 10" (Number virou String automaticamente)
const subtracao = "20" - 5; // 15 (String virou Number automaticamente)

// ——————————————————————————————————————

// Comportamentos cruciais de borda:
Number(null); // 0
Number(undefined); // NaN
Number(true); // 1
Number(false); // 0

parseInt("px10"); // NaN (começou com letra, o leitor para na hora)
parseInt(""); // NaN

// ——————————————————————————————————————

// 1. String() - Construtor Seguro (Funciona com QUALQUER valor)
String(123); // "123"
String(null); // "null"
String(undefined); // "undefined"
String(true); // "true"

// 2. .toString() - Método de Objeto (Quebra com null ou undefined!)
(123).toString(); // "123"
true.toString(); // "true"

const valorNull = null;
valorNull.toString(); // 💥 TypeError: Cannot read properties of null (reading 'toString')

// ——————————————————————————————————————

Boolean("Mateus"); // true
Boolean(""); // false

// O truque da dupla negação (!!):
// A primeira negação (!) converte para booleano e inverte o valor.
// A segunda negação (!) inverte de volta para o sentido correto.
const temTexto = !!"Texto"; // true
const estaVazio = !!""; // false

// ——————————————————————————————————————

// ⚠️ Pegadinhas Famosas que SÃO TRUTHY (retornam true num if):
if ([]) {
	/* EXECUTADO! Array vazio é TRUTHY */
}
if ({}) {
	/* EXECUTADO! Objeto vazio é TRUTHY */
}
if ("0") {
	/* EXECUTADO! String com '0' dentro é TRUTHY */
}
if ("false") {
	/* EXECUTADO! String com texto é TRUTHY */
}

// ——————————————————————————————————————

1 + "2"; // "12" (Number + String -> String + String)
true + true; // 2    (1 + 1 -> Number)
true + "5"; // "true5"

//

"10" - "2"; // 8  (10 - 2)
"10" * 2; // 20 (10 * 2)
"10" - "abc"; // NaN ("abc" virou NaN no Number("abc"))

// ——————————————————————————————————————

// ❌ Padrão inseguro (soma de strings)
function calcularTotal(precoInput, quantidadeInput) {
	return precoInput * quantidadeInput; // Funciona pela coerção do *, mas se usar + quebra!
}

// ✅ Padrão limpo e explícito (Typescript / JS Moderno)
function calcularTotal(precoInput, quantidadeInput) {
	const preco = parseFloat(precoInput);
	const quantidade = parseInt(quantidadeInput, 10);

	// Validação defensive programming usando IsNaN e Truthy check
	if (Number.isNaN(preco) || Number.isNaN(quantidade)) {
		throw new Error("Valores numéricos inválidos fornecidos.");
	}

	return preco * quantidade;
}

// ——————————————————————————————————————

// ✅ Método 1: A forma mais moderna e limpa (Number.isFinite)
// Ele garante que é do tipo number, NÃO é NaN e NÃO é Infinity
Number.isFinite(42); // true
Number.isFinite("42"); // false (string não passa)
Number.isFinite(NaN); // false

// ✅ Método 2: Manual com typeof
function ehNumeroValido(valor) {
	return typeof valor === "number" && !Number.isNaN(valor);
}

// ——————————————————————————————————————

// ✅ RETORNAM TRUE (São números finitos válidos):
Number.isFinite(42); // true
Number.isFinite(3.14); // true
Number.isFinite(-10); // true
Number.isFinite(0); // true

// ❌ RETORNAM FALSE (Não são números finitos válidos):
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false

// ❌ RETORNAM FALSE (Não são do tipo Number — NÃO faz conversão automática!):
Number.isFinite("42"); // false (É uma String!)
Number.isFinite("abc"); // false
Number.isFinite(null); // false
Number.isFinite(undefined); // false
Number.isFinite(true); // false
