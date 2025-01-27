const express = require("express");
const cors = require("cors");
const joyasRoutes = require("./routes/routes");

const app = express();

// Rutas
app.use("/joyas", joyasRoutes);

// Ruta por defecto
app.get("*", (req, res) => {
  res.status(404).send("Esta ruta no existe");
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
