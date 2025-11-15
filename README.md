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

- Node.js + TypeScript
- Express.js
- Prisma ORM (PostgreSQL)
- Docker (para base de datos)
- Socket.io (sincronización en tiempo real)
- JWT y cookies para autenticación

## ⚡ Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone 
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
   npx prisma migrate dev
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

## 📚 Endpoints principales

- `/auth` - Registro, login y gestión de sesión
- `/sync-room` - Crear y gestionar salas colaborativas
- `/playlist` - Crear playlists, añadir/eliminar música
- `/music` - CRUD de música, búsqueda y favoritos
- `/health` - Endpoint de salud del sistema

## 👤 Roles y permisos

- **Usuario:** Puede unirse a salas, escuchar música, añadir canciones y marcar favoritas.
- **Administrador:** Puede gestionar toda la música del sistema y administrar roles.

## 📝 Notas

- El proyecto está pensado para usarse junto a un frontend web (no incluido aquí).
- Requiere tener Docker instalado para la base de datos.
- Puedes personalizar los seeders en la carpeta `prisma/seeders` para cargar datos iniciales.

---
