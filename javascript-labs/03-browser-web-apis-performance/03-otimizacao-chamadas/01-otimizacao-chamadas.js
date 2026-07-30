// ——————————————————————————————————————

/**
 * Cria uma versão 'debounced' de uma função.
 * @param {Function} fn - Função a ser executada.
 * @param {number} delay - Tempo de espera em milissegundos.
 * @returns {Function} Função otimizada com método .cancel()
 */
function debounce(fn, delay = 300) {
	let timeoutId = null;

	function debounced(...args) {
		// Cancela o temporizador anterior se o evento for disparado novamente
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}

		// Define um novo temporizador
		timeoutId = setTimeout(() => {
			fn.apply(this, args);
			timeoutId = null;
		}, delay);
	}

	// Método utilitário para cancelar chamadas pendentes (ex: ao desmontar componente)
	debounced.cancel = function () {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	};

	return debounced;
}

// ——————————————————————————————————————

/**
 * Cria uma versão 'throttled' de uma função.
 * @param {Function} fn - Função a ser executada.
 * @param {number} limit - Intervalo mínimo entre execuções em milissegundos.
 * @returns {Function} Função otimizada com método .cancel()
 */
function throttle(fn, limit = 200) {
	let lastExecTime = 0;
	let timeoutId = null;

	function throttled(...args) {
		const now = Date.now();
		const elapsedTime = now - lastExecTime;

		if (elapsedTime >= limit) {
			// Se já passou o tempo do limite, executa imediatamente
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
			lastExecTime = now;
			fn.apply(this, args);
		} else if (!timeoutId) {
			// Garante que o último evento disparado dentro do intervalo também seja processado ao final
			timeoutId = setTimeout(() => {
				lastExecTime = Date.now();
				timeoutId = null;
				fn.apply(this, args);
			}, limit - elapsedTime);
		}
	}

	throttled.cancel = function () {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		lastExecTime = 0;
	};

	return throttled;
}

// ——————————————————————————————————————

/**
 * SearchController
 * Combina Debounce para otimizar a digitação e AbortController para cancelar
 * requisições que se tornarem obsoletas na rede.
 */
class SearchController {
	#inputElement;
	#resultsContainer;
	#currentAbortController = null;
	#debouncedSearch;

	constructor(inputSelector, resultsSelector) {
		this.#inputElement = document.querySelector(inputSelector);
		this.#resultsContainer = document.querySelector(resultsSelector);

		// Envolve o método de busca com debounce de 400ms
		this.#debouncedSearch = debounce(this.#executeSearch.bind(this), 400);

		this.#initEvents();
	}

	#initEvents() {
		this.#inputElement.addEventListener("input", (event) => {
			const query = event.target.value.trim();

			if (!query) {
				this.#debouncedSearch.cancel();
				this.#clearResults();
				return;
			}

			// Chama a função debounced
			this.#debouncedSearch(query);
		});
	}

	async #executeSearch(query) {
		// 1. Cancela a requisição HTTP anterior em andamento, se houver
		if (this.#currentAbortController) {
			this.#currentAbortController.abort();
		}

		this.#currentAbortController = new AbortController();

		try {
			this.#setLoading(true);

			const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(query)}`, {
				signal: this.#currentAbortController.signal,
			});

			if (!response.ok) throw new Error("Falha na busca");

			const data = await response.json();
			this.#renderResults(data.items);
		} catch (error) {
			if (error.name !== "AbortError") {
				console.error("Erro na busca:", error);
				this.#renderError();
			}
		} finally {
			this.#setLoading(false);
		}
	}

	#clearResults() {
		this.#resultsContainer.textContent = "";
	}

	#setLoading(isLoading) {
		this.#resultsContainer.setAttribute("aria-busy", String(isLoading));
	}

	#renderResults(items) {
		this.#clearResults();
		const fragment = document.createDocumentFragment();

		items.forEach((item) => {
			const li = document.createElement("li");
			li.textContent = item.name;
			fragment.appendChild(li);
		});

		this.#resultsContainer.appendChild(fragment);
	}

	destroy() {
		this.#debouncedSearch.cancel();
		if (this.#currentAbortController) {
			this.#currentAbortController.abort();
		}
	}
}
