const express = require('express'); // Framework web para Node.js que facilita la creación de servidores y manejo de rutas
const path = require('path'); // Módulo para manejar rutas de archivos y directorios
const topicRoutes = require('./src/routes/topicRoutes'); // Importación de rutas para temas y enlaces

const app = express(); // Inicialización de la aplicación Express
const PORT = process.env.PORT || 3000;  // Puerto de escucha del servidor

// Configuración del Motor de Plantillas (Views)
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'src', 'views')); // Directorio de vistas personalizado

// Middlewares esenciales para parsear payloads HTTP
app.use(express.json()); // Para parsear JSON en solicitudes POST/PUT
app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios tradicionales

// Servidor de archivos estáticos para el JS del cliente
app.use(express.static(path.join(__dirname, 'public'))); // Directorio de archivos estáticos (CSS, JS, imágenes, etc.)

// Enrutador Principal
app.use('/', topicRoutes); // Rutas para temas y enlaces

// Inicialización del servidor HTTP
app.listen(PORT, () => {  // Mensaje de consola para confirmar que el servidor está corriendo
  console.log(`Servidor Learn It corriendo en http://localhost:${PORT}`);
});