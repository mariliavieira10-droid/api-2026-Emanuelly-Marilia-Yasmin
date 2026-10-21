import fs from "node:fs";
import { createDatabase } from "../database/database.js";

console.log("Iniciando...");

fs.rmSync("databases/livraria.db", { force: true });

const db = createDatabase("livraria.db");
console.log("Banco aberto");

const sql = fs.readFileSync("scripts/schema.sql", "utf-8");
db.exec(sql);

console.log("Livros cadastrados:", db.prepare("SELECT COUNT(*) AS n FROM Livro").get());
console.log("Banco populado com sucesso!");