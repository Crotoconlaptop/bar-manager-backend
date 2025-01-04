const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");

// Obtener todos los pedidos
router.get("/", (req, res) => {
  Orders.getAllOrders((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Agregar un nuevo pedido
router.post("/", (req, res) => {
  const { products } = req.body;
  if (!products) {
    return res.status(400).json({ error: "Products are required" });
  }

  Orders.addOrder(products, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Order added successfully" });
  });
});

// Actualizar un pedido a recibido
router.put("/:id", (req, res) => {
  const { received_by, comments } = req.body;
  const { id } = req.params;

  if (!received_by || !comments) {
    return res.status(400).json({ error: "Received by and comments are required" });
  }

  Orders.updateOrder(id, received_by, comments, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Order updated successfully" });
  });
});

// Eliminar un pedido
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Orders.deleteOrder(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  });
});

module.exports = router;
