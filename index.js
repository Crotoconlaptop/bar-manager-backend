const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();
const PORT = 8000; // Puerto en el que correrá el backend

// Middlewares
app.use(cors()); // Permitir solicitudes desde cualquier origen
app.use(bodyParser.json()); // Parsear cuerpos en formato JSON

// Servir archivos estáticos desde la carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
const productsRoutes = require("./routes/products"); // Importar las rutas de productos
app.use("/products", productsRoutes); // Todas las rutas de productos estarán disponibles en /products

const premixesRoutes = require("./routes/premixes");
app.use("/premixes", premixesRoutes); // Rutas de premixes estarán disponibles en /premixes

const ordersRoutes = require("./routes/orders");
app.use("/orders", ordersRoutes); // Rutas de pedidos estarán disponibles en /orders

const cocktailsRoutes = require("./routes/cocktails");
app.use("/cocktails", cocktailsRoutes); // Rutas para tragos en /cocktails

// Ruta base de prueba
app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
