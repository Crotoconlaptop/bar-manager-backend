const db = require("../database/db");

// Crear tabla de premixes si no existe
const createPremixesTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS premixes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      preparation TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending', 'ready')),
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    db.prepare(query).run(); // Síncrono en better-sqlite3
    console.log("Premixes table created or already exists.");
  } catch (err) {
    console.error("Error creating premixes table:", err);
  }
};

createPremixesTable();

module.exports = {
  getAllPremixes: () => {
    try {
      return db.prepare("SELECT * FROM premixes").all();
    } catch (err) {
      console.error("Error fetching premixes:", err);
      throw err;
    }
  },
  addPremix: (name, ingredients, preparation, status, image_url) => {
    const query = `
      INSERT INTO premixes (name, ingredients, preparation, status, image_url)
      VALUES (?, ?, ?, ?, ?)
    `;
    try {
      db.prepare(query).run(name, ingredients, preparation, status, image_url);
    } catch (err) {
      console.error("Error adding premix:", err);
      throw err;
    }
  },
  deletePremix: (id) => {
    const query = "DELETE FROM premixes WHERE id = ?";
    try {
      db.prepare(query).run(id);
    } catch (err) {
      console.error("Error deleting premix:", err);
      throw err;
    }
  },
  updatePremixStatus: (id, status) => {
    const query = `
      UPDATE premixes
      SET status = ?
      WHERE id = ?
    `;
    try {
      db.prepare(query).run(status, id);
    } catch (err) {
      console.error("Error updating premix status:", err);
      throw err;
    }
  },
};
