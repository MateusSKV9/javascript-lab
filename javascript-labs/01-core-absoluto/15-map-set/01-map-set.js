// ——————————————————————————————————————

const sessões = new Map();

const usuarioMateus = { id: 1, nome: "Mateus" };
const usuarioAna = { id: 2, nome: "Ana" };

// 1. .set(chave, valor) - Adiciona/Atualiza (retorna o próprio Map, permite encadeamento)
sessões.set(usuarioMateus, { token: "abc-123", expiracao: "2h" });
sessões.set(usuarioAna, { token: "xyz-789", expiracao: "1h" });

// 2. .get(chave) - Recupera em O(1) usando a referência
console.log(sessões.get(usuarioMateus));
// Output: { token: "abc-123", expiracao: "2h" }

// 3. .has(chave) - Verifica existência em O(1)
console.log(sessões.has(usuarioAna)); // true

// 4. .delete(chave) - Remove em O(1)
sessões.delete(usuarioAna);

// 5. .size - Tamanho instantâneo
console.log(sessões.size); // 1

// 6. Iteração direta de pares [chave, valor]
for (const [usuario, dadosSessao] of sessões) {
	console.log(`${usuario.nome} está logado com token ${dadosSessao.token}`);
}

// ——————————————————————————————————————

const mapa = new Map();

mapa.set({ id: 1 }, "Dados");

// Retorna undefined porque é um NOVO objeto na memória (referência diferente):
console.log(mapa.get({ id: 1 })); // undefined

// ——————————————————————————————————————

const tagsComDuplicatas = ["react", "nextjs", "javascript", "react", "css", "nextjs"];

// Remoção instantânea de duplicados em O(N):
const tagsUnicas = [...new Set(tagsComDuplicatas)];

console.log(tagsUnicas); // ["react", "nextjs", "javascript", "css"]

// ——————————————————————————————————————

const usuariosOnline = new Set();

// 1. .add(valor) - Adiciona (se já existir, ignora silenciosamente)
usuariosOnline.add("user_101");
usuariosOnline.add("user_102");
usuariosOnline.add("user_101"); // Ignorado!

console.log(usuariosOnline.size); // 2

// 2. .has(valor) - Checagem O(1)
if (usuariosOnline.has("user_101")) {
	console.log("Usuário está online!");
}

// 3. .delete(valor) - Remoção O(1)
usuariosOnline.delete("user_102");

// 4. .clear() - Esvazia o Set
usuariosOnline.clear();

// ——————————————————————————————————————

const cacheDePermissoes = new Map();

function obterPermissoesDoUsuario(usuario) {
	// Se já existir no cache, retorna em O(1)
	if (cacheDePermissoes.has(usuario)) {
		return cacheDePermissoes.get(usuario);
	}

	// Cálculo caro / Consulta de banco hipotética:
	const permissoes = usuario.cargo === "admin" ? ["READ", "WRITE", "DELETE"] : ["READ"];

	// Salva no Map usando o PRÓPRIO objeto de usuário como chave
	cacheDePermissoes.set(usuario, permissoes);
	return permissoes;
}

// ——————————————————————————————————————

const permissoesGrupoA = new Set(["READ", "WRITE"]);
const permissoesGrupoB = new Set(["WRITE", "EXECUTE"]);

// 1. Intersecção: O que existe em AMBOS os conjuntos
const intersecção = permissoesGrupoA.intersection(permissoesGrupoB);
console.log([...intersecção]); // ["WRITE"]

// 2. União: Combinação de ambos sem duplicatas
const uniao = permissoesGrupoA.union(permissoesGrupoB);
console.log([...uniao]); // ["READ", "WRITE", "EXECUTE"]

// 3. Diferença: O que está no Grupo A mas NÃO no Grupo B
const diferença = permissoesGrupoA.difference(permissoesGrupoB);
console.log([...diferença]); // ["READ"]

// ——————————————————————————————————————

// Excelente para associar dados a instâncias de componentes/DOM sem impedir o GC
const metadadosPrivados = new WeakMap();

let elementoDOM = { id: "botao-submit" };

metadadosPrivados.set(elementoDOM, { cliques: 0, ultimoAcesso: Date.now() });

// Se o elemento DOM for removido da página e a variável for limpa:
elementoDOM = null;

// Na próxima varredura do Garbage Collector, os metadados no WeakMap
// serão removidos automaticamente da memória sem risco de Memory Leak!
