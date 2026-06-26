<template>
  <div class="youtube-page">

    <!-- Hero -->
    <section class="yt-hero">
      <div class="container">
        <div class="yt-hero__inner">
          <div class="yt-hero__text">
            <div class="yt-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Hablando de TO en YouTube
            </div>
            <h1>El podcast en vídeo</h1>
            <p>
              Todos los episodios disponibles en formato vídeo. Entrevistas completas, sin edición,
              con la experiencia visual de ver a los profesionales que construyen la TO en español.
            </p>
            <div class="yt-hero__stats">
              <div class="yt-stat">
                <span class="yt-stat__num">+11.500</span>
                <span class="yt-stat__lbl">Visualizaciones</span>
              </div>
              <div class="yt-stat__sep"></div>
              <div class="yt-stat">
                <span class="yt-stat__num">42+</span>
                <span class="yt-stat__lbl">Episodios</span>
              </div>
              <div class="yt-stat__sep"></div>
              <div class="yt-stat">
                <span class="yt-stat__num">67%</span>
                <span class="yt-stat__lbl">Retención media</span>
              </div>
            </div>
            <div class="yt-hero__actions">
              <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="btn-yt-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Ir al canal
              </a>
              <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="btn-sp-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                Escuchar en Spotify
              </a>
            </div>
          </div>
          <div class="yt-hero__channel">
            <div class="channel-card">
              <div class="channel-card__header">
                <div class="channel-logo">
                  <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.15)"/>
                    <path d="M22 54 Q30 26 40 40 Q50 54 58 26" stroke="white" stroke-width="4" stroke-linecap="round" fill="none"/>
                    <circle cx="40" cy="40" r="7" fill="white"/>
                  </svg>
                </div>
                <div class="channel-info">
                  <h3>Hablando de TO</h3>
                  <p>@Hablandode_to</p>
                </div>
              </div>
              <div class="channel-card__stats">
                <div class="ch-stat">
                  <strong>{{ ytLoading ? '…' : fmtNum(ytData?.channel?.totalViews) }}</strong>
                  <span>Visualizaciones</span>
                </div>
                <div class="ch-stat">
                  <strong>{{ ytLoading ? '…' : fmtNum(ytData?.channel?.subscribers) }}</strong>
                  <span>Suscriptores</span>
                </div>
                <div class="ch-stat">
                  <strong>{{ ytLoading ? '…' : (ytData?.channel?.videoCount ?? (fromApi ? apiVideos.length : '—')) }}</strong>
                  <span>Vídeos</span>
                </div>
              </div>
              <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="channel-card__cta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Suscribirse al canal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Most viewed -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Más vistos</span>
          <h2 class="section-header__title">Episodios destacados</h2>
          <p class="section-header__subtitle">Los vídeos con mayor impacto del canal.</p>
        </div>

        <!-- Featured row (top episode) -->
        <div class="yt-featured">
          <div class="yt-featured__thumb">
            <img :src="topEpisode.image" :alt="topEpisode.title" loading="lazy" />
            <div class="yt-featured__overlay">
              <a :href="topEpisode.youtubeUrl" target="_blank" rel="noopener" class="yt-play-big">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
              </a>
            </div>
            <div class="yt-featured__views">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {{ topEpisode.viewsLabel }} visualizaciones
            </div>
            <div class="yt-featured__badge">#1 Más visto</div>
          </div>
          <div class="yt-featured__info">
            <span class="badge badge-accent">Ep. {{ topEpisode.number }}</span>
            <h3>{{ topEpisode.title }}</h3>
            <p class="yt-featured__guest">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {{ topEpisode.guest }}
            </p>
            <p class="yt-featured__summary">{{ topEpisode.summary }}</p>
            <div class="yt-featured__meta">
              <span class="badge badge-primary">{{ topEpisode.category }}</span>
              <span>⏱ {{ topEpisode.duration }}</span>
            </div>
            <div class="yt-featured__tags">
              <span v-for="tag in topEpisode.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="yt-featured__actions">
              <a :href="topEpisode.youtubeUrl" target="_blank" rel="noopener" class="btn-yt-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Ver en YouTube
              </a>
              <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
                🎧 Solo audio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All episodes -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Todos los vídeos</span>
          <h2 class="section-header__title">
            Catálogo completo
            <span v-if="fromApi" class="yt-count-badge">{{ filteredEpisodes.length }} vídeos</span>
          </h2>
          <p v-if="apiLoading" class="section-header__subtitle" style="color: var(--color-primary)">
            Cargando vídeos del canal…
          </p>
          <p v-else-if="fromApi" class="section-header__subtitle">
            Todos los episodios del canal, actualizados automáticamente desde YouTube.
          </p>
        </div>

        <!-- Filter bar -->
        <div class="yt-filters">
          <button
            v-for="f in filters"
            :key="f"
            class="tag"
            :class="{ active: activeFilter === f }"
            @click="activeFilter = f"
          >
            {{ f }}
          </button>
        </div>

        <!-- Loading skeleton -->
        <div v-if="apiLoading" class="yt-grid">
          <div v-for="n in 6" :key="n" class="yt-card card yt-card--skeleton">
            <div class="yt-card__thumb yt-skeleton"></div>
            <div class="yt-card__body">
              <div class="yt-skeleton yt-skeleton--line" style="width: 60%; height: 14px; margin-bottom: 8px"></div>
              <div class="yt-skeleton yt-skeleton--line" style="width: 90%; height: 18px; margin-bottom: 6px"></div>
              <div class="yt-skeleton yt-skeleton--line" style="width: 50%; height: 13px"></div>
            </div>
          </div>
        </div>

        <div v-else class="yt-grid">
          <a
            v-for="ep in filteredEpisodes"
            :key="ep.id"
            :href="ep.url || ep.youtubeUrl"
            target="_blank"
            rel="noopener"
            class="yt-card card"
          >
            <div class="yt-card__thumb">
              <img :src="ep.thumbnail || ep.image" :alt="ep.title" loading="lazy" />
              <div class="yt-card__play-overlay">
                <div class="yt-card__play-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div v-if="ep.duration" class="yt-card__duration">{{ ep.duration }}</div>
              <div v-if="ep.views" class="yt-card__views">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {{ ep.viewsLabel }}
              </div>
            </div>
            <div class="yt-card__body">
              <div class="yt-card__meta">
                <span v-if="ep.category" class="badge badge-primary">{{ ep.category }}</span>
                <span v-if="ep.number" class="yt-card__ep">Ep. {{ ep.number }}</span>
                <span v-else-if="ep.publishedLabel" class="yt-card__ep">{{ ep.publishedLabel }}</span>
              </div>
              <h4>{{ ep.title }}</h4>
              <p v-if="ep.guest" class="yt-card__guest">{{ ep.guest }}</p>
              <div v-if="ep.tags?.length" class="yt-card__tags">
                <span v-for="tag in ep.tags.slice(0, 2)" :key="tag" class="tag" style="font-size: 0.72rem; padding: 2px 8px">{{ tag }}</span>
              </div>
            </div>
          </a>
        </div>

        <div class="section-footer">
          <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="btn-yt-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Ver canal completo
          </a>
        </div>
      </div>
    </section>

    <!-- Spotify alternative -->
    <section class="section">
      <div class="container">
        <div class="alt-platform-block">
          <div class="alt-platform-block__text">
            <h2>¿Prefieres solo el audio?</h2>
            <p>
              Todos los episodios también están disponibles en Spotify, Apple Podcasts, iVoox y Amazon Music.
              Escucha mientras caminas, conduces o trabajas.
            </p>
            <div class="alt-platforms">
              <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="platform-tag platform-spotify">Spotify</a>
              <a href="https://podcasts.apple.com/us/podcast" target="_blank" rel="noopener" class="platform-tag platform-apple">Apple Podcasts</a>
              <a href="https://go.ivoox.com/sq/2734836" target="_blank" rel="noopener" class="platform-tag platform-ivoox">iVoox</a>
              <a href="https://music.amazon.es/podcasts" target="_blank" rel="noopener" class="platform-tag platform-amazon">Amazon Music</a>
            </div>
          </div>
          <div class="alt-platform-block__embed">
            <iframe
              src="https://open.spotify.com/embed/show/686Q2N3yZtX36SqEzRbFCB?utm_source=generator&theme=0"
              width="100%"
              height="200"
              frameborder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Hablando de TO en Spotify"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEpisodesStore } from '../stores/episodes'
