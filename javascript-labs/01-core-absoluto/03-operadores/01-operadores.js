// ——————————————————————————————————————

console.log(5 + 5); // 10 (Adição)
console.log("5" + 5); // "55" (Concatenação - coerção de 5 para string)
console.log("5" - 2); // 3 (Subtração força conversão de "5" para number)
console.log("5" * "2"); // 10 (Multiplicação força conversão)
console.log("cinco" * 2); // NaN (Operação matemática inválida)

//

// Exposição das loucuras do == :
console.log(0 == ""); // true (0 e string vazia viram boolean false)
console.log(0 == "0"); // true
console.log(false == "0"); // true
console.log(null == undefined); // true
console.log([] == false); // true

//

console.log(0 === ""); // false (number !== string)
console.log(0 === "0"); // false
console.log(null === undefined); // false
console.log(10 === 10); // true

//

console.log(0 === ""); // false (number !== string)
console.log(0 === "0"); // false
console.log(null === undefined); // false
console.log(10 === 10); // true

//

console.log("Tema Escuro" || "Tema Claro"); // "Tema Escuro" (parou no 1º Truthy)
console.log("" || "Nome Padrão"); // "Nome Padrão" ("" é Falsy, pegou o próximo)
console.log(null || 0 || false); // false (todos Falsy, retorna o último)

//

const usuario = { nome: "Mateus" };

console.log(!usuario); // false
console.log(!!usuario); // true (converteu o objeto em boolean true)

const textoVazio = "";
console.log(!!textoVazio); // false

//

// ❌ CÓDIGO PERIGOSO
function ListaDeProdutos({ produtos }) {
	return (
		<div>
			{/* Se produtos.length for 0, o JS retorna o número 0 e RENDERIZA O NÚMERO 0 NA TELA! */}
			{produtos.length && <Lista items={produtos} />}
		</div>
	);
}

// ✅ CÓDIGO LIMPO E SEGURO
function ListaDeProdutos({ produtos }) {
	return (
		<div>
			{/* Força o valor numérico a ser um booleano estrito antes de usar o && */}
			{produtos.length > 0 && <Lista items={produtos} />}
			{/* OU usando conversão explícita com !! */}
			{!!produtos.length && <Lista items={produtos} />}
		</div>
	);
}
