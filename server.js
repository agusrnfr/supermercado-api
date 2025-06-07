require("dotenv").config(); // Leer las variables del .env

const express = require("express");
const app = express();
const routes = require("./routes/productoRoutes.js");

// Usar la variable del .env o usar 3000 por defecto
const PUERTO = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Importar y usar las rutas de productos
app.use("/", routes);

// Middleware para manejar errores 404
app.use((req, res) => {
	res.status(404).send("¡Multiplícate por cero! Esta ruta no existe. 😕");
});

// Iniciar el servidor en el puerto especificado
app.listen(PUERTO, () => {
	console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
