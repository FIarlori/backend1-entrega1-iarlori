# Entrega 1 – API de Productos y Carritos
Servidor backend desarrollado con Node.js + Express para gestión de e-commerce, con persistencia en archivos JSON (fs). Escucha en puerto **8080**.


## 📋 Requisitos técnicos
- Node.js v18+ (Recomendado LTS)
- npm v9+
- Postman o similar para testing


## Instalación
npm install


## Ejecución
node src/app.js


## Endpoints disponibles:
| Método | Endpoint                     | Descripción                         |
|--------|------------------------------|-------------------------------------|
| GET    | /api/products                | Obtener todos los productos         |
| GET    | /api/products/:pid           | Obtener producto por ID             |
| POST   | /api/products                | Crear nuevo producto                |
| PUT    | /api/products/:pid           | Actualizar producto                 |
| DELETE | /api/products/:pid           | Eliminar producto                   |
| POST   | /api/carts                   | Crear nuevo carrito                 |
| GET    | /api/carts/:cid              | Obtener carrito por ID              |
| POST   | /api/carts/:cid/product/:pid | Agregar producto al carrito         |


## Pruebas con Postman
- Importa la colección ubicada en `docs\postman\postman_collection.json`.
- Todos los endpoints usan `http://localhost:8080` como base.
