const express = require("express");
const router = express.Router();
const Cocktails = require("../models/cocktails");
const upload = require("../utils/multerConfig");

// Obtener todos los tragos
router.get("/", (req, res) => {
  Cocktails.getAllCocktails((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Agregar un nuevo trago con imagen
router.post("/", upload.single("image"), (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ error: "Name, ingredients, and preparation are required" });
  }

  Cocktails.addCocktail(name, ingredients, preparation, image_url, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Cocktail added successfully" });
  });
});

// Eliminar un trago
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Cocktails.deleteCocktail(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Cocktail deleted successfully" });
  });
});

module.exports = router;
