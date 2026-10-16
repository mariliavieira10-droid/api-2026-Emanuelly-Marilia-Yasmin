
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const pastaBanco = path.join(__dirname, '..', 'databases');

if (!fs.existsSync(pastaBanco)) {
    fs.mkdirSync(pastaBanco, { recursive: true });
}

const caminhoBanco = path.join(pastaBanco, 'livraria.db');
const db = new Database(caminhoBanco);

db.pragma('foreign_keys = ON');

module.exports = db;