// ——————————————————————————————————————

function processarPedido() {
	var pedidoId = 9482; // Escopo de Função
	let status = "pago"; // Escopo de Função
}

// console.log(pedidoId); // ReferenceError: pedidoId is not defined

// ——————————————————————————————————————

if (true) {
	var vazou = "Vazo para fora do bloco";
	let protegido = "Fico dentro do bloco";
}

console.log(vazou); // "Vazo para fora do bloco"
// console.log(protegido); // ReferenceError: protegido is not defined

// ——————————————————————————————————————

// Exemplo Clean/Moderno em TypeScript

type UserState = "active" | "inactive";

function calculateAnalytics(users: Array<{ id: string; state: UserState }>) {
	// Bloco isolado para cálculo temporário
	{
		const activeUsers = users.filter((u) => u.state === "active");
		// activeUsers morre imediatamente ao fechar a chave,
		// liberando memória se não houver referências mantidas.
	}

	// O escopo principal permanece limpo
	return { processedAt: new Date() };
}

// ——————————————————————————————————————
