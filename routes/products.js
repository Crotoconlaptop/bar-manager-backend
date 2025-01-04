const express = require("express");
const router = express.Router();
const Products = require("../models/products");

// Obtener todos los productos
router.get("/", (req, res) => {
  Products.getAllProducts((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Agregar un producto
router.post("/", (req, res) => {
  const { name, quantity } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  Products.addProduct(name, quantity || 1, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Product added successfully" });
  });
});

// Eliminar un producto
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Products.deleteProduct(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  });
});

module.exports = router;