import { storeToRefs } from 'pinia'
import { useAllVideos } from '../composables/useAllVideos'
import { useYouTubeMetrics } from '../composables/useMetrics'

const store = useEpisodesStore()
const { allEpisodes } = storeToRefs(store)
const activeFilter = ref('Todos')

const { videos: apiVideos, loading: apiLoading, fromApi } = useAllVideos()
const { data: ytData, loading: ytLoading } = useYouTubeMetrics()

function fmtNum(n) {
  if (n == null) return '—'
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K'
  return n.toLocaleString('es-ES')
}

const filters = ['Todos', 'Más vistos', 'Más recientes']

// Top episode: usa datos reales de la API si están disponibles, si no usa el store
const topEpisode = computed(() => {
  if (fromApi.value && apiVideos.value.length) {
    const sorted = [...apiVideos.value].sort((a, b) => (b.views || 0) - (a.views || 0))
    const v = sorted[0]
    if (!v) return null
    // Enriquecer con metadata del store si coincide el youtubeId
    const match = allEpisodes.value.find(ep => ep.youtubeId === v.id)
    return {
      ...v,
      image: v.thumbnail,
      youtubeUrl: v.url,
      number: match?.number ?? '',
      guest: match?.guest ?? v.title.split(' | ')[0],
      summary: match?.summary ?? v.description ?? '',
      category: match?.category ?? '',
      tags: match?.tags ?? [],
      viewsLabel: v.views ? v.views.toLocaleString('es-ES') : '0',
    }
  }
  // Fallback al store
  const sorted = [...allEpisodes.value].sort((a, b) => (b.views || 0) - (a.views || 0))
  const ep = sorted[0]
  return ep ? { ...ep, image: ep.image, youtubeUrl: ep.youtubeUrl, viewsLabel: ep.views ? ep.views.toLocaleString('es-ES') : '' } : null
})

