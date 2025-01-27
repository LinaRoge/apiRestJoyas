const express = require("express");
const {
  obtenerJoyas,
  obtenerJoyasFiltradas,
} = require("../controller/controller");
const router = express.Router();

// Obtener joyas con  límite, página y orden
router.get("/", async (req, res) => {
  try {
    const joyas = await obtenerJoyas(req.query);
    res.json(joyas);
  } catch (error) {
    console.error("Error al obtener las joyas:", error);
    res.status(500).send("Error al obtener las joyas");
  }
});

// Obtener joyas filtradas por precio, categoría o metal
router.get("/filtros", async (req, res) => {
  try {
    const joyas = await obtenerJoyasFiltradas(req.query);
    res.json(joyas);
  } catch (error) {
    console.error("Error al filtrar las joyas:", error);
    res.status(500).send("Error al filtrar las joyas");
  }
});

module.exports = router;
