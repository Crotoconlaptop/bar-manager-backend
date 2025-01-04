const db = require("../database/db");

// Crear tabla de pedidos si no existe
const createOrdersTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      products TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending', 'received')),
      received_by TEXT,
      comments TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.run(query, (err) => {
    if (err) {
      console.error("Error creating orders table:", err);
    } else {
      console.log("Orders table created or already exists.");
    }
  });
};

createOrdersTable();

module.exports = {
  getAllOrders: (callback) => {
    const query = "SELECT * FROM orders";
    db.all(query, [], callback);
  },
  addOrder: (products, callback) => {
    const query =
      "INSERT INTO orders (name, products, status) VALUES (datetime('now'), ?, 'pending')";
    db.run(query, [products], callback);
  },
  updateOrder: (id, received_by, comments, callback) => {
    const query = `
      UPDATE orders 
      SET status = 'received', received_by = ?, comments = ? 
      WHERE id = ?
    `;
    db.run(query, [received_by, comments, id], callback);
  },
  deleteOrder: (id, callback) => {
    const query = "DELETE FROM orders WHERE id = ?";
    db.run(query, [id], callback);
  },
};
