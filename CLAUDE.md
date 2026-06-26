# CLAUDE.md — Hablando de TO

Podcast web sobre Terapia Ocupacional. Vue 3 + Vite + Pinia, desplegado en Vercel con serverless functions.

## Mapa de archivos clave

```
src/
  views/          # Páginas principales (una por ruta)
  components/
    layout/       # AppHeader.vue, AppFooter.vue
    home/         # Componentes de HomeView
    podcast/      # Componentes de PodcastView / EpisodeView
  composables/
    useAllVideos.js   # Fetch paginado de YouTube API → todos los vídeos (caché 2h localStorage)
    useMetrics.js     # Fetch stats del canal YouTube (caché 1h localStorage)
  stores/
    episodes.js   # Pinia store con datos estáticos de episodios
  data/
    episodes.js   # Array de 42 episodios con metadatos estáticos
    guests.js     # Array de invitados
api/
  youtube.js          # Serverless: stats del canal (subscribers, views, videoCount)
  youtube-videos.js   # Serverless: todos los vídeos paginados con duración/views
```

## Archivos/carpetas a ignorar siempre

- `node_modules/`
- `dist/`
- `.git/`
- `*.log`, `*.lock` (package-lock.json)
- `src/assets/vite.svg`, `src/assets/vue.svg`, `src/components/HelloWorld.vue`

## Reglas de trabajo

**Subagentes**: usar SOLO para tareas paralelas e independientes entre sí. Máximo 3 simultáneos. Para tareas secuenciales, procesarlas paso a paso sin subagentes.

**Contexto**: ejecutar `/compact` cuando el contexto supere los 100k tokens.

**Ediciones**: preferir `Edit` sobre `Write`. No crear archivos de documentación salvo que se pida.

**Comentarios en código**: ninguno salvo que el "por qué" no sea obvio.

## Variables de entorno (Vercel)

- `YOUTUBE_API_KEY` — Google YouTube Data API v3

## Métricas reales hardcodeadas (actualizar manualmente si cambian)

- `SPOTIFY_FOLLOWERS = 1429` (MetricsView.vue)
- `INSTAGRAM_FOLLOWERS = 3130` (MetricsView.vue)
