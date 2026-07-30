// ——————————————————————————————————————

async function fetchUserData(userId) {
	try {
		const response = await fetch(`https://api.example.com/users/${userId}`, {
			headers: { Accept: "application/json" },
		});

		if (!response.ok) {
			throw new Error(`Erro na requisição: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Falha na comunicação:", error);
		throw error;
	}
}

// ——————————————————————————————————————

// Armazenando objetos complexos via JSON
const userPreferences = { theme: "dark", fontSize: 16 };
localStorage.setItem("prefs", JSON.stringify(userPreferences));

// Recuperando
const savedPrefs = JSON.parse(localStorage.getItem("prefs")) ?? { theme: "light" };

// ——————————————————————————————————————

// Monitorando o status da rede
window.addEventListener("online", () => console.log("Conexão restabelecida"));
window.addEventListener("offline", () => console.log("Sem conexão com a internet"));

// Exemplo de compartilhamento nativo (Mobile/Desktop moderno)
if (navigator.share) {
	navigator.share({ title: "Taskibit", url: "https://example.com" });
}

// ——————————————————————————————————————

// location
console.log(window.location.href, window.location.pathname);
// window.location.href = '/login'; // Redireciona com reload

// history (Navegação SPA sem reload)
const state = { pageId: "dashboard" };
window.history.pushState(state, "", "/dashboard");

// Ouvindo navegação pelo botão "Voltar" do navegador
window.addEventListener("popstate", (event) => {
	console.log("Estado restaurado:", event.state);
});

// ——————————————————————————————————————

async function copyToClipboard(text) {
	try {
		await navigator.clipboard.writeText(text);
		console.log("Copiado com sucesso!");
	} catch (err) {
		console.error("Falha ao copiar:", err);
	}
}

// ——————————————————————————————————————

// Parse e manipulação de parâmetros da URL atual
const currentUrl = new URL(window.location.href);
const searchParams = currentUrl.searchParams;

// Lendo parâmetros
const searchQuery = searchParams.get("q"); // Retorna o valor da query 'q'

// Atualizando/Inserindo parâmetros
searchParams.set("page", "2");
searchParams.set("sort", "desc");

// Gerando a nova string de URL limpa
console.log(currentUrl.toString());

// ——————————————————————————————————————

/**
 * SearchManager
 * Gerencia estado de busca na URL, sincroniza com o histórico,
 * salva preferências no localStorage e permite compartilhar o link.
 */
class SearchManager {
	#storageKey = "app_search_pref";

	constructor() {
		this.init();
	}

	init() {
		// Restaura última busca se a URL atual não tiver parâmetros
		const hasParams = window.location.search.length > 0;
		if (!hasParams) {
			const savedSearch = localStorage.getItem(this.#storageKey);
			if (savedSearch) {
				this.applySearch(savedSearch, false);
			}
		}
	}

	/**
	 * Atualiza a URL sem recarregar a página e salva a preferência.
	 * @param {string} query
	 * @param {boolean} pushHistory
	 */
	applySearch(query, pushHistory = true) {
		const url = new URL(window.location.href);

		if (query) {
			url.searchParams.set("q", query);
			localStorage.setItem(this.#storageKey, query);
		} else {
			url.searchParams.delete("q");
			localStorage.removeItem(this.#storageKey);
		}

		if (pushHistory) {
			// Atualiza a barra de endereço sem reload (Fundamento de SPA)
			window.history.pushState({ query }, "", url.toString());
		} else {
			window.history.replaceState({ query }, "", url.toString());
		}
	}

	async shareCurrentSearch() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			return true;
		} catch {
			return false;
		}
	}
}

// Uso
const search = new SearchManager();
search.applySearch("typescript avançado");
// A URL muda para: .../?q=typescript+avan%C3%A7ado sem dar F5!
