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
  db.run(query, (err) => {
    if (err) {
      console.error("Error creating premixes table:", err);
    } else {
      console.log("Premixes table created or already exists.");
    }
  });
};

createPremixesTable();

module.exports = {
  getAllPremixes: (callback) => {
    const query = "SELECT * FROM premixes";
    db.all(query, [], callback);
  },
  addPremix: (name, ingredients, preparation, status, image_url, callback) => {
    const query =
      "INSERT INTO premixes (name, ingredients, preparation, status, image_url) VALUES (?, ?, ?, ?, ?)";
    db.run(query, [name, ingredients, preparation, status, image_url], callback);
  },
  deletePremix: (id, callback) => {
    const query = "DELETE FROM premixes WHERE id = ?";
    db.run(query, [id], callback);
  },
  updatePremixStatus: (id, status, callback) => {
    const query = "UPDATE premixes SET status = ? WHERE id = ?";
    db.run(query, [status, id], callback);
  },
};

