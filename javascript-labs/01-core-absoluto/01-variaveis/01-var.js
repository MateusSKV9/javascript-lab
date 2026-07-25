// ——————————— Escopo de função ———————————

if (true) {
	var usuario = "Mateus";
}
console.log(usuario); // vaza do if

// ——————————— Hoisting com Inicialização ———————————

console.log(nome); // undefined
var nome = "Mateus";

// ——————————— Redeclaração ———————————

var taxa = 0.1;
var taxa = 0.2;
