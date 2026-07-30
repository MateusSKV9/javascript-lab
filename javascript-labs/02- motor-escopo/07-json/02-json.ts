export class SafeJSON {
	/**
	 * Converte uma string JSON em um tipo esperado de forma segura sem estourar exceções.
	 */
	static parse<T>(jsonString: string, fallbackValue: T): T {
		try {
			if (!jsonString) return fallbackValue;
			return JSON.parse(jsonString) as T;
		} catch {
			return fallbackValue;
		}
	}

	/**
	 * Serializa um objeto tratando BigInt e prevenindo exceções por referências circulares.
	 */
	static stringify(value: unknown, indent?: number): string | null {
		try {
			const seen = new WeakSet();

			return JSON.stringify(
				value,
				(key, val) => {
					// Trata BigInt
					if (typeof val === "bigint") {
						return val.toString();
					}

					// Trata referências circulares
					if (typeof val === "object" && val !== null) {
						if (seen.has(val)) {
							return "[Circular]";
						}
						seen.add(val);
					}

					return val;
				},
				indent
			);
		} catch (error) {
			console.error("Falha ao serializar valor para JSON:", error);
			return null;
		}
	}
}
