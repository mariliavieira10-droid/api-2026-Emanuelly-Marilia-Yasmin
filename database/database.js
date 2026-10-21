import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";

fs.mkdirSync("databases", { recursive: true });

const createDatabase = (dbName = "livraria.db") => {
  const db = new DatabaseSync(`databases/${dbName}`);
  db.exec("PRAGMA foreign_keys = ON");
  return db;
};

export { createDatabase };