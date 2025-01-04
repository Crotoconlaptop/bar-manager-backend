const db = require("../database/db");

// Crear tabla de tragos si no existe
const createCocktailsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS cocktails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      preparation TEXT NOT NULL,
      image_url TEXT
    )
  `;
  db.run(query, (err) => {
    if (err) {
      console.error("Error creating cocktails table:", err);
    } else {
      console.log("Cocktails table created or already exists.");
    }
  });
};

createCocktailsTable();

module.exports = {
  getAllCocktails: (callback) => {
    const query = "SELECT * FROM cocktails";
    db.all(query, [], callback);
  },
  addCocktail: (name, ingredients, preparation, image_url, callback) => {
    const query =
      "INSERT INTO cocktails (name, ingredients, preparation, image_url) VALUES (?, ?, ?, ?)";
    db.run(query, [name, ingredients, preparation, image_url], callback);
  },
  deleteCocktail: (id, callback) => {
    const query = "DELETE FROM cocktails WHERE id = ?";
    db.run(query, [id], callback);
  },
};
