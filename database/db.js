const Database = require("better-sqlite3");

const DB_PATH = process.env.DATABASE_URL || "./database/bar_manager.db";

// Crear conexión a la base de datos
let db;
try {
  db = new Database(DB_PATH, { verbose: console.log });
  console.log("Connected to SQLite database");
} catch (err) {
  console.error("Error connecting to SQLite database", err);
}

module.exports = db;
