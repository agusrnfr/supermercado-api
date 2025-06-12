# 🎬 supermercado-api

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js) ![Express](https://img.shields.io/badge/Express.js-5.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-active-brightgreen) ![PRs](https://img.shields.io/badge/PRs-welcome-orange)


**supermercado-api** es una API REST desarrollada con **Node.js**, **Express** y  **MongoDB** que permite gestionar un catálogo de productos para un supermercado.

## 🚀 Características

- 📦 Visualización del catálogo completo.
- 🔍 Búsqueda de productos por código.
- 🧾 Búsqueda de productos por nombre.
- ➕ Alta de nuevos productos.
- ✏️ Modificación de productos existentes.
- ❌ Baja de productos por código.

## 📖 Estructura de los Datos

Cada producto contiene la siguiente información:
- **_id**: Identificador único del producto (generado automáticamente por MongoDB).
- **codigo**: Código numérico único del producto.
- **nombre**: Nombre del producto.
- **precio**: Precio del producto.
- **categoria**: Categoría a la que pertenece el producto (por ejemplo, "Limpieza", "Comestible", "Lácteos").

## 📖 Diagramas de flujo

  ```mermaid
flowchart TD
  Start(["🚀 Solicitud del cliente"])

  %% --- GET /productos ---
  subgraph GET_ALL["GET /productos"]
    A1["🔌 Conectar a MongoDB"]
    A2{"❓ ¿Error en conexión?"}
    A3["📦 Obtener todos los productos"]
    A4["🔌 Desconectar MongoDB"]
    A5["✅ Enviar productos con 200 OK"]
    A6["🔌 Desconectar MongoDB"]
    A7["❌ Enviar error 500"]

    A1 --> A2
    A2 -- No --> A3 --> A4 --> A5
    A2 -- Sí --> A6 --> A7
  end

  %% --- GET /productos/nombre/:nombre ---
  subgraph GET_BY_NAME["GET /productos/nombre/:nombre"]
    B1["🔎 Validar parámetro nombre (validación alfabética)"]
    B2{"❓ ¿Nombre válido?"}
    B3["🔌 Conectar a MongoDB"]
    B4{"❓ ¿Error en conexión?"}
    B5["🔍 Buscar productos con regex"]
    B6{"❓ ¿Productos encontrados?"}
    B7["🔌 Desconectar MongoDB"]
    B8["✅ Enviar productos con 200 OK"]
    B9["🔌 Desconectar MongoDB"]
    B10["⚠️ Enviar error 404"]
    B11["⚠️ Enviar error 400 nombre inválido"]
    B12["🔌 Desconectar MongoDB"]
    B13["❌ Enviar error 500"]

    B1 --> B2
    B2 -- No --> B11
    B2 -- Sí --> B3 --> B4
    B4 -- Sí --> B12 --> B13
    B4 -- No --> B5 --> B6
    B6 -- Sí --> B7 --> B8
    B6 -- No --> B9 --> B10
  end

  %% --- GET /productos/codigo/:codigo ---
  subgraph GET_BY_CODE["GET /productos/codigo/:codigo"]
    C1["🔎 Validar parámetro código (validación numérica)"]
    C2{"❓ ¿Código válido?"}
    C3["🔌 Conectar a MongoDB"]
    C4{"❓ ¿Error en conexión?"}
    C5["🔍 Buscar producto por código"]
    C6{"❓ ¿Producto encontrado?"}
    C7["🔌 Desconectar MongoDB"]
    C8["✅ Enviar producto con 200 OK"]
    C9["🔌 Desconectar MongoDB"]
    C10["⚠️ Enviar error 404"]
    C11["⚠️ Enviar error 400 código inválido"]
    C12["🔌 Desconectar MongoDB"]
    C13["❌ Enviar error 500"]

    C1 --> C2
    C2 -- No --> C11
    C2 -- Sí --> C3 --> C4
    C4 -- Sí --> C12 --> C13
    C4 -- No --> C5 --> C6
    C6 -- Sí --> C7 --> C8
    C6 -- No --> C9 --> C10
  end

  %% --- POST /productos ---
  subgraph POST_CREATE["POST /productos"]
    D1["📝 Validar campos del body"]
    D2{"❓ ¿Todos los campos presentes?"}
    D3["🔍 Validar código (numérico), precio (numérico), nombre (alfabético), categoría (alfabético)"]
    D4{"❓ ¿Campos válidos?"}
    D5["🔌 Conectar a MongoDB"]
    D6{"❓ ¿Error en conexión?"}
    D7["🔍 Verificar si ya existe producto con ese código"]
    D8{"❓ ¿Producto ya existe?"}
    D9["➕ Insertar nuevo producto"]
    D10["🔌 Desconectar MongoDB"]
    D11["✅ Enviar producto creado 201"]
    D12["🔌 Desconectar MongoDB"]
    D13["⚠️ Enviar error 400 producto ya existe"]
    D14["⚠️ Enviar error 400 datos inválidos"]
    D15["🔌 Desconectar MongoDB"]
    D16["❌ Enviar error 500"]

    D1 --> D2
    D2 -- No --> D14
    D2 -- Sí --> D3 --> D4
    D4 -- No --> D14
    D4 -- Sí --> D5 --> D6
    D6 -- Sí --> D15 --> D16
    D6 -- No --> D7 --> D8
    D8 -- Sí --> D12 --> D13
    D8 -- No --> D9 --> D10 --> D11
  end

  %% --- PUT /productos/:codigo ---
  subgraph PUT_UPDATE["PUT /productos/:codigo"]
    E1["📝 Validar body no vacío"]
    E2{"❓ ¿Body vacío?"}
    E3["🔍 Validar código (numérico) y datos a modificar (alfabético o numérico según campo)"]
    E4{"❓ ¿Datos válidos?"}
    E5["🔌 Conectar a MongoDB"]
    E6{"❓ ¿Error en conexión?"}
    E7{"❓ ¿Nuevo código ya existe?"}
    E8["✏️ Actualizar producto"]
    E9{"❓ ¿Producto encontrado?"}
    E10{"❓ ¿Se modificó el producto?"}
    E11["🔌 Desconectar MongoDB"]
    E12["✅ Enviar producto modificado 200"]
    E13["⚠️ Enviar error 404 producto no encontrado"]
    E14["⚠️ Enviar error 400 sin cambios"]
    E15["⚠️ Enviar error 400 datos inválidos"]
    E16["🔌 Desconectar MongoDB"]
    E17["❌ Enviar error 500"]

    E1 --> E2
    E2 -- Sí --> E15
    E2 -- No --> E3 --> E4
    E4 -- No --> E15
    E4 -- Sí --> E5 --> E6
    E6 -- Sí --> E16 --> E17
    E6 -- No --> E7
    E7 -- Sí --> E15
    E7 -- No --> E8 --> E9
    E9 -- No --> E13
    E9 -- Sí --> E10
    E10 -- No --> E14
    E10 -- Sí --> E11 --> E12
  end

  %% --- DELETE /productos/:codigo ---
  subgraph DELETE_DELETE["DELETE /productos/:codigo"]
    F1["🔎 Validar código parámetro (validación numérica)"]
    F2{"❓ ¿Código válido?"}
    F3["🔌 Conectar a MongoDB"]
    F4{"❓ ¿Error en conexión?"}
    F5["🗑️ Eliminar producto por código"]
    F6{"❓ ¿Producto eliminado?"}
    F7["🔌 Desconectar MongoDB"]
    F8["✅ Enviar 204 No Content"]
    F9["🔌 Desconectar MongoDB"]
    F10["⚠️ Enviar error 404"]
    F11["⚠️ Enviar error 400 código inválido"]
    F12["🔌 Desconectar MongoDB"]
    F13["❌ Enviar error 500"]

    F1 --> F2
    F2 -- No --> F11
    F2 -- Sí --> F3 --> F4
    F4 -- Sí --> F12 --> F13
    F4 -- No --> F5 --> F6
    F6 -- Sí --> F7 --> F8
    F6 -- No --> F9 --> F10
  end

  Start --> GET_ALL
  Start --> GET_BY_NAME
  Start --> GET_BY_CODE
  Start --> POST_CREATE
  Start --> PUT_UPDATE
  Start --> DELETE_DELETE

  %% --- Definir estilos ovalados divididos en varias líneas ---
  classDef ovalNodes fill:#fff,stroke:#999,stroke-width:2px,rx:20,ry:20,color:#333;

  class A1,A2,A3,A4,A5,A6,A7 ovalNodes;
  class B1,B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13 ovalNodes;
  class C1,C2,C3,C4,C5,C6,C7,C8,C9,C10,C11,C12,C13 ovalNodes;
  class D1,D2,D3,D4,D5,D6,D7,D8,D9,D10,D11,D12,D13,D14,D15,D16 ovalNodes;
  class E1,E2,E3,E4,E5,E6,E7,E8,E9,E10,E11,E12,E13,E14,E15,E16,E17 ovalNodes;
  class F1,F2,F3,F4,F5,F6,F7,F8,F9,F10,F11,F12,F13 ovalNodes;

  style A5 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
  style B8 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
  style C8 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
  style D11 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
  style E12 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
  style F8 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724

  style A7 fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
  style B13 fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
  style C13 fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
  style D16 fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
  style E17 fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
  style F13 fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
```

## 📦 Instalación

⚠️ **Importante:**  
Si deseás correr la app localmente con tu propia base de datos, debés crear una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), generar tu propia URL de conexión y reemplazar la existente en `.env`.

