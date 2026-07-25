// Exemplo 1: Quantidade de produtos em estoque (0 é um valor válido!)
const estoqueDisponivel = 0;
const quantidade = estoqueDisponivel || 10;

console.log(quantidade); // 10 ❌ BUG! Sobrescreveu o estoque 0!

// Exemplo 2: Configuração de notificações ativadas (false é válido!)
const notificacoesAtivas1 = false;
const statusFinal1 = notificacoesAtivas1 || true;

console.log(statusFinal1); // true ❌ BUG! Ignorou o false do usuário!

// ——————————————————————————————————————

// Corrigindo os bugs anteriores com ??:

const estoqueDisponivel2 = 0;
const quantidade2 = estoqueDisponivel2 ?? 10;
console.log(quantidade); // 0 ✅ Manteve o número 0!

const notificacoesAtivas = false;
const statusFinal = notificacoesAtivas ?? true;
console.log(statusFinal); // false ✅ Manteve o booleano false!

// Só usa o fallback se for null ou undefined:
const valorNull = null;
const valorUndefined = undefined;

console.log(valorNull ?? "Padrão"); // "Padrão"
console.log(valorUndefined ?? "Padrão"); // "Padrão"

// ——————————————————————————————————————

const usuario2 = { id: 1 };

// Se usuario ou endereco forem null/undefined, retorna undefined sem dar erro!
const rua = usuario2?.endereco?.rua;
console.log(rua); // undefined

// Funciona também para Métodos e Arrays!
const respostaAPI = {
	dados: null,
	executar: null,
};

// Executando método opcional:
respostaAPI.executar?.(); // Não faz nada e não quebra!

// Acessando índice de array opcional:
const primeiroItem = respostaAPI.dados?.[0]; // undefined

// ——————————————————————————————————————

const usuario = "Mateus";
const cargo = "Desenvolvedor";

const mensagem = `
  Olá, ${usuario}!
  Seu status atual é: ${cargo === "Desenvolvedor" ? "Ativo" : "Inativo"}.
`;

// ——————————————————————————————————————

function destacar(strings, ...valores) {
	return strings.reduce((acc, str, i) => {
		const valor = valores[i] ? `<strong>${valores[i]}</strong>` : "";
		return `${acc}${str}${valor}`;
	}, "");
}

const nome2 = "Mateus";
const tecnologia = "React";

// A função 'destacar' é invocada antes da string ser montada
const html = destacar`O dev ${nome2} domina ${tecnologia}.`;

console.log(html);
// "O dev <strong>Mateus</strong> domina <strong>React</strong>."

// ——————————————————————————————————————

const pessoa = {
	nome: "Mateus",
	idade: 22,
	redes: { github: "mateussilva" },
};

// 1. Desestruturação básica
const { nome, idade } = pessoa;

// 2. Renomeando variáveis (Alias)
const { nome: nomeCompleto } = pessoa; // 'nome' vira 'nomeCompleto'

// 3. Valores Padrão (Fallback)
const { tema = "dark" } = pessoa; // Se 'tema' for undefined, assume "dark"

// 4. Desestruturação Aninhada
const {
	redes: { github },
} = pessoa;
console.log(github); // "mateussilva"

// ——————————————————————————————————————

const coordenadas = [10, 20, 30];

// Extrai pela ordem dos índices
const [x, y] = coordenadas; // x = 10, y = 20 (30 foi ignorado)

// Pulando elementos
const [, , z] = coordenadas; // z = 30

// Uso com o Operador Rest (...)
const [primeiro, ...resto] = [1, 2, 3, 4, 5];
console.log(primeiro); // 1
console.log(resto); // [2, 3, 4, 5]

// ——————————————————————————————————————

// Função para extrair dados de perfil de uma API
function processarPerfilUsuario(respostaAPI) {
	// Desestrutura com fallback seguro usando ?? e ?.
	const nome = respostaAPI?.data?.user?.nome ?? "Usuário Anônimo";
	const avatar = respostaAPI?.data?.user?.midia?.avatar ?? "/default-avatar.png";
	const tentativas = respostaAPI?.data?.user?.metricas?.tentativas ?? 0;

	return { nome, avatar, tentativas };
}

// ——————————————————————————————————————

// ❌ Padrão antigo e propenso a erros (ordem importa!)
function criarServidor(porta, host, ssl, limiteTimeout) {}

// ✅ Padrão moderno (Named Parameters com Destructuring e Fallbacks)
function criarServidor({ porta = 3000, host = "localhost", ssl = false } = {}) {
	console.log(`Rodando em http://${host}:${porta} (SSL: ${ssl})`);
}

// Invocação limpa sem se preocupar com a ordem:
criarServidor({ porta: 8080 });
