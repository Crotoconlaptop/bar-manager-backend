const express = require("express");
const router = express.Router();
const Premixes = require("../models/premixes");
const upload = require("../utils/multerConfig");

// Obtener todos los premixes
router.get("/", (req, res) => {
  Premixes.getAllPremixes((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Agregar un nuevo premix con imagen
router.post("/", upload.single("image"), (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ error: "All fields are required" });
  }

  Premixes.addPremix(name, ingredients, preparation, "pending", image_url, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Premix added successfully" });
  });
});

// Eliminar un premix
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Premixes.deletePremix(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Premix deleted successfully" });
  });
});

// Actualizar el estado de un premix
router.put("/:id/status", (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!["pending", "ready"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  Premixes.updatePremixStatus(id, status, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Premix status updated successfully" });
  });
});

module.exports = router;
