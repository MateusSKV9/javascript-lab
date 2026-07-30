// Classe Base para Erros de Domínio/Aplicação
export abstract class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(message: string, statusCode = 500, isOperational = true) {
		super(message);

		// Garante que o nome da classe estendida seja mantido corretamente no name
		this.name = this.constructor.name;
		this.statusCode = statusCode;

		// 'isOperational = true' indica um erro previsto de negócio (ex: validação, não encontrado)
		// 'isOperational = false' indica um bug não previsto ou falha de infraestrutura
		this.isOperational = isOperational;

		// Captura a stack trace limpa omitindo o construtor da própria classe do topo da pilha
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

// Erros Específicos
export class NotFoundError extends AppError {
	constructor(resource: string) {
		super(`${resource} não foi encontrado.`, 404);
	}
}

export class UnauthorizedError extends AppError {
	constructor(reason = "Acesso negado.") {
		super(reason, 401);
	}
}

// ——————————————————————————————————————

try {
	await db.user.create({ data: newUser });
} catch (rawError) {
	// Transforma um erro genérico do banco em um erro semântico da aplicação, preservando a causa
	throw new AppError("Falha ao cadastrar usuário no banco de dados.", 500, true, {
		cause: rawError,
	});
}

// ——————————————————————————————————————

import { AppError, NotFoundError, UnauthorizedError } from "./errors.js";

type UserResponse = { id: string; name: string };

async function fetchUserData(userId: string): Promise<UserResponse> {
	const response = await fetch(`/api/users/${userId}`);

	if (response.status === 404) {
		throw new NotFoundError("Usuário");
	}

	if (response.status === 401) {
		throw new UnauthorizedError("Sessão expirada. Faça login novamente.");
	}

	if (!response.ok) {
		throw new AppError("Erro inesperado na comunicação com o servidor.", response.status);
	}

	return response.json();
}

// Handler de apresentação/controller
export async function handleUserProfileRoute(userId: string) {
	try {
		const user = await fetchUserData(userId);
		console.log("Usuário carregado:", user.name);
	} catch (error) {
		// Tratamento polimórfico usando instanceof (Discriminating by type)
		if (error instanceof AppError) {
			// Erro esperado de negócio: exibe mensagem amigável e código HTTP apropriado
			console.warn(`[HTTP ${error.statusCode}] ${error.message}`);
			return { status: error.statusCode, userMessage: error.message };
		}

		// Erros desconhecidos/bugs de runtime (ex: TypeError)
		console.error("[CRITICAL BUG]:", error);
		return { status: 500, userMessage: "Ocorreu um erro interno instável no sistema." };
	}
}
