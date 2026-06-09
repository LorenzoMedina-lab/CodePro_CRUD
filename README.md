🎛️ Arquitectura y Flujo Técnico (Para la Defensa Oral)
1. Capa del Modelo (topicModel.js)
Administra el estado volátil de la aplicación alojado en memoria RAM a través de una colección anidada de objetos JavaScript. Ejecuta un algoritmo de ordenación nativo de orden superior mediante el método .sort() comparando las propiedades de votos en orden descendente.

2. Capa del Controlador (topicController.js)
Intermedia las peticiones HTTP (req) abstrayendo las respuestas (res). Diferencia con precisión las respuestas de renderizado e interfaces clásicas de aquellas orientadas a API que despachan estructuras de datos JSON puros con estados lógicos para el consumo reactivo del cliente.

3. Capa de la Vista (.ejs)
Genera la inyección dinámica de propiedades del servidor transformando datos dinámicos a través de bucles iterativos estructurados (.forEach) nativos de EJS. Utiliza formularios desacoplados para evitar solapamientos en los envíos de las cargas de datos (payloads).

4. JavaScript del Cliente (main.js)
Aplica Delegación de Eventos asignando un único escucha de eventos (EventListener) en el nodo contenedor del bloque principal, optimizando drásticamente el consumo de memoria RAM en el navegador. Intercepta las acciones de votación y realiza peticiones asíncronas asiladas vía Fetch API.

Comportamiento del Reordenamiento en Tiempo Real: Al recibir el JSON ordenado desde el servidor, invoca el método nativo .appendChild() pasando nodos ya existentes en el HTML. Bajo la especificación del DOM, esto no duplica el elemento, sino que lo remueve de su posición original y lo reinserta al final del flujo jerárquico, permitiendo un ordenamiento físico instantáneo sin alterar la experiencia del usuario con recargas de pantalla.

💻 Instalación y Ejecución Local
Sigue estos comandos secuenciales en tu terminal para levantar el entorno de desarrollo:

1. Clonar o posicionarse en el directorio del proyecto
Bash
cd CodePro_CRUD
2. Instalar dependencias del sistema (Express y EJS)
Bash
npm install
3. Iniciar el servidor de Node.js
Bash
npm start
4. Abrir la aplicación en el navegador
Ingresa a la siguiente dirección URL local en tu navegador preferido:

Plaintext
http://localhost:3000
