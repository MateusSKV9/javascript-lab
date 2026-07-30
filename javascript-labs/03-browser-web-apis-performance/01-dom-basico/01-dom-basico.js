// ——————————————————————————————————————

// Selecionando elementos
const submitBtn = document.querySelector(".btn-primary");
const activeCards = document.querySelectorAll(".card.active");

// Iterando sobre um NodeList (possui .forEach)
activeCards.forEach((card) => card.classList.add("highlight"));

// ——————————————————————————————————————

const button = document.querySelector("#save-btn");

const handleSave = (event) => {
	event.preventDefault(); // Impede comportamento padrão (ex: submit de form)
	console.log("Salvo com sucesso!");
};

// Registrando o listener no bubbling (padrão)
button.addEventListener("click", handleSave);

// Clean-up/Desalocação de memória (fundamental para evitar memory leaks)
// button.removeEventListener('click', handleSave);

// ——————————————————————————————————————

const modal = document.querySelector(".modal");

modal.classList.add("visible");
modal.classList.remove("hidden");

// Retorna true/false e alterna o estado
const isDark = modal.classList.toggle("dark-theme");

// ——————————————————————————————————————

// HTML: <article data-article-id="42" data-is-published="true"></article>
const article = document.querySelector("article");

console.log(article.dataset.articleId); // "42"
article.dataset.isPublished = "false"; // Atualiza no HTML para data-is-published="false"

// ——————————————————————————————————————

// 1. Cria o elemento na memória
const newCard = document.createElement("div");
newCard.classList.add("card");

// 2. Configura conteúdo e atributos
newCard.textContent = "Novo Item";

// 3. Insere na árvore do DOM
const container = document.querySelector(".container");
container.appendChild(newCard); // Anexa no final do container

// ——————————————————————————————————————

/**
 * Arquitetura Limpa no DOM:
 * Usamos Delegação de Eventos para anexar apenas 1 listener no container pai,
 * economizando memória e tratando elementos criados dinamicamente.
 */

class TaskManager {
	#listContainer;

	constructor(containerSelector) {
		this.#listContainer = document.querySelector(containerSelector);
		this.#initEvents();
	}

	// Event Delegation
	#initEvents() {
		this.#listContainer.addEventListener("click", (event) => {
			const deleteBtn = event.target.closest('[data-action="delete"]');
			if (!deleteBtn) return;

			const taskItem = deleteBtn.closest(".task-item");
			if (taskItem) {
				this.#removeTask(taskItem);
			}
		});
	}

	addTask(text) {
		const li = document.createElement("li");
		li.className = "task-item";
		li.dataset.taskId = crypto.randomUUID();

		const span = document.createElement("span");
		span.textContent = text; // Previne XSS automaticamente (diferente de innerHTML)

		const button = document.createElement("button");
		button.textContent = "Excluir";
		button.dataset.action = "delete";

		li.append(span, button);
		this.#listContainer.appendChild(li);
	}

	#removeTask(taskElement) {
		taskElement.remove(); // Método moderno para remover nós do DOM diretamente
	}
}

// Uso:
const manager = new TaskManager("#task-list");
manager.addTask("Estudar Event Delegation no DOM");
