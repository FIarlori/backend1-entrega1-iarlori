# Entrega 1 – API de Productos y Carritos
Servidor en Node.js + Express con persistencia en archivos JSON (FS). Escucha en puerto **8080**.


## Requisitos previos
- Node.js 18+


## Instalación
npm install


## Ejecución
node src/app.js


## Endpoints disponibles:
Método	    Endpoint    	                    Descripción
GET	        /api/products	                    Obtener todos los productos
GET	        /api/products/:pid	                Obtener producto por ID
POST	    /api/products	                    Crear nuevo producto
PUT	        /api/products/:pid	                Actualizar producto
DELETE	    /api/products/:pid	                Eliminar producto
POST	    /api/carts	                        Crear nuevo carrito
GET	        /api/carts/:cid	                    Obtener carrito por ID
POST	    /api/carts/:cid/product/:pid	    Agregar producto al carrito


## Pruebas con Postman
- Importa la colección ubicada en `docs/postman_collection.json`.
- Todos los endpoints usan `http://localhost:8080` como base.