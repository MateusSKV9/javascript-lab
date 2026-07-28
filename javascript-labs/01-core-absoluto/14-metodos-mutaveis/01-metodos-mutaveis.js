// ——————————————————————————————————————
const numeros = [3, 1, 2];

// .sort() altera 'numeros' DIRETAMENTE na memória:
numeros.sort();

console.log(numeros); // [1, 2, 3] (O array original FOI ALTERADO!)

// ——————————————————————————————————————

const fila = ["A", "B"];
const novoTamanho = fila.push("C"); // 3
console.log(fila); // ["A", "B", "C"]

// ——————————————————————————————————————

const ultimo = fila.pop(); // "C"
console.log(fila); // ["A", "B"]

// ——————————————————————————————————————

fila.unshift("Z"); // 3
console.log(fila); // ["Z", "A", "B"]

// ——————————————————————————————————————

const primeiro = fila.shift(); // "Z"
console.log(fila); // ["A", "B"]

// ——————————————————————————————————————

// Sintaxe: array.splice(index, deleteCount, item1, item2, ...)

// 1. Remover elementos
const letras = ["a", "b", "c", "d"];
const removidos = letras.splice(1, 2); // Remove 2 elementos a partir do índice 1
console.log(letras); // ["a", "d"]
console.log(removidos); // ["b", "c"]

// 2. Inserir elementos (deleteCount = 0)
const linguagens = ["JS", "Python"];
linguagens.splice(1, 0, "TypeScript", "C++"); // Insere no índice 1 sem deletar nada
console.log(linguagens); // ["JS", "TypeScript", "C++", "Python"]

// 3. Substituir elementos
const status = ["pendente", "processando", "erro"];
status.splice(2, 1, "concluido"); // Substitui 1 elemento no índice 2
console.log(status); // ["pendente", "processando", "concluido"]

// ——————————————————————————————————————

const numeros2 = [10, 2, 5, 1, 100];

// Sem callback (ORDENAÇÃO INCORRETA PARA NÚMEROS):
numeros2.sort();
console.log(numeros2); // [1, 10, 100, 2, 5] (Pois "100" vem antes de "2" textualmente!)

// Com callback numérico (CORRETO):
numeros2.sort((a, b) => a - b); // Crescente
console.log(numeros2); // [1, 2, 5, 10, 100]

numeros2.sort((a, b) => b - a); // Decrescente

// ——————————————————————————————————————

const itens = [1, 2, 3];
itens.reverse();
console.log(itens); // [3, 2, 1]

// ——————————————————————————————————————

const original = [3, 1, 2];

// ES2023: Ordenação totalmente imutável!
const ordenado = original.toSorted((a, b) => a - b);

console.log(original); // [3, 1, 2] (Intacto!)
console.log(ordenado); // [1, 2, 3] (Novo array)
