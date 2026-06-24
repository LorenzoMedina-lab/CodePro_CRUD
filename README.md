
# Sistema de Gestión y Votación Dinámica de Temas Educativos (Learn It App)

Este proyecto es una aplicación web interactiva desarrollada con **Node.js, Express y EJS**, estructurada bajo el patrón de diseño de **Arquitectura MVC (Modelo-Vista-Controlador)**. Permite a los usuarios gestionar temas de aprendizaje y sub-recursos (enlaces útiles), implementando un sistema de votación reactivo y ordenamiento dinámico en tiempo real utilizando JavaScript Vanilla (Puro) y Fetch API, eliminando por completo las recargas innecesarias de la página.

## 🚀 Características Principales

- **Arquitectura Limpia (MVC):** Separación estricta de responsabilidades entre el almacenamiento de datos, la lógica de control y la interfaz de usuario.
- **Operaciones CRUD Completas:** Flujo síncrono nativo para la Creación, Lectura, Actualización y Eliminación de temas educativos y sus respectivos enlaces.
- **Sistema de Votación Asíncrono (Tiempo Real):** Suma de votos fluida tanto para los temas principales como para los recursos secundarios compartidos.
- **Manipulación Eficiente del DOM:** Algoritmo de reordenamiento visual descendente basado en ponderación de votos (`window.location.reload()` removido).
- **Consistencia y Semántica:** Nomenclatura unificada en español en todo el ecosistema (Modelo, Controlador, Vistas) para facilitar la auditoría técnica.

---

## 📂 Estructura Jerárquica del Proyecto

```text
CodePro_CRUD/
├── public/
│   └── js/
│       └── main.js          # JavaScript del Cliente (Fetch API y lógica de ordenamiento del DOM)
├── src/
│   ├── controllers/
│   │   └── topicController.js  # Lógica de Control (Procesa peticiones HTTP y despacha respuestas)
│   ├── models/
│   │   └── topicModel.js    # Capa de Datos (Estado en memoria RAM y algoritmos de ordenación)
│   ├── routes/
│   │   └── topicRoutes.js   # Enrutador Semántico (Definición de rutas y verbos HTTP)
│   └── views/
│       ├── index.ejs        # Vista principal (Panel de control del CRUD de Temas)
│       └── topic-detail.ejs # Vista detallada (Sub-recursos y enlaces compartidos)
├── .gitignore               # Exclusión de archivos pesados (node_modules/)
├── package.json             # Manifiesto del proyecto y control de dependencias
└── server.js                # Punto de entrada y configuración del servidor Express
