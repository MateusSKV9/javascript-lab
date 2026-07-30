// ——————————————————————————————————————

// ❌ RUIM: Mutação direta do array original
function addRoleBad(user, newRole) {
	user.roles.push(newRole); // Altera o objeto original na memória
	return user;
}

// ✅ BOM: Imutabilidade com Spread Operator (...)
function addRoleGood(user, newRole) {
	return {
		...user,
		roles: [...user.roles, newRole], // Cria uma nova referência na memória
	};
}

// ——————————————————————————————————————

// ❌ RUIM: Impura (depende de estado externo e gera resultado imprevisível)
let taxRate = 0.15;
function calculateTotalBad(amount) {
	return amount + amount * taxRate;
}

// ✅ BOM: Pura (depende apenas dos parâmetros recebidos)
function calculateTotalGood(amount, tax) {
	return amount + amount * tax;
}

// ——————————————————————————————————————

// ❌ RUIM: Função fazendo 3 coisas (Validação, Formatação e Persistência)
async function handleUserBad(userData) {
	if (!userData.email.includes("@")) throw new Error("Invalid email");
	const formattedName = userData.name.trim().toLowerCase();
	await db.users.save({ ...userData, name: formattedName });
}

// ✅ BOM: Responsabilidades separadas
const validateUser = (data) => data.email.includes("@");
const formatUser = (data) => ({ ...data, name: data.name.trim().toLowerCase() });
const saveUser = (data) => db.users.save(data);

// ——————————————————————————————————————

// ❌ RUIM: Aninhamento excessivo (Pyramid of Doom)
function processPaymentBad(user, amount) {
	if (user) {
		if (user.isActive) {
			if (amount > 0) {
				return executeTransaction(user, amount);
			} else {
				throw new Error("Valor inválido");
			}
		} else {
			throw new Error("Usuário inativo");
		}
	} else {
		throw new Error("Usuário não encontrado");
	}
}

// ✅ BOM: Early Return com Guard Clauses (Leitura linear de cima para baixo)
function processPaymentGood(user, amount) {
	if (!user) throw new Error("Usuário não encontrado");
	if (!user.isActive) throw new Error("Usuário inativo");
	if (amount <= 0) throw new Error("Valor inválido");

	// Fluxo principal (Happy Path) isolado e limpo ao final
	return executeTransaction(user, amount);
}

// ——————————————————————————————————————

/**
 * Tipos de Dados (Conceitual)
 * Order: { id, items: [{ price, qty }], status, discountCode }
 */

// 1. Guard Clauses & Validações Isoladas (SRP)
function validateOrder(order) {
	if (!order) throw new Error("Pedido inexistente.");
	if (!Array.isArray(order.items) || order.items.length === 0) {
		throw new Error("O pedido deve conter pelo menos um item.");
	}
}

// 2. Funções Puras de Cálculo
function calculateSubtotal(items) {
	return items.reduce((acc, item) => acc + item.price * item.qty, 0);
}

function calculateDiscount(subtotal, discountCode) {
	const discounts = {
		SUMMER10: 0.1,
		BLACKFRIDAY: 0.3,
	};

	const rate = discounts[discountCode] ?? 0;
	return subtotal * rate;
}

// 3. Imutabilidade na Alteração de Estado
function applyOrderTotals(order, subtotal, discount, total) {
	// Retorna uma NOVA instância do pedido sem mutar o objeto original
	return Object.freeze({
		...order,
		subtotal,
		discount,
		total,
		status: "PROCESSED",
		processedAt: new Date().toISOString(),
	});
}

// 4. Fluxo Principal Combinando Tudo (Clean Code Architecture)
function processOrder(rawOrder) {
	// Guard Clause inicial
	validateOrder(rawOrder);

	// Regras de negócio puras
	const subtotal = calculateSubtotal(rawOrder.items);
	const discount = calculateDiscount(subtotal, rawOrder.discountCode);
	const total = Math.max(0, subtotal - discount);

	// Imutabilidade
	const processedOrder = applyOrderTotals(rawOrder, subtotal, discount, total);

	return processedOrder;
}

// Uso:
const initialOrder = {
	id: "ord_123",
	items: [
		{ price: 100, qty: 2 },
		{ price: 50, qty: 1 },
	],
	discountCode: "SUMMER10",
	status: "DRAFT",
};

const finalOrder = processOrder(initialOrder);

console.log("Original permanece intocado:", initialOrder.status); // 'DRAFT'
console.log("Novo pedido processado:", finalOrder.total); // 225
