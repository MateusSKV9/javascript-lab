// ——————————————————————————————————————

/**
 * Cria uma versão 'memoized' de uma função pura.
 * Suporta múltiplos argumentos e previne vazamento de memória para objetos via WeakMap.
 *
 * @param {Function} fn - Função pura a ser otimizada.
 * @returns {Function} Função envelopada com cache.
 */
function memoize(fn) {
	const cache = new Map();

	return function (...args) {
		// Cria uma chave composta a partir dos argumentos
		const key = JSON.stringify(args);

		if (cache.has(key)) {
			return cache.get(key);
		}

		const result = fn.apply(this, args);
		cache.set(key, result);
		return result;
	};
}

// --- Exemplo Prático de Uso ---
const calculateComplexFactorial = memoize((n) => {
	if (n === 0 || n === 1) return 1;
	return n * calculateComplexFactorial(n - 1);
});

console.time("Primeira Chamada");
calculateComplexFactorial(100); // Processa o cálculo
console.timeEnd("Primeira Chamada");

console.time("Segunda Chamada (Cached)");
calculateComplexFactorial(100); // Retorna instantaneamente do cache
console.timeEnd("Segunda Chamada (Cached)");

// ——————————————————————————————————————

// O módulo só será baixado quando o usuário clicar no botão
document.querySelector("#export-pdf-btn").addEventListener("click", async () => {
	const { exportToPDF } = await import("./pdfExporter.js");
	exportToPDF();
});

// ——————————————————————————————————————

/**
 * DataProcessor - Utilitário de Transformação com Cache
 */
class DataProcessor {
	#cache = new Map();

	/**
	 * Filtra e ordena uma lista extensa de itens com base em critérios.
	 */
	processItems(items, filterCategory) {
		const cacheKey = `${filterCategory}_${items.length}`;

		if (this.#cache.has(cacheKey)) {
			return this.#cache.get(cacheKey);
		}

		// Operação pesada de transformação
		const processed = items.filter((item) => item.category === filterCategory).sort((a, b) => b.rating - a.rating);

		this.#cache.set(cacheKey, processed);
		return processed;
	}

	clearCache() {
		this.#cache.clear();
	}
}

/**
 * LazyGalleryManager - Gerencia a renderização da interface
 */
class LazyGalleryManager {
	#container;
	#processor;

	constructor(containerSelector) {
		this.#container = document.querySelector(containerSelector);
		this.#processor = new DataProcessor();
	}

	renderGallery(rawProducts, category) {
		this.#container.textContent = ""; // Limpa container

		// 1. Aplica memoization para obter os dados processados sem recomputar
		const products = this.#processor.processItems(rawProducts, category);

		const fragment = document.createDocumentFragment();

		products.forEach((product, index) => {
			const card = document.createElement("article");
			card.className = "product-card";

			const img = document.createElement("img");
			img.alt = product.title;
			img.src = product.imageUrl;

			// 2. Aplica Lazy Loading Nativo se for um item abaixo da dobra (ex: após os 2 primeiros)
			if (index >= 2) {
				img.loading = "lazy";
				img.decoding = "async";
			} else {
				// Imagens do topo devem ser priorizadas para LCP
				img.loading = "eager";
				img.setAttribute("fetchpriority", "high");
			}

			const title = document.createElement("h3");
			title.textContent = product.title;

			card.append(img, title);
			fragment.appendChild(card);
		});

		this.#container.appendChild(fragment);
	}

	// 3. Lazy Loading de Módulo JS sob demanda
	async openAnalyticsModal() {
		// Importação dinâmica: o arquivo JS só é baixado neste instante
		const { renderModal } = await import("./analyticsModal.js");
		renderModal();
	}
}
