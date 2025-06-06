// Importar express y router para el manejo de rutas
const express = require("express");
const router = express.Router();

// Importar los controladores de los productos
const {
	obtenerProductos,
	obtenerProductoPorCodigo,
	altaProducto,
	modificacionProducto,
	bajaProducto,
} = require("../controllers/productoController.js");

// Endpoint: Ruta raíz
// Muestra un mensaje de bienvenida a la API
router.get("/", (req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bienvenidas a supermercado-api</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; text-align: center; padding: 50px; }
        h1 { color: #e50914; }
      </style>
    </head>
    <body>
      <h1>🛒Catálogo de productos</h1>
      <h2>Ingenias: Pre-entrega 2</h2>
    </body>
    </html>
  `);
});

// Endpoint: obtener todos los productos
// Ruta para obtener todos los productos
router.get("/productos", obtenerProductos);

// Endpoint: obtener un producto por código
// Ruta para obtener un producto específico por su código
// Verifica que el código sea un número y lo busca en la base de datos para devolverlo
router.get("/productos/:codigo", obtenerProductoPorCodigo);

// Endpoint: alta de producto
// Ruta para crear un nuevo producto
// Verifica que todos los campos sean válidos y crea un nuevo producto en la base de datos
router.post("/productos/", altaProducto);

// Endpoint: modificación de producto
// Ruta para modificar un producto existente
// Verifica que el código del producto y los campos a modificar sean validos y actualiza el producto en la base de datos
router.put("/productos/:codigo", modificacionProducto);

// Endpoint: baja de producto
// Ruta para eliminar un producto por su código
// Verifica que el código sea un número y elimina el producto de la base de datos
router.delete("/productos/:codigo", bajaProducto);

// Exportar las rutas
module.exports = router;
