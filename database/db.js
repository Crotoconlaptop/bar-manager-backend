const sqlite3 = require("sqlite3").verbose();

const DB_PATH = process.env.DATABASE_URL || "./database/bar_manager.db";


// Crear conexión a la base de datos
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;
