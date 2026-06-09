// Base de datos temporal en memoria
let listaDeTemas = [
  {
    id: "1",
    titulo: "Cómo programar como un ninja",
    votos: 5, // <- Asegurado en español
    enlaces: [
      { id: "l1", nombre: "MDN Web Docs", url: "https://developer.mozilla.org", votos: 3 }
    ]
  },
  {
    id: "2",
    titulo: "Dominar el arte de preparar café",
    votos: 2, // <- Asegurado en español
    enlaces: [
      { id: "l2", nombre: "Guía Barista", url: "https://baristainstitute.com", votos: 1 }
    ]
  }
];

/**
 * Función interna de utilidad para ordenar cualquier lista por votos de mayor a menor.
 */
const ordenarPorVotosDescendente = (coleccion) => {
  if (!coleccion || !Array.isArray(coleccion)) return [];
  
  return coleccion.sort((elementoA, elementoB) => {
    // Si por alguna razón los votos no existen, por defecto asignamos 0 para evitar el NaN
    const votosB = elementoB.votos || 0;
    const votosA = elementoA.votos || 0;
    return votosB - votosA;
  });
};

const ModeloTema = {
  
  // Devuelve los temas y sus enlaces completamente ordenados por relevancia de votos
  obtenerTodosLosTemas: () => {
    listaDeTemas.forEach(tema => ordenarPorVotosDescendente(tema.enlaces));
    return ordenarPorVotosDescendente(listaDeTemas);
  },

  obtenerTemaPorId: (idBuscar) => {
    return listaDeTemas.find(tema => tema.id === idBuscar);
  },

  crearNuevoTema: (tituloTema) => {
    const nuevoTema = {
      id: Date.now().toString(), // Genera un ID único basado en el milisegundo actual
      titulo: tituloTema,
      votos: 0,
      enlaces: []
    };
    listaDeTemas.push(nuevoTema);
    return nuevoTema;
  },

  actualizarTituloTema: (idModificar, nuevoTitulo) => {
    const tema = listaDeTemas.find(tema => tema.id === idModificar);
    if (tema) {
      tema.titulo = nuevoTitulo;
    }
    return tema;
  },

  eliminarTemaPorId: (idEliminar) => {
    listaDeTemas = listaDeTemas.filter(tema => tema.id !== idEliminar);
    return true;
  },

  // Lógica del Sistema de Votación para Temas
  incrementarVotosTema: (idTema) => {
    const tema = listaDeTemas.find(tema => tema.id === idTema);
    if (tema) {
      tema.votos += 1;
    }
    return tema;
  },

  // Gestión de Sub-recursos: Enlaces útiles dentro de un Tema
  agregarEnlaceATema: (idTema, nombreEnlace, urlEnlace) => {
    const tema = listaDeTemas.find(tema => tema.id === idTema);
    if (tema) {
      const nuevoEnlace = {
        id: Date.now().toString(),
        nombre: nombreEnlace,
        url: urlEnlace,
        votos: 0
      };
      tema.enlaces.push(nuevoEnlace);
      return nuevoEnlace;
    }
    return null;
  },

  eliminarEnlaceDeTema: (idTema, idEnlace) => {
    const tema = listaDeTemas.find(tema => tema.id === idTema);
    if (tema) {
      tema.enlaces = tema.enlaces.filter(enlace => enlace.id !== idEnlace);
      return true;
    }
    return false;
  },

  incrementarVotosEnlace: (idTema, idEnlace) => {
    const tema = listaDeTemas.find(tema => tema.id === idTema);
    if (tema) {
      const enlace = tema.enlaces.find(enlace => enlace.id === idEnlace);
      if (enlace) {
        enlace.votos += 1;
      }
    }
    return tema;
  }
};

module.exports = ModeloTema;