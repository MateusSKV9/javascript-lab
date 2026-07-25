// ——————————— ❌ Abordagem antiga e mutável ———————————

let tarefas = [{ id: 1, texto: "Estudar JS", concluida: false }];
tarefas.push({ id: 2, texto: "Estudar TS", concluida: false });

// ——————————— ✅ Abordagem moderna e limpa (Imutável com const) ———————————

const tarefasIniciais = [{ id: 1, texto: "Estudar JS", concluida: false }];
const novasTarefas = [...tarefasIniciais, { id: 2, texto: "Estudar TS", concluida: false }];

// ——————————— ❌ Uso desnecessário de let ———————————

let mensagem;
if (statusHttp === 200) {
	mensagem = "Sucesso";
} else {
	mensagem = "Erro";
}

const mensagemStatus = statusHttp === 200 ? "Sucesso" : "Erro";