Luego, importá los datos desde este archivo JSON:  
[`supermercado.json`](https://github.com/mariaelisaaraya/IngeniasBackend_2025/blob/main/Modulo2/tp2/supermercado.json)

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

| Método   | Endpoint                    | Descripción                               |
| -------- | --------------------------- | ----------------------------------------- |
| `GET`    | `/`                         | Mensaje de bienvenida.                    |
| `GET`    | `/productos`                | Retorna el listado completo de productos. |
| `GET`    | `/productos/nombre/:nombre` | Retorna un producto por su nombre.        |
| `GET`    | `/productos/codigo/:codigo` | Retorna un producto por su código.        |
| `POST`   | `/productos`                | Da de alta un nuevo producto.             |
| `PUT`    | `/productos/:codigo`        | Modifica un producto existente.           |
| `DELETE` | `/productos/:codigo`        | Da de baja un producto por su código.     |

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

## 🛠️ Ejemplo de Uso
Para probar la API, podés usar herramientas como **Postman**, **Insomnia** o **Thunder Client**. Aca hay algunos ejemplos de cómo interactuar con la API:

### 📦 Obtener todos los productos

#### 📩 Solicitud
```http
GET /productos
```
#### 📝 Respuesta
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
### 🔍 Obtener un producto por nombre

#### 📩 Solicitud
```http
GET /productos/nombre/aceite
```
#### 📝 Respuesta
```http
STATUS: 200 OK
```
```json
{
  "_id": "68473cc70822104ad584e6ec",
  "codigo": 5674,
  "nombre": "Aceite de oliva",
  "precio": 7.99,
  "categoria": "Comestible"
}
```
### 🔍 Obtener un producto por código

#### 📩 Solicitud
```http
GET /productos/codigo/123456
```
#### 📝 Respuesta
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

### ➕ Agregar un nuevo producto

#### 📩 Solicitud
```http
POST /productos

{
  "codigo": 789012,
  "nombre": "Arroz",
  "precio": 30.00,
  "categoria": "Comestible"
}
```
##### 📝 Respuesta
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

### ✏️ Modificar un producto existente
#### 📩 Solicitud
```http
PUT /productos/123456

{
  "nombre": "Leche Entera",
  "categoria": "Lácteos"
}
```

##### 📝 Respuesta
```http
STATUS: 200 OK
```
```json
{
  "nombre": "Leche Entera",
  "categoria": "Lácteos"
}
```

### ❌ Eliminar un producto

#### 📩 Solicitud
```http
DELETE /productos/123456
```

##### 📝 Respuesta
```http
STATUS: 204 No Content
```
```json
```

## ⚠️ Validaciones
- Todos los campos son obligatorios al crear un producto. En caso de modificar un producto, no todos los campos son obligatorios, pero al menos uno debe ser proporcionado.
- El código debe ser único, no se permiten duplicados.
- En todos los endpoints, el código y el precio deben ser números mayores a cero.
- El nombre del producto debe ser alfabético (solo letras y espacios).
- La categoría del producto debe ser alfabética (solo letras y espacios).

## 👥 Desarrolladoras

- **Agostina Paoletti** - [agostinapaoletti](https://github.com/Chinapaoletti) 
- **Agustina Rojas** - [agusrnfr](https://github.com/agusrnfr)
- **Karina Chilque** - [karinachilque]()
