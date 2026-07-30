// ——————————————————————————————————————

function criarGeradorDeId(prefixo: string) {
	let contador = 0; // Variável 'preservada' na closure

	return function () {
		contador++;
		return `${prefixo}_${contador}`;
	};
}

const gerarUserId = criarGeradorDeId("usr");

console.log(gerarUserId()); // "usr_1"
console.log(gerarUserId()); // "usr_2"

// ——————————————————————————————————————

type Fetcher<T> = (param: string) => Promise<T>;

interface CacheOptions {
	ttlInSeconds: number;
}

// Factory com Closure para criar um cliente HTTP com Cache Inteligente
export function createCachedFetcher<T>(fetcherFn: Fetcher<T>, options: CacheOptions) {
	// Estado privado preservado via Closure no Lexical Environment da factory
	const cache = new Map<string, { data: T; timestamp: number }>();

	return async function execute(param: string): Promise<T> {
		const now = Date.now();
		const cachedEntry = cache.get(param);

		if (cachedEntry && now - cachedEntry.timestamp < options.ttlInSeconds * 1000) {
			console.log(`[Cache Hit] Retornando dados em cache para: ${param}`);
			return cachedEntry.data;
		}

		console.log(`[Cache Miss] Buscando novos dados para: ${param}`);
		const freshData = await fetcherFn(param);

		// Muta o estado interno mantido pela closure
		cache.set(param, { data: freshData, timestamp: now });

		return freshData;
	};
}

// --- Uso Prático ---
const fetchUserData = async (id: string) => ({ id, name: "Mateus" });

const getCachedUser = createCachedFetcher(fetchUserData, { ttlInSeconds: 60 });

// Chamadas subsequentes dentro de 60s usarão o Map 'cache' isolado na closure

// ——————————————————————————————————————
