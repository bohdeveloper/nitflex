#### main ####
####
###
##
#
# ✅ Modelo Usuario con perfiles
# ✅ perfiles.routes.ts
# ✅ perfiles.controller.ts (CRUD de perfiles)
# ✅ authMiddleware que: valida JWT, añade req.usuarioId
# ✅ Crear un perfil de usuario
# ✅ Subida de imagen de perfil

# ✅Eliminar un perfil de usuario
# ✅Modificar un perfil de usuario
# ✅Seleccionar un perfil de usuario
# ✅Configurar nav para mostrar Peliculas y Series solo cuando se acceda a un perfil
# ✅Poner imagen de perfil en el botón sidebar al seleccionar el perfil
# Controlar subidas de imagenes en uploads/avatars para que no se acumulen

# Configurar acceso a API TMDB (api key en variables de entorno)
# Crear servicio TMDB en backend (tmdb.service.ts)

## Endpoints backend de películas:
# - Obtener tendencias (trending)
# - Obtener películas populares
# - Obtener películas por género
# - Obtener detalle de película por ID

## Endpoints backend de series:
# - Series en tendencia
# - Series populares
# - Detalle de serie por ID
# Mapear y filtrar respuesta TMDB (evitar exponer datos innecesarios)
# Manejo de errores y rate limit básico

## Home tipo Netflix
# Layout principal tras seleccionar perfil
# Filas horizontales de contenido (movies / series)
# Scroll horizontal por fila
# Categorías dinámicas (por género)
# Skeleton loaders mientras carga contenido
# Manejo de error y estado vacío

## Separar componentes:
# - Row
# - MovieCard / SerieCard
# - SectionTitle

## Página de detalle
# Página detalle película / serie
# Mostrar:
# - Imagen
# - Título
# - Descripción
# - Géneros
# - Fecha de estreno
# - Valoración
# Obtener tráiler desde TMDB (YouTube)
# Botón “Reproducir” (placeholder inicialmente)

## Mi lista / Favoritos
# Modelo favoritos por perfil (no por usuario)
# Añadir / quitar contenido de favoritos
# Persistencia en MongoDB
# Endpoint protegido por JWT + perfil activo
# Página “Mi lista”

## Seguridad y UX
# Proteger rutas si no hay perfil seleccionado
# Redirecciones automáticas (login → perfiles → home)
# Guardar perfil activo en frontend
# Cerrar sesión limpia (context + storage)
# Manejo global de errores (toast / alerts)

## Extras / Calidad
# Normalizar servicios frontend (api client)
# Custom hooks (useMovies, useSeries, useProfile)
# Limpieza de archivos subidos al borrar perfiles
# Variables de entorno separadas (dev / prod)
# README técnico del proyecto