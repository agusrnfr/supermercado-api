require("dotenv").config(); // Leer las variables del .env

const { MongoClient } = require("mongodb");
const URI = process.env.MONGO_URLSTRING; // URI de conexión a MongoDB
const client = new MongoClient(URI);

async function connectToMongoDB() {
	try {
		await client.connect();
		console.log("Conexión a MongoDB exitosa");
		return client;
	} catch (error) {
		console.error("Error al conectar a MongoDB:", error);
		return null;
	}
}

async function closeMongoDBConnection() {
	try {
		await client.close();
		console.log("Conexión a MongoDB cerrada");
	} catch (error) {
		console.error("Error al cerrar la conexión a MongoDB:", error);
		return null;
	}
}
module.exports = {
	connectToMongoDB,
	closeMongoDBConnection,
};
