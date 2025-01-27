const express = require("express");
const {
  obtenerJoyas,
  obtenerJoyasFiltradas,
} = require("../controllers/joyasController");
const router = express.Router(); // Grupo de rutas para joyas

// Obtener joyas con opciones como límite, página y orden
router.get("/", async (req, res) => {
  try {
    const joyas = await obtenerJoyas(req.query); // Procesa los parámetros y obtiene las joyas
    res.json(joyas); // Respuesta con las joyas
  } catch (error) {
    console.error("Error al obtener las joyas:", error); // Registra el error
    res.status(500).send("Error al obtener las joyas"); // Respuesta de error
  }
});

// Obtener joyas filtradas por precio, categoría o metal
router.get("/filtros", async (req, res) => {
  try {
    const joyas = await obtenerJoyasFiltradas(req.query); // Filtra las joyas según los parámetros
    res.json(joyas); // Respuesta con las joyas filtradas
  } catch (error) {
    console.error("Error al filtrar las joyas:", error); // Registra el error
    res.status(500).send("Error al filtrar las joyas"); // Respuesta de error
  }
});

module.exports = router; // Exporta las rutas
