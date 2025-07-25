const {
	connectToMongoDB,
	closeMongoDBConnection,
} = require("../database/connection"); // Importar funciones para conectar y cerrar la conexión a MongoDB

// Controlador para mostrar todos los productos
const obtenerProductos = async (req, res) => {
	const client = await connectToMongoDB();

	if (!client) {
		return res
			.status(500)
			.json({ error: "Error al conectar a la base de datos" });
	}

	const db = client.db("supermercado");

	try {
		const productos = await db.collection("productos").find().toArray();
		res.status(200).json(productos);
	} catch (error) {
		console.error("Error al obtener productos:", error);
		res.status(500).json({ error: "Error al obtener productos" });
	} finally {
		await closeMongoDBConnection();
	}
};

// Controlador para obtener un producto por su nombre
const obtenerProductoPorNombre = async (req, res) => {
	const nombre = req.params.nombre;

	if (!nombre) {
		return res
			.status(400)
			.json({ error: "El nombre del producto es requerido" });
	}

	// Validar que solo contenga letras y espacios
	if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
		return res.status(400).json({
			error: "El nombre debe ser alfabético (solo letras y espacios)",
		});
	}

	const client = await connectToMongoDB();
	if (!client) {
		return res
			.status(500)
			.json({ error: "Error al conectar a la base de datos" });
	}

	const db = client.db("supermercado");
	try {
		const productos = await db
			.collection("productos")
			.find({ nombre: { $regex: nombre, $options: "i" } }) // búsqueda parcial insensible a mayúsculas consultas MongoDB
			.toArray();

		if (!productos || productos.length === 0) {
			return res
				.status(404)
				.json({ error: "Producto por nombre no encontrado" });
		}
		res.status(200).json(productos);
	} catch (error) {
		console.error("Error al obtener producto:", error);
		res.status(500).json({ error: "Error al obtener producto" });
	} finally {
		await closeMongoDBConnection();
	}
};

// Controlador para obtener un producto por su código
const obtenerProductoPorCodigo = async (req, res) => {
	const codigo = parseInt(req.params.codigo);

	if (isNaN(codigo) || codigo <= 0) {
		return res
			.status(400)
			.json({ error: "El código debe ser un número válido" });
	}

	const client = await connectToMongoDB();
	if (!client) {
		return res
			.status(500)
			.json({ error: "Error al conectar a la base de datos" });
	}

	const db = client.db("supermercado");

	try {
		const producto = await db
			.collection("productos")
			.findOne({ codigo: codigo });
		if (!producto) {
			return res.status(404).json({ error: "Producto no encontrado" });
		}
		res.status(200).json(producto);
	} catch (error) {
		console.error("Error al obtener producto:", error);
		res.status(500).json({ error: "Error al obtener producto" });
	} finally {
		await closeMongoDBConnection();
	}
};

// Controlador para crear un nuevo producto
const altaProducto = async (req, res) => {
	if (Object.keys(req.body).length !== 4) {
		return res.status(400).json({
			error: "Todos los campos son requeridos",
		});
	}

	const codigo = parseInt(req.body.codigo);
	const nombre = req.body.nombre;
	const precio = parseFloat(req.body.precio);
	const categoria = req.body.categoria;

	if (isNaN(codigo) || codigo <= 0) {
		return res
			.status(400)
			.json({ error: "El código debe ser un número válido" });
	}

	if (isNaN(precio) || precio < 0) {
		return res
			.status(400)
			.json({ error: "El precio debe ser un número válido" });
	}

	if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
		return res.status(400).json({
			error: "El nombre debe ser alfabético (solo letras y espacios)",
		});
	}

	if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(categoria)) {
		return res.status(400).json({
			error: "La categoría debe ser alfabética (solo letras y espacios)",
		});
	}

	const client = await connectToMongoDB();

	if (!client) {
		return res
			.status(500)
			.json({ error: "Error al conectar a la base de datos" });
	}

	const db = client.db("supermercado");

	try {
		const productoExistente = await db
			.collection("productos")
			.findOne({ codigo: codigo });

		if (productoExistente) {
			return res
				.status(400)
				.json({ error: "Ya existe un producto con ese código" });
		}

		const nuevoProducto = {
			codigo: codigo,
			nombre: nombre,
			precio: precio,
			categoria: categoria,
		};

		await db.collection("productos").insertOne(nuevoProducto);
		console.log("Producto creado:", nuevoProducto);
		res.status(201).json(nuevoProducto);
	} catch (error) {
		console.error("Error al crear producto:", error);
		res.status(500).json({ error: "Error al crear producto" });
	} finally {
		await closeMongoDBConnection();
	}
};

