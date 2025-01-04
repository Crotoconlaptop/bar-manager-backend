const db = require("../database/db");

// Crear tabla de cocktails si no existe
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
  try {
    db.prepare(query).run();
    console.log("Cocktails table created or already exists.");
  } catch (err) {
    console.error("Error creating cocktails table:", err);
  }
};

createCocktailsTable();

module.exports = {
  getAllCocktails: () => {
    try {
      return db.prepare("SELECT * FROM cocktails").all();
    } catch (err) {
      console.error("Error fetching cocktails:", err);
      throw err;
    }
  },
  addCocktail: (name, ingredients, preparation, image_url) => {
    const query = `
      INSERT INTO cocktails (name, ingredients, preparation, image_url)
      VALUES (?, ?, ?, ?)
    `;
    try {
      db.prepare(query).run(name, ingredients, preparation, image_url);
    } catch (err) {
      console.error("Error adding cocktail:", err);
      throw err;
    }
  },
  deleteCocktail: (id) => {
    const query = "DELETE FROM cocktails WHERE id = ?";
    try {
      db.prepare(query).run(id);
    } catch (err) {
      console.error("Error deleting cocktail:", err);
      throw err;
    }
  },
};
