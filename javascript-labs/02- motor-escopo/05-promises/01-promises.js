// ——————————————————————————————————————

const promessaSoberana = new Promise((resolve, reject) => {
	resolve("Sucesso!");
	reject(new Error("Isso será silenciosamente ignorado!"));
});

promessaSoberana.then(console.log); // Imprime: "Sucesso!"

// ——————————————————————————————————————

fetchUserById(42)
	.then((user) => {
		// Retorna um valor simples -> empacotado automaticamente em Promise.resolve(user.name)
		return user.name;
	})
	.then((userName) => {
		// Retorna outra Promise assíncrona -> o encadeamento aguarda sua conclusão
		return fetchUserAvatar(userName);
	})
	.then((avatarUrl) => {
		console.log("URL final:", avatarUrl);
	})
	.catch((error) => {
		// Captura QUALQUER erro ocorrido em qualquer ponto da cadeia acima!
		console.error("Falha no pipeline:", error.message);
	});

// ——————————————————————————————————————

// O que você escreve:
async function carregarDados() {
	const dados = await fetchDados();
	return dados.id;
}

// O que o JS executa em nível conceitual (com Generators/Promises):
function carregarDados() {
	return Promise.resolve(fetchDados()).then((dados) => {
		return dados.id;
	});
}
