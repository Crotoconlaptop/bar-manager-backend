const sqlite3 = require("sqlite3").verbose();

const DB_PATH = "./database/bar_manager.db"; // Ruta para el archivo SQLite

// Crear conexión a la base de datos
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;
