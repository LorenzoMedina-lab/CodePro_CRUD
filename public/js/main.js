document.addEventListener('DOMContentLoaded', () => {  // Asegura que el DOM esté completamente cargado antes de ejecutar cualquier código

  // MANEJO DE VOTACIÓN DE TEMAS LO REORGANIZA EN TIEMPO REAL EN LUGAR DE RECARGAR LA PÁGINA
  const contenedorDeTemas = document.getElementById('topics-container');  
  if (contenedorDeTemas) {
    contenedorDeTemas.addEventListener('click', async (evento) => {
      if (evento.target.classList.contains('btn-vote')) {
        const idDelTema = evento.target.getAttribute('data-id');
        try {
          const respuesta = await fetch(`/api/topics/${idDelTema}/vote`, { method: 'POST' });
          if (!respuesta.ok) throw new Error("Error en el servidor");
          const datosDevueltos = await respuesta.json();
          if (datosDevueltos.success) {
            reorganizarInterfazDeTemas(datosDevueltos.topics);
          }
        } catch (error) {
          console.error("Error al votar tema:", error);
        }
      }
    });
  }

  // === MANEJO DE ENLACES (DETALLE) — FIX APLICADO ===
  const contenedorDeEnlaces = document.getElementById('links-container');
  if (contenedorDeEnlaces) {
    const idDelTemaPadre = contenedorDeEnlaces.getAttribute('data-topic-id');
    
    contenedorDeEnlaces.addEventListener('click', async (evento) => {
      if (evento.target.classList.contains('btn-vote-link')) {
        const idDelEnlace = evento.target.getAttribute('data-link-id');
        
        try {
          const respuesta = await fetch(`/api/topics/${idDelTemaPadre}/links/${idDelEnlace}/vote`, { method: 'POST' });
          if (!respuesta.ok) throw new Error("Error en el servidor");
          
          const datosDevueltos = await respuesta.json();
          
          if (datosDevueltos.success) {
            // FIX: Reorganiza visualmente los enlaces en vivo en lugar de usar .reload()
            reorganizarInterfazDeEnlaces(contenedorDeEnlaces, datosDevueltos.topic.enlaces);
          }
        } catch (error) {
          console.error("Error al votar enlace:", error);
        }
      }
    });
  }
});

// FUNCIÓN DE ACTUALIZACIÓN EN TIEMPO REAL PARA TEMAS
function reorganizarInterfazDeTemas(listaDeTemasActualizada) {
  const contenedorPadre = document.getElementById('topics-container');
  if (!contenedorPadre) return;
  
  listaDeTemasActualizada.forEach(tema => {
    const tarjetaHTML = contenedorPadre.querySelector(`[data-id="${tema.id}"]`);
    if (tarjetaHTML) {
      const contadorVotos = tarjetaHTML.querySelector('.vote-count');
      if (contadorVotos) {
        contadorVotos.textContent = tema.votos; 
      }
      contenedorPadre.appendChild(tarjetaHTML);
    }
  });
}

/**
 * - Busca cada tarjeta de enlace usando su atributo [data-link-id].
 * - Actualiza el contador de texto correspondiente con el nuevo valor de votos.
 * - Utiliza .appendChild() para reubicar las tarjetas en orden descendente asíncronamente.
 */
function reorganizarInterfazDeEnlaces(contenedorPadre, listaDeEnlacesActualizada) { // FIX: Reorganiza visualmente los enlaces en vivo en lugar de usar .reload()
  listaDeEnlacesActualizada.forEach(enlace => {
    const tarjetaLinkHTML = contenedorPadre.querySelector(`[data-link-id="${enlace.id}"]`); // FIX: Busca cada tarjeta de enlace usando su atributo [data-link-id]
    if (tarjetaLinkHTML) {
      const contadorVotosLink = tarjetaLinkHTML.querySelector('.link-vote-count');
      if (contadorVotosLink) {
        contadorVotosLink.textContent = enlace.votos;
      }
      // Reubica la tarjeta en la parte inferior del bucle ordenado (Simula tiempo real reactivo)
      contenedorPadre.appendChild(tarjetaLinkHTML);
    }
  });
}