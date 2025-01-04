const db = require("../database/db");

// Crear tabla de productos si no existe
const createProductsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL
    )
  `;
  try {
    db.prepare(query).run();
    console.log("Products table created or already exists.");
  } catch (err) {
    console.error("Error creating products table:", err);
  }
};

createProductsTable();

module.exports = {
  getAllProducts: () => {
    try {
      return db.prepare("SELECT * FROM products").all();
    } catch (err) {
      console.error("Error fetching products:", err);
      throw err;
    }
  },
  addProduct: (name, quantity) => {
    const query = `
      INSERT INTO products (name, quantity)
      VALUES (?, ?)
    `;
    try {
      db.prepare(query).run(name, quantity);
    } catch (err) {
      console.error("Error adding product:", err);
      throw err;
    }
  },
  deleteProduct: (id) => {
    const query = "DELETE FROM products WHERE id = ?";
    try {
      db.prepare(query).run(id);
    } catch (err) {
      console.error("Error deleting product:", err);
      throw err;
    }
  },
};
