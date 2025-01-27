const { Pool } = require("pg");
const format = require("pg-format");

// Configuración de la base de datos
// Parámetros de conexión a PostgreSQL
const pool = new Pool({
  host: "localhost",
  database: "joyas",
  user: "postgres",
  password: "postgre", // Reemplazar por contraseña PostgreSQL
  port: 5432,
});

// Función para obtener joyas con HATEOAS, límites, paginación y ordenamiento
const obtenerJoyas = async ({ limits = 10, page = 1, order_by = "id_ASC" }) => {
  const [campo, direccion] = order_by.split("_");

  const offset = (page - 1) * limits; // Paginación

  // Consulta SQL usando pg-format para evitar SQL injection
  const query = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    campo,
    direccion,
    limits,
    offset
  );

  try {
    // Ejecutar la consulta
    const { rows } = await pool.query(query);

    // Estructura HATEOAS para devolver un enlace por cada joya
    return {
      total: rows.length,
      results: rows.map((j) => ({
        nombre: j.nombre,
        href: `/joyas/${j.id}`,
      })),
    };
  } catch (error) {
    console.error("Error ejecutando la consulta:", error); // Log de errores
    throw error;
  }
};

// Filtrar joyas por parámetros
const obtenerJoyasFiltradas = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  const filtros = [];
  const valores = [];

  // Agregar un filtro a la consulta
  const agregarFiltro = (campo, operador, valor) => {
    filtros.push(`${campo} ${operador} $${valores.length + 1}`);
    valores.push(valor);
  };

  // Agregar filtros según los parámetros recibidos
  if (precio_min) agregarFiltro("precio", ">=", precio_min);
  if (precio_max) agregarFiltro("precio", "<=", precio_max);
  if (categoria) agregarFiltro("categoria", "=", categoria);
  if (metal) agregarFiltro("metal", "=", metal);

  // Consulta SQL
  let query = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    // Si hay filtros, los concateno con "AND"
    query += ` WHERE ${filtros.join(" AND ")}`;
  }

  // Ejecutar la consulta en la base de datos con los valores parametrizados
  try {
    const { rows } = await pool.query(query, valores);
    return rows;
  } catch (error) {
    console.error("Error ejecutando la consulta con filtros:", error);
    throw error;
  }
};

module.exports = { obtenerJoyas, obtenerJoyasFiltradas };
