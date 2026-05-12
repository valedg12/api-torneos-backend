# 🏑 API RESTful - Gestión de Torneos Deportivos

## Descripción del Proyecto
Esta interfaz de programación de aplicaciones (API) RESTful proporciona un ecosistema backend completo para la administración de competiciones deportivas. Desarrollada con un enfoque en la escalabilidad y las buenas prácticas, permite gestionar torneos, equipos, padrones de jugadoras y el registro de incidencias disciplinarias (tarjetas) mediante subdocumentos.

El valor algorítmico destacado de este proyecto reside en su capacidad para **calcular y renderizar dinámicamente tablas de posiciones** en tiempo real, evaluando victorias, empates, derrotas y diferencia de goles a partir del estado de los partidos finalizados.

## 🛠️ Stack Tecnológico
Este proyecto representa el desarrollo del entorno Backend dentro del ecosistema JavaScript (Arquitectura MEN):
* **Entorno de Ejecución:** Node.js
* **Framework Web:** Express.js
* **Base de Datos:** MongoDB Atlas (NoSQL en la Nube)
* **ODM (Object Data Modeling):** Mongoose

## ✨ Características Destacadas
* **Modelado Relacional NoSQL:** Implementación de referencias cruzadas mediante `ObjectIds` (Torneos -> Equipos -> Jugadoras).
* **Manejo de Subdocumentos:** Arquitectura eficiente para registrar tarjetas incrustadas directamente dentro de la colección de `Partidos`, optimizando las consultas de lectura.
* **Lógica de Negocio Avanzada:** Generación de métricas deportivas al vuelo mediante algoritmos de ordenamiento y reducción en el controlador.
* **Manejo de Errores Estructurado:** Bloques `try/catch` rigurosos con respuestas HTTP semánticas.

## 🚀 Guía de Instalación Local

1. Clonar el repositorio:
\`\`\`bash
git clone https://github.com/TuUsuario/api-torneos-backend.git
cd api-torneos-backend
\`\`\`
2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`
3. Configurar variables de entorno (`.env`):
\`\`\`env
PORT=3000
MONGO_URI=tu_cadena_de_conexion_a_atlas
\`\`\`
4. Inicializar el servidor:
\`\`\`bash
node --watch src/app.js
\`\`\`

## 📡 Documentación de Endpoints Principales

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/ping` | Diagnóstico de salud del servidor. |
| **POST** | `/api/torneos` | Instancia un nuevo torneo. |
| **GET** | `/api/torneos` | Devuelve el catálogo de torneos. |
| **POST** | `/api/equipos` | Registra un equipo y lo asocia a un torneo. |
| **POST** | `/api/jugadoras` | Ficha a una jugadora en un equipo. |
| **POST** | `/api/partidos` | Programa un encuentro deportivo. |
| **POST** | `/api/partidos/:id/tarjetas` | Incrusta una tarjeta en el historial del partido. |
| **GET** | `/api/torneos/:id/posiciones`| **Calcula y retorna la tabla de posiciones dinámica.** |