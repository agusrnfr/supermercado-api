# 🎬 supermercado-api

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js) ![Express](https://img.shields.io/badge/Express.js-5.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green?logo=mongodb)
 ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-active-brightgreen) ![PRs](https://img.shields.io/badge/PRs-welcome-orange)


**supermercado-api** es una API REST desarrollada con **Node.js**, **Express** y  **MongoDB** que permite gestionar un catálogo de productos para un supermercado.

## 🚀 Características

- 📦 Visualización del catálogo completo.
- 🔍 Búsqueda de productos por código.
- ➕ Alta de nuevos productos.
- ✏️ Modificación de productos existentes.
- ❌ Eliminación de productos por código.

## 📖 Estructura de los Datos

Cada producto contiene la siguiente información:
- **_id**: Identificador único del producto (generado automáticamente por MongoDB).
- **codigo**: Código numérico único del producto.
- **nombre**: Nombre del producto.
- **precio**: Precio del producto.
- **categoria**: Categoría a la que pertenece el producto (por ejemplo, "Limpieza", "Comestible", "Lácteos").

## 📦 Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/agusrnfr/supermercado-api
   cd supermercado-api
   ```
2. Instalá las dependencias:
    ```bash
    npm install
    ```
   O podes instalar express, dotenv, nodemon y mongodb por separado:
   
    ```bash
   npm install express
   npm install dotenv
   npm install --save-dev nodemon
   npm install mongodb
    ```
4. Ejecutá el servidor:
   * En modo desarrollo (con nodemon):
        ```bash
        npm run dev
        ```
   * En modo producción:
        ```bash
        npm start
        ```
5. Accedé a la API a través de un navegador o herramienta de pruebas en la siguiente URL:
   ```bash
   http://localhost:3008/
   ```

## 🔧 Endpoints

| Método   | Endpoint             | Descripción                                                                  |
| -------- | -------------------- | ---------------------------------------------------------------------------- |
| `GET`    | `/`                  | Mensaje de bienvenida                                                        |
| `GET`    | `/productos`         | Retorna el listado completo de productos.                                    |
| `GET`    | `/productos/:codigo` | Retorna un producto por su código.                                           |
| `POST`   | `/productos`         | Da de alta un nuevo producto (requiere: código, nombre, precio y categoría). |
| `PUT`    | `/productos/:codigo` | Modifica un producto existente (código actual y nuevos datos).               |
| `DELETE` | `/productos/:codigo` | Elimina un producto por su código.                                           |

## 📂 Ejemplo de Objeto Producto

```json
{
  "_id": "60c72b2f9b1e8c001c8e4d3a",
  "codigo": 123456,
  "nombre": "Leche Entera",
  "precio": 50.00,
  "categoria": "Lácteos"
}
```

## Ejemplo de Uso
Para probar la API, podés utilizar herramientas como **Postman** o **Insomnia**. Aquí hay algunos ejemplos de cómo interactuar con la API:
### Obtener todos los productos

#### Solicitud
```http
GET /productos
```
#### Respuesta
```http
STATUS: 200 OK
```
```json
[
  {
    "_id": "60c72b2f9b1e8c001c8e4d3a",
    "codigo": 123456,
    "nombre": "Leche Entera",
    "precio": 50.00,
    "categoria": "Lácteos"
  },
  {
    "_id": "60c72b2f9b1e8c001c8e4d3b",
    "codigo": 654321,
    "nombre": "Detergente Líquido",
    "precio": 120.00,
    "categoria": "Limpieza"
  }
]
```
### Obtener un producto por código

#### Solicitud
```http
GET /productos/123456
```
#### Respuesta
```http
STATUS: 200 OK
```
```json
{
  "_id": "60c72b2f9b1e8c001c8e4d3a",
  "codigo": 123456,
  "nombre": "Leche Entera",
  "precio": 50.00,
  "categoria": "Lácteos"
}
```

### Agregar un nuevo producto

#### Solicitud
```http
POST /productos

{
  "codigo": 789012,
  "nombre": "Arroz",
  "precio": 30.00,
  "categoria": "Comestible"
}
```
##### Respuesta
```http
STATUS: 201 Created
```
```json
{
  "_id": "60c72b2f9b1e8c001c8e4d3c",
  "codigo": 789012,
  "nombre": "Arroz",
  "precio": 30.00,
  "categoria": "Comestible"
}
```

### Actualizar un producto existente
#### Solicitud
```http
PUT /productos/123456

{
  "nombre": "Leche Entera",
  "categoria": "Lácteos"
}
```

##### Respuesta
```http
STATUS: 200 OK
```
```json
{
  "nombre": "Leche Entera",
  "categoria": "Lácteos"
}
```

### Eliminar un producto

#### Solicitud
```http
DELETE /productos/123456
```

##### Respuesta
```http
STATUS: 204 No Content
```
```json
```

## ⚠️ Validaciones
- Todos los campos son obligatorios al crear un producto. En caso de modificar un producto, no todos los campos son obligatorios, pero al menos uno debe ser proporcionado.
- En todos los endpoints, el código y el precio deben ser numéricos mayores a cero.
- El código debe ser único, no se permiten duplicados.

## 👥 Desarrolladoras

- **Agostina Paoletti** - [agostinapaoletti](https://github.com/Chinapaoletti) 
- **Agustina Rojas** - [agusrnfr](https://github.com/agusrnfr)
- **Karina Chilque** - [karinachilque]()
