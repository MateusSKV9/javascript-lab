const apelido = "";
const nomePadrão = "Mateus";

const resultado = apelido || nomePadrão;

console.log(resultado); // Imprime: "Mateus"
console.log(typeof resultado); // Imprime: "string" (NÃO retornou 'true')

// ——————————————————————————————————————

const usuario = { nome: "Mateus", ativo: true };

const resultado2 = usuario && usuario.nome;

console.log(resultado2); // Imprime: "Mateus" (Retornou a string, não true!)

// ——————————————————————————————————————
