
// ——————————————————————————————————————

try {
  // 1. Bloco onde o código potencialmente perigoso é executado
  const dados = processarEntrada(input);
  console.log(dados);
} catch (error) {
  // 2. Executado APENAS se alguma exceção for lançada no bloco try
  console.error("Falha capturada:", error.message);
} finally {
  // 3. Executado SEMPRE, independentemente de ter ocorrido erro ou sucesso
  fecharConexao();
}

// c

