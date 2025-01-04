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
  try {
    db.prepare(query).run();
    console.log("Orders table created or already exists.");
  } catch (err) {
    console.error("Error creating orders table:", err);
  }
};

createOrdersTable();

module.exports = {
  getAllOrders: () => {
    try {
      return db.prepare("SELECT * FROM orders").all();
    } catch (err) {
      console.error("Error fetching orders:", err);
      throw err;
    }
  },
  addOrder: (products) => {
    const query = `
      INSERT INTO orders (name, products, status)
      VALUES (datetime('now'), ?, 'pending')
    `;
    try {
      db.prepare(query).run(products);
    } catch (err) {
      console.error("Error adding order:", err);
      throw err;
    }
  },
  updateOrder: (id, received_by, comments) => {
    const query = `
      UPDATE orders
      SET status = 'received', received_by = ?, comments = ?
      WHERE id = ?
    `;
    try {
      db.prepare(query).run(received_by, comments, id);
    } catch (err) {
      console.error("Error updating order:", err);
      throw err;
    }
  },
  deleteOrder: (id) => {
    const query = "DELETE FROM orders WHERE id = ?";
    try {
      db.prepare(query).run(id);
    } catch (err) {
      console.error("Error deleting order:", err);
      throw err;
    }
  },
};