// Controlador para modificar un producto existente
const modificacionProducto = async (req, res) => {
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({
			error: "Debe proporcionar al menos un campo para modificar",
		});
	}

	const codigo = parseInt(req.params.codigo);
	const nuevoCodigo = parseInt(req.body.codigo);
	const nombre = req.body.nombre;
	const precio = parseFloat(req.body.precio);
	const categoria = req.body.categoria;

	if (isNaN(codigo) || codigo <= 0) {
		return res.status(400).json({
			error: "El código del producto a modificar debe ser un número válido",
		});
	}

	if (req.body.codigo) {
		if (isNaN(nuevoCodigo) || nuevoCodigo <= 0) {
			return res.status(400).json({
				error: "El nuevo código debe ser un número válido",
			});
		}
	}

	if (req.body.precio) {
		if (isNaN(precio) || precio <= 0) {
			return res
				.status(400)
				.json({ error: "El nuevo precio debe ser un número válido" });
		}
	}

	if (req.body.nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
		return res.status(400).json({
			error: "El nombre debe ser alfabético (solo letras y espacios)",
		});
	}

	if (req.body.categoria && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(categoria)) {
		return res.status(400).json({
			error: "La categoría debe ser alfabética (solo letras y espacios)",
		});
	}

	const client = await connectToMongoDB();

	if (!client) {
		return res
			.status(500)
			.json({ error: "Error al conectar a la base de datos" });
	}

	const db = client.db("supermercado");

	try {
		if (nuevoCodigo && nuevoCodigo !== codigo) {
			const productoExistente = await db
				.collection("productos")
				.findOne({ codigo: nuevoCodigo });
			if (productoExistente) {
				return res
					.status(400)
					.json({ error: "Ya existe un producto con ese nuevo código" });
			}
		}
		const productoModificado = {};
		if (nuevoCodigo) productoModificado.codigo = nuevoCodigo;
		if (nombre) productoModificado.nombre = nombre;
		if (precio) productoModificado.precio = precio;
		if (categoria) productoModificado.categoria = categoria;

		const resultado = await db
			.collection("productos")
			.updateOne({ codigo: codigo }, { $set: productoModificado });

		if (resultado.matchedCount === 0) {
			return res.status(404).json({
				error: "Producto a modificar no encontrado",
			});
		}
		if (resultado.modifiedCount === 0) {
			return res.status(400).json({
				error: "No se realizaron cambios en el producto",
			});
		}

		console.log("Producto modificado:", productoModificado);
		res.status(200).json(productoModificado);
	} catch (error) {
		console.error("Error al modificar producto:", error);
		res.status(500).json({ error: "Error al modificar producto" });
	} finally {
		await closeMongoDBConnection();
	}
};

// Controlador para eliminar un producto por su código
const bajaProducto = async (req, res) => {
	const codigo = parseInt(req.params.codigo);

	if (isNaN(codigo) || codigo <= 0) {
		return res
			.status(400)
			.json({ error: "El código debe ser un número válido" });
	}

	const client = await connectToMongoDB();

	if (!client) {
		return res
			.status(500)
			.json({ error: "Error al conectar a la base de datos" });
	}

	const db = client.db("supermercado");

	try {
		const result = await db
			.collection("productos")
			.deleteOne({ codigo: codigo });

		if (result.deletedCount === 0) {
			return res
				.status(404)
				.json({ error: "Producto a eliminar no encontrado" });
		}

		console.log("Producto eliminado:", codigo);
		res.status(204).send();
	} catch (error) {
		console.error("Error al eliminar producto:", error);
		res.status(500).json({ error: "Error al eliminar producto" });
	} finally {
		await closeMongoDBConnection();
	}
};

module.exports = {
	obtenerProductos,
	obtenerProductoPorNombre,
	obtenerProductoPorCodigo,
	altaProducto,
	modificacionProducto,
	bajaProducto,
};
