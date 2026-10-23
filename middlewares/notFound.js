export default function notFound(req, res, next) {
  const erro = new Error(`Página não encontrada: ${req.originalUrl}`);
  erro.status = 404;
  next(erro);
}