// All videos display: API data if available, otherwise fallback to store episodes
const allVideosDisplay = computed(() => {
  if (fromApi.value && apiVideos.value.length) {
    return apiVideos.value
  }
  return [...allEpisodes.value]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .map(ep => ({
      id: ep.youtubeId || ep.id,
      title: ep.title,
      thumbnail: ep.image,
      publishedAt: ep.date,
      publishedLabel: ep.date,
      views: ep.views || 0,
      viewsLabel: ep.views ? ep.views.toLocaleString('es-ES') : '',
      duration: ep.duration,
      url: ep.youtubeUrl,
      // Store-only fields for richer display
      category: ep.category,
      number: ep.number,
      guest: ep.guest,
      tags: ep.tags || [],
    }))
})

const filteredEpisodes = computed(() => {
  const list = allVideosDisplay.value
  if (activeFilter.value === 'Más vistos') return [...list].sort((a, b) => b.views - a.views)
  if (activeFilter.value === 'Más recientes') return [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  return list
})
</script>

<style scoped>
/* ===== HERO ===== */
.yt-hero {
  background: #0F0F0F;
  padding: 140px 0 80px;
  color: white;
}

.yt-hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.yt-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,0,0,0.15);
  border: 1px solid rgba(255,0,0,0.3);
  color: #FF6B6B;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.yt-hero__text h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: white;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.yt-hero__text > p {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.yt-hero__stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.yt-stat__num {
  display: block;
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  line-height: 1;
}
.yt-stat__lbl {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
}
.yt-stat__sep {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.15);
}

