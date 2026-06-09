const express = require('express');
const router = express.Router();
const controladorTemas = require('../controllers/topicController');

// Rutas de renderizado de vistas (GET)
router.get('/', controladorTemas.renderizarInicio);
router.get('/topics/:id', controladorTemas.renderizarDetalleTema);

// Rutas POST para procesamiento de formularios nativos (Temas)
router.post('/topics', controladorTemas.procesarCreacionTema);
router.post('/topics/:id/update', controladorTemas.procesarActualizacionTema);
router.post('/topics/:id/delete', controladorTemas.procesarEliminacionTema);

// Rutas POST para procesamiento de formularios nativos (Enlaces)
router.post('/topics/:topicId/links', controladorTemas.procesarCreacionEnlace);
router.post('/topics/:topicId/links/:linkId/delete', controladorTemas.procesarEliminacionEnlace);

// Rutas de API para peticiones asíncronas de votación (Fetch API)
router.post('/api/topics/:id/vote', controladorTemas.apiRegistrarVotoTema);
router.post('/api/topics/:topicId/links/:linkId/vote', controladorTemas.apiRegistrarVotoEnlace);

module.exports = router;