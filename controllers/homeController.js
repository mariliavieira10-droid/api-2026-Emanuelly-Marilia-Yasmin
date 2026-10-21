import { createDatabase } from "../database/database.js";
const db = createDatabase("livraria.db");

export function home(req, res) {
  const categorias = db.prepare("SELECT * FROM Categoria").all();

  const maisVendidos = db
    .prepare(
      `
    SELECT l.id_livro, l.titulo, l.preco, c.nome_categoria,
      (SELECT COALESCE(SUM(iv.quantidade), 0)
         FROM Item_Venda iv WHERE iv.id_livro = l.id_livro) AS vendidos,
      (SELECT GROUP_CONCAT(a.nome_autor, ', ')
         FROM Livro_Autor la
         JOIN Autor a ON a.id_autor = la.id_autor
        WHERE la.id_livro = l.id_livro) AS autores
    FROM Livro l
    JOIN Categoria c ON c.id_categoria = l.id_categoria
    ORDER BY vendidos DESC
    LIMIT 4
  `,
    )
    .all();

  const promocao = db
    .prepare("SELECT * FROM Promocao ORDER BY desconto_percentual DESC LIMIT 1")
    .get();

  const stats = {
    livros: db.prepare("SELECT COUNT(*) AS n FROM Livro").get().n,
    clientes: db.prepare("SELECT COUNT(*) AS n FROM Cliente").get().n,
    vendas: db.prepare("SELECT COUNT(*) AS n FROM Venda").get().n,
  };

  res.render("home", { categorias, maisVendidos, promocao, stats });
}