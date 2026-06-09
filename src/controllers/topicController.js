const ModeloTema = require('../models/topicModel');

// Muestra la página principal con la lista completa de temas
exports.renderizarInicio = (req, res) => {
  console.log("=== [DEBUG] 1. Petición recibida en el controlador ===");
  
  try {
    const temasOrdenados = ModeloTema.obtenerTodosLosTemas();
    console.log("=== [DEBUG] 2. Modelo respondió con éxito. Cantidad de temas:", temasOrdenados.length);
    
    console.log("=== [DEBUG] 3. Intentando renderizar la plantilla index.ejs ===");
    res.render('index', { topics: temasOrdenados });
    
    console.log("=== [DEBUG] 4. res.render ejecutado ===");
  } catch (error) {
    console.error("=== [DEBUG] ¡ERROR DETECTADO! ===", error);
    res.status(500).send("Error interno: " + error.message);
  }
};

// Muestra la vista detallada de un tema en específico y sus enlaces
exports.renderizarDetalleTema = (req, res) => {
  const temaEncontrado = ModeloTema.obtenerTemaPorId(req.params.id);
  if (!temaEncontrado) {
    return res.status(404).send('El tema educativo no existe.');
  }
  res.render('topic-detail', { topic: temaEncontrado });
};

// Acciones de Formularios para Temas (Operaciones CRUD mutativas)
exports.procesarCreacionTema = (req, res) => {
  const { title } = req.body; // 'title' viene del atributo name del input HTML
  if (title) {
    ModeloTema.crearNuevoTema(title);
  }
  res.redirect('/');
};

exports.procesarActualizacionTema = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  ModeloTema.actualizarTituloTema(id, title);
  res.redirect('/');
};

exports.procesarEliminacionTema = (req, res) => {
  const { id } = req.params;
  ModeloTema.eliminarTemaPorId(id);
  res.redirect('/');
};

// Operaciones de Links (Formularios)
exports.procesarCreacionEnlace = (req, res) => {
  const { topicId } = req.params;
  const { name, url } = req.body;
  ModeloTema.agregarEnlaceATema(topicId, name, url);
  res.redirect(`/topics/${topicId}`);
};

exports.procesarEliminacionEnlace = (req, res) => {
  const { topicId, linkId } = req.params;
  ModeloTema.eliminarEnlaceDeTema(topicId, linkId);
  res.redirect(`/topics/${topicId}`);
};

// Endpoints de API Rest para Votación Dinámica Asíncrona (Responden JSON)
exports.apiRegistrarVotoTema = (req, res) => {
  const { id } = req.params;
  const temaActualizado = ModeloTema.incrementarVotosTema(id);
  
  if (!temaActualizado) {
    return res.status(404).json({ error: "Tema no encontrado" });
  }
  // Devolvemos toda la lista actualizada para que el cliente reordene el DOM en vivo
  res.json({ success: true, topics: ModeloTema.obtenerTodosLosTemas() });
};

exports.apiRegistrarVotoEnlace = (req, res) => {
  const { topicId, linkId } = req.params;
  const temaActualizado = ModeloTema.incrementarVotosEnlace(topicId, linkId);
  
  if (!temaActualizado) {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }
  res.json({ success: true, topic: ModeloTema.obtenerTemaPorId(topicId) });
};