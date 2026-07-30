// ——————————————————————————————————————

function mostrarThis() {
	"use strict";
	console.log(this);
}

mostrarThis(); // undefined

// ——————————————————————————————————————

const usuario = {
	nome: "Mateus",
	saudar() {
		console.log(`Olá, eu sou ${this.nome}`);
	},
};

usuario.saudar(); // "Olá, eu sou Mateus" (this = usuario)

// ——————————————————————————————————————

const saudarFn = usuario.saudar;
saudarFn(); // TypeError ou "Olá, eu sou undefined" (o 'this' virou global/undefined)

// ——————————————————————————————————————

function apresentar(linguagem1, linguagem2) {
	console.log(`${this.nome} programa em ${linguagem1} e ${linguagem2}`);
}

const dev = { nome: "Mateus" };

// 1. .call() -> Invoca imediatamente com lista de argumentos
apresentar.call(dev, "TypeScript", "React");

// 2. .apply() -> Invoca imediatamente com array de argumentos
apresentar.apply(dev, ["TypeScript", "React"]);

// 3. .bind() -> Retorna uma nova função fixada
const apresentarDev = apresentar.bind(dev, "TypeScript");
apresentarDev("Next.js"); // "Mateus programa em TypeScript e Next.js"

// ——————————————————————————————————————

const contador = {
	valor: 0,
	iniciar() {
		// Aqui no 'iniciar()', o 'this' é o objeto 'contador'
		setTimeout(() => {
			// Como é uma Arrow Function, ela herda o 'this' do método 'iniciar()'
			this.valor++;
			console.log(this.valor); // 1
		}, 1000);
	},
};

contador.iniciar();

// ——————————————————————————————————————

type NotificationType = "EMAIL" | "SMS";

export class NotificationService {
	private readonly providerName: string;

	constructor(providerName: string) {
		this.providerName = providerName;
	}

	// ✅ Método de classe usando Arrow Function:
	// Garante 'this' léxico permanente (bind automático ao instanciar a classe).
	public send = async (type: NotificationType, recipient: string): Promise<void> => {
		console.log(`[${this.providerName}] Enviando ${type} para ${recipient}...`);
	};

	public processBatch(recipients: string[], type: NotificationType) {
		// Como 'send' preserva o 'this' via Arrow Function,
		// podemos passá-lo diretamente como callback sem perder o contexto!
		recipients.forEach((recipient) => this.send(type, recipient));
	}
}

// Uso Prático:
const service = new NotificationService("AWS SES");
const sendFn = service.send;

// Mesmo desvinculado do objeto, o 'this' continua sendo a instância de NotificationService
sendFn("EMAIL", "dev@empresa.com");
