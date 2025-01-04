const db = require("../database/db");

module.exports = {
  getAllProducts: (callback) => {
    db.all("SELECT * FROM products", [], callback);
  },
  addProduct: (name, quantity, callback) => {
    const query = "INSERT INTO products (name, quantity) VALUES (?, ?)";
    db.run(query, [name, quantity], callback);
  },
  deleteProduct: (id, callback) => {
    const query = "DELETE FROM products WHERE id = ?";
    db.run(query, [id], callback);
  },
};
