// ——————————————————————————————————————

const pontuacao = 85;

if (pontuacao >= 90) {
	console.log("Excelente");
} else if (pontuacao >= 70) {
	console.log("Aprovado");
} else {
	console.log("Reprovado");
}

// ——————————————————————————————————————

// ❌ Código Pirâmide (difícil de ler e manter)
function processarUsuario(usuario) {
	if (usuario) {
		if (usuario.ativo) {
			if (usuario.temPermissao) {
				return "Acesso liberado";
			} else {
				return "Sem permissao";
			}
		} else {
			return "Usuario inativo";
		}
	} else {
		return "Usuario inexistente";
	}
}

// ✅ Guard Clauses + Early Return (Limpo, plano e legível)
function processarUsuario(usuario) {
	if (!usuario) return "Usuario inexistente";
	if (!usuario.ativo) return "Usuario inativo";
	if (!usuario.temPermissao) return "Sem permissao";

	return "Acesso liberado";
}

// ——————————————————————————————————————

const statusPedido = "PAGO";

switch (statusPedido) {
	case "PENDENTE":
		console.log("Aguardando pagamento");
		break;
	case "PAGO":
	case "ENVIADO": // Fallthrough intencional: PAGO e ENVIADO compartilham lógica se necessário
		console.log("Pedido em processamento");
		break;
	case "CANCELADO":
		console.log("Pedido cancelado");
		break;
	default:
		console.log("Status desconhecido");
}

// ——————————————————————————————————————

const acoesStatus = {
	PENDENTE: () => "Aguardando pagamento",
	PAGO: () => "Pedido em processamento",
	CANCELADO: () => "Pedido cancelado",
};

const mensagem = acoesStatus[statusPedido]?.() ?? "Status desconhecido";

// ——————————————————————————————————————

const idade = 20;
const statusAcesso = idade >= 18 ? "Permitido" : "Negado";

// ——————————————————————————————————————

for (let i = 0; i < 5; i++) {
	console.log(`Índice: ${i}`);
}

// ——————————————————————————————————————

// while: Checa A ANTES de executar (pode rodar 0 vezes)
let tentativas = 0;
while (tentativas < 3) {
	console.log(`Tentativa ${tentativas}`);
	tentativas++;
}

// do...while: Executa UMA VEZ antes de checar a condição (roda no mínimo 1 vez)
let conexaoEstaveis = false;
do {
	console.log("Tentando conectar ao banco...");
} while (conexaoEstaveis);

// ——————————————————————————————————————

const tecnologias = ["React", "TypeScript", "Node.js"];

for (let tech of tecnologias) {
	console.log(tech); // Imprime: "React", "TypeScript", "Node.js"
}

// ——————————————————————————————————————

const numeros = [10, 20, 30];

for (let chave in numeros) {
	console.log(chave); // "0", "1", "2" (Retorna as CHAVES/ÍNDICES como string)
}

for (let valor of numeros) {
	console.log(valor); // 10, 20, 30 (Retorna os VALORES)
}

// ——————————————————————————————————————

for (let i = 1; i <= 5; i++) {
	if (i === 3) continue; // Pula o 3
	if (i === 5) break; // Para o loop antes de imprimir o 5
	console.log(i); // Imprime: 1, 2, 4
}

// ——————————————————————————————————————

async function enviarNotificacoesEmFila(usuarios) {
	for (const usuario of usuarios) {
		if (!usuario.email) continue; // Pula usuários sem e-mail

		// Espera cada envio finalizar antes de ir para o próximo usuário
		await enviarEmail(usuario.email);
	}
}
