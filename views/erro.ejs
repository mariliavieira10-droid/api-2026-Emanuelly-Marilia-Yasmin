export default function errorHandler(err, req, res, next) {
  // Se a resposta já começou a ser enviada, deixa o Express encerrar
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  const mensagem =
    status === 500 ? "Ocorreu um erro no servidor. Tente novamente." : err.message;

  // Mostra o erro real só no terminal (não para o usuário)
  console.error(`[ERRO ${status}] ${req.method} ${req.originalUrl} -> ${err.message}`);

  // Se a requisição foi para a API (JSON), responde JSON
  if (req.originalUrl.startsWith("/api") || req.accepts(["html", "json"]) === "json") {
    return res.status(status).json({ erro: mensagem, status });
  }

  res.status(status).render("erro", { status, mensagem });
}