.yt-hero__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-yt-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background: #FF0000;
  color: white;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all var(--transition-base);
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
}
.btn-yt-primary:hover {
  background: #CC0000;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,0,0,0.35);
}

.btn-sp-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background: transparent;
  color: #1DB954;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all var(--transition-base);
  border: 2px solid #1DB954;
  text-decoration: none;
}
.btn-sp-secondary:hover {
  background: #1DB954;
  color: white;
  transform: translateY(-2px);
}

/* Channel card */
.channel-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.channel-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.channel-logo {
  flex-shrink: 0;
}

.channel-info h3 {
  font-size: 1.1rem;
  font-weight: 800;
  color: white;
  margin-bottom: 3px;
}

.channel-info p {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
}

.channel-card__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;
  text-align: center;
}

.ch-stat strong {
  display: block;
  font-size: 1.25rem;
  font-weight: 900;
  color: white;
  margin-bottom: 2px;
}

.ch-stat span {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.5);
}

.channel-card__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #FF0000;
  color: white;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all var(--transition-fast);
  text-decoration: none;
}
.channel-card__cta:hover { background: #CC0000; }

/* ===== FEATURED ===== */
.yt-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.yt-featured__thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.yt-featured__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.yt-featured__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.yt-featured__thumb:hover .yt-featured__overlay { opacity: 1; }

.yt-play-big {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);
}
.yt-play-big:hover { transform: scale(1.1); }

.yt-featured__views {
  position: absolute;
  bottom: 0.625rem;
  right: 0.625rem;
  background: rgba(0,0,0,0.75);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
}

.yt-featured__badge {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  background: #FF0000;
  color: white;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 800;
}

.yt-featured__info {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.yt-featured__info h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-deep);
  line-height: 1.3;
}

.yt-featured__guest {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.87rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.yt-featured__summary {
  font-size: 0.87rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.yt-featured__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.yt-featured__tags {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.yt-featured__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

/* ===== GRID ===== */
.yt-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}

.yt-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.yt-card {
  text-decoration: none;
  display: block;
  transition: all var(--transition-base);
}

.yt-card__thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.yt-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.yt-card:hover .yt-card__thumb img {
  transform: scale(1.04);
}

.yt-card__play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.yt-card:hover .yt-card__play-overlay { opacity: 1; }

.yt-card__play-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #FF0000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.yt-card__duration {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0,0,0,0.78);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
}

.yt-card__views {
  position: absolute;
  bottom: 6px;
  left: 6px;
  background: rgba(0,0,0,0.78);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.yt-card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.yt-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.yt-card__ep {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.yt-card__body h4 {
  font-size: 0.9rem;
  color: var(--color-deep);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.yt-card__guest {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.yt-card__tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.section-footer {
  text-align: center;
  margin-top: 2.5rem;
}

/* Count badge next to title */
.yt-count-badge {
  display: inline-block;
  background: #FF0000;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 9999px;
  vertical-align: middle;
  margin-left: 0.75rem;
  letter-spacing: 0.03em;
}

/* Skeleton loader */
.yt-skeleton {
  background: linear-gradient(90deg, var(--color-bg-alt) 25%, var(--color-border) 50%, var(--color-bg-alt) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

.yt-skeleton.yt-card__thumb {
  aspect-ratio: 16/9;
  width: 100%;
}

.yt-skeleton--line {
  border-radius: 6px;
  display: block;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ===== ALT PLATFORM ===== */
.alt-platform-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
}

.alt-platform-block__text h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-deep);
  margin-bottom: 0.75rem;
}

.alt-platform-block__text > p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.alt-platforms {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.alt-platform-block__embed {
  border-radius: 12px;
  overflow: hidden;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .yt-hero__inner { grid-template-columns: 1fr; }
  .yt-hero__channel { display: none; }
  .yt-featured { grid-template-columns: 1fr; }
  .yt-grid { grid-template-columns: repeat(2, 1fr); }
  .alt-platform-block { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .yt-grid { grid-template-columns: 1fr; }
}
</style>
