# SyncPlayList

SyncPlayList es una plataforma web de reproducción musical colaborativa en tiempo real. Permite a múltiples usuarios crear salas virtuales (Sync Rooms) donde pueden escuchar música de forma sincronizada o individual, gestionar playlists, roles y mucho más.

## 🚀 Características principales

- **Salas de música (Sync Rooms):** Los usuarios pueden crear salas y actuar como anfitriones.
- **Unirse por código:** Otros usuarios pueden unirse a salas mediante un código único.
- **Reproducción sincronizada:** Todos los participantes escuchan la misma música al mismo tiempo. Las acciones de reproducción (play, pause, cambiar canción) se sincronizan instantáneamente.
- **Playlists colaborativas:** Cada sala tiene una playlist donde los usuarios pueden añadir nuevas canciones a la cola de reproducción.
- **Sistema de "me gusta":** Los usuarios pueden marcar canciones como favoritas y gestionar su música preferida.
- **Roles de usuario:** El rol de administrador puede gestionar las músicas del sistema (CRUD).
- **Autenticación segura:** Incluye autenticación con JWT y cookies de sesión.
- **Historial de música y salas:** Los usuarios pueden ver el historial de canciones escuchadas y las salas en las que participaron o crearon.
- **Búsqueda avanzada:** Los usuarios pueden buscar música por título o por nombre de artista.

## 🛠️ Tecnologías utilizadas

- **Node.js** y **TypeScript** — Backend moderno y tipado
- **Express.js** — Framework para APIs REST
- **Prisma ORM** — Acceso y migración de base de datos PostgreSQL
- **PostgreSQL** — Base de datos relacional
- **Docker** — Contenedores para la base de datos
- **Socket.io** — Comunicación en tiempo real para sincronización musical
- **JWT** y **cookies** — Autenticación y gestión de sesiones
- **Firebase Admin SDK** — Almacenamiento de archivos y gestión de usuarios
- **Multer** — Manejo de archivos en el backend
- **Zod** — Validación de datos
- **Nodemon** — Recarga automática en desarrollo
- **Bcrypt** — Encriptación de contraseñas

## 🔑 Configuración de Firebase

Para que la integración con Firebase funcione, necesitas el archivo de credenciales `firebase-service-account.json`.

Descárgalo desde el siguiente enlace:

[Descargar credenciales de Firebase](https://drive.google.com/file/d/1jeTttR-YPGxbZs3RP7ccZbUcUv88qfT-/view?usp=sharing)

Coloca el archivo en la siguiente ruta dentro del proyecto:

```
/src/config/firebase-service-account.json
```

Asegúrate de que la variable `FIREBASE_SERVICE_ACCOUNT_PATH` en tu `.env` apunte a esa ruta.

## 📋 Prerrequisitos

Antes de instalar y ejecutar SyncPlayList, asegúrate de tener lo siguiente:

- **Node.js** (v18 o superior recomendado)
- **npm** (v9 o superior recomendado)
- **Docker** (para levantar la base de datos PostgreSQL local)
- **Git** (para clonar el repositorio)
- **Acceso al archivo de credenciales de Firebase** (descárgalo desde el enlace indicado en este README)

## ⚡ Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone `https://github.com/GustavoLuizaga/SyncPlayList.git`
   cd SyncPlayList
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz con la configuración de tu base de datos,JWT y firebase config.
   - Ejemplo:
     ```
     DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/syncplaylist
     JWT_SECRET=tu_clave_secreta
     ```

4. **Levanta la base de datos con Docker:**
   ```bash
   docker compose up --detach
   ```

5. **Ejecuta las migraciones de Prisma:**
   ```bash
   npm run prisma:migrate
   ```

6. **Ejecuta los seeders:**
   ```bash
   npm run prisma:seed
   ```

6. **Inicia el servidor:**
   ```bash
   npm run dev
   ```
   El servidor REST API estará corriendo en `http://localhost:3000`.
   El servidor SocketIo estará en `http://localhost:3001`

## 🚀 Prisma Client y archivos generados

Para que el proyecto funcione correctamente, debes generar el cliente de Prisma y los archivos generados:

1. **Generar el cliente Prisma:**
   ```bash
   npm run prisma:generate
   ```
   Esto creará el cliente en la carpeta `src/generated/prisma`.

2. **Ejecutar migraciones:**
   ```bash
   npm run prisma:migrate
   ```
   Esto aplicará las migraciones y mantendrá tu base de datos actualizada.

## 📦 Comandos npm disponibles

Lista de comandos útiles que puedes ejecutar desde la raíz del proyecto:

- `npm run start:dev` — Inicia el servidor en modo desarrollo con nodemon
- `npm run start` — Inicia el servidor en modo producción (usa el build de TypeScript)
- `npm run build` — Compila el proyecto TypeScript a JavaScript en la carpeta `dist`
- `npm run prisma:migrate` — Ejecuta las migraciones de Prisma
- `npm run prisma:generate` — Genera el cliente Prisma
- `npm run prisma:studio` — Abre Prisma Studio para gestionar la base de datos
- `npm run prisma:reset` — Resetea la base de datos y aplica todas las migraciones
- `npm run prisma:seed` — Ejecuta el script de seed para poblar la base de datos

## 🧪 Colección de Postman

Para facilitar las pruebas de la API, puedes descargar la colección de Postman con todos los endpoints listos para usar:

[Descargar colección de Postman](https://drive.google.com/file/d/10YHCs3H2Urog6kpbQoCAd_6TM808MXjr/view?usp=sharing)

Importa el archivo en Postman y configura las variables de entorno según tu `.env`.

## 🔔 Eventos de Socket.io en Sync Rooms

A continuación se detallan los eventos principales que implementé para la sincronización en tiempo real dentro de las salas colaborativas (Sync Rooms):

- **join_room**: Permite a un usuario unirse a una sala. Si la sala existe y está activa, el usuario se une y se notifica a todos los participantes. El usuario recibe confirmación de ingreso.
- **leave_room**: Permite a un usuario salir de una sala. Se notifica a todos los participantes que el usuario ha salido.
- **play_music**: Cuando alguien reproduce una canción, todos los usuarios de la sala escuchan la misma música al mismo tiempo. Se envía el evento `music_playing` con los datos de la canción.
- **pause_music**: Permite pausar la música para todos los usuarios de la sala. Se envía el evento `music_paused` con el tiempo actual de la canción.
- **change_music**: Permite cambiar la canción que se está reproduciendo en la sala. Todos los usuarios reciben el evento `music_changed` con los datos de la nueva canción.
- **add_music_to_queue**: Permite agregar una canción a la cola de reproducción de la sala. Todos los usuarios reciben el evento `music_added_to_queue` con los datos de la canción agregada.
- **send_message**: Permite enviar mensajes dentro de la sala. Todos los usuarios reciben el evento `new_message` con el mensaje, el usuario y la hora.

Estos eventos permiten que la experiencia de escuchar música en grupo sea realmente colaborativa y sincronizada.

## 🎬 Demo en video

Puedes ver una demostración del funcionamiento de SyncPlayList en el siguiente video:

[Ver demo en video](https://drive.google.com/file/d/1cdWCIHX3oBUCwo7WqGJtZfur4qxlVpCe/view?usp=sharing)

---

