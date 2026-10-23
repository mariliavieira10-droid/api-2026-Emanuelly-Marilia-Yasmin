import { createDatabase } from "../database/database.js";
const db = createDatabase("livraria.db");

const AUTORES = `(SELECT GROUP_CONCAT(a.nome_autor, ', ')
  FROM Livro_Autor la JOIN Autor a ON a.id_autor = la.id_autor
  WHERE la.id_livro = l.id_livro) AS autores`;

export function listar(req, res) {
  const { cat, q } = req.query;
  let sql = `SELECT l.id_livro, l.titulo, l.preco, c.nome_categoria, ${AUTORES}
    FROM Livro l JOIN Categoria c ON c.id_categoria = l.id_categoria
    WHERE 1 = 1`;
  const params = [];

  if (cat) {
    sql += " AND l.id_categoria = ?";
    params.push(Number(cat));
  }
  if (q) {
    sql += " AND l.titulo LIKE ?";
    params.push(`%${q}%`);
  }
  sql += " ORDER BY l.titulo";

  const livros = db.prepare(sql).all(...params);
  const categorias = db.prepare("SELECT * FROM Categoria").all();
  res.render("livros", { livros, categorias, catAtual: cat, busca: q || "" });
}

export function detalhes(req, res, next) {
  const livro = db
    .prepare(
      `SELECT l.*, c.nome_categoria, f.nome_fornecedor, ${AUTORES}
    FROM Livro l
    JOIN Categoria c ON c.id_categoria = l.id_categoria
    JOIN Fornecedor f ON f.id_fornecedor = l.id_fornecedor
    WHERE l.id_livro = ?`,
    )
    .get(Number(req.params.id));

  if (!livro) {
    const erro = new Error("Livro não encontrado");
    erro.status = 404;
    return next(erro);
  }
  res.render("livros-detalhes", { livro });
}