<template>
  <div class="episode-view" v-if="episode">
    <!-- Header -->
    <div class="ep-hero">
      <div class="container">
        <router-link to="/podcast" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver al podcast
        </router-link>
        <div class="ep-hero__content">
          <div class="ep-hero__img">
            <img :src="episode.image" :alt="episode.title" />
          </div>
          <div class="ep-hero__info">
            <div class="ep-meta">
              <span class="badge badge-accent">Ep. {{ episode.number }}</span>
              <span class="badge badge-primary">{{ episode.category }}</span>
              <span class="badge badge-secondary">{{ episode.format }}</span>
            </div>
            <h1>{{ episode.title }}</h1>
            <div class="ep-guest-info">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>{{ episode.guest }}</span>
            </div>
            <p class="ep-date">📅 {{ formatDate(episode.date) }} &nbsp;·&nbsp; ⏱ {{ episode.duration }}</p>

            <!-- Audio Player -->
            <div class="audio-player">
              <div class="audio-player__controls">
                <button class="play-btn" @click="togglePlay" aria-label="Reproducir">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path v-if="!playing" d="M8 5v14l11-7z"/>
                    <path v-else d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                </button>
                <div class="player-info">
                  <span class="player-title">{{ episode.title }}</span>
                  <div class="progress-bar" @click="seek">
                    <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                  </div>
                  <div class="player-times">
                    <span>{{ currentTime }}</span>
                    <span>{{ episode.duration }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Platforms -->
            <div class="ep-platforms">
              <a :href="episode.spotifyUrl" target="_blank" class="platform-tag platform-spotify">Spotify</a>
              <a :href="episode.youtubeUrl" target="_blank" class="platform-tag platform-youtube">YouTube</a>
              <a :href="episode.appleUrl" target="_blank" class="platform-tag platform-apple">Apple</a>
              <a :href="episode.ivooxUrl" target="_blank" class="platform-tag platform-ivoox">iVoox</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <section class="section">
      <div class="container">
        <div class="ep-layout">
          <!-- Main column -->
          <div class="ep-main">
            <!-- Summary -->
            <div class="content-card">
              <h2>Resumen del episodio</h2>
              <p>{{ episode.summary }}</p>
            </div>

            <!-- Key Ideas -->
            <div class="content-card">
              <h2>Ideas clave</h2>
              <ul class="key-ideas">
                <li v-for="(idea, i) in episode.keyIdeas" :key="i">
                  <span class="idea-number">{{ i + 1 }}</span>
                  <span>{{ idea }}</span>
                </li>
              </ul>
            </div>

            <!-- References -->
            <div class="content-card">
              <h2>Referencias científicas</h2>
              <ul class="references">
                <li v-for="(ref, i) in episode.references" :key="i">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  {{ ref }}
                </li>
              </ul>
            </div>

            <!-- Share -->
            <div class="content-card share-card">
              <h2>Comparte este episodio</h2>
              <div class="share-buttons">
                <button class="btn btn-outline" @click="share('twitter')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.736-8.847L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter/X
                </button>
                <button class="btn btn-outline" @click="share('linkedin')">LinkedIn</button>
                <button class="btn btn-outline" @click="copyLink">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  {{ copied ? '¡Copiado!' : 'Copiar enlace' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="ep-sidebar">
            <!-- Guest -->
            <div class="sidebar-card">
              <h3>Sobre el invitado</h3>
              <div class="sidebar-guest">
                <div class="sidebar-guest__name">{{ episode.guest }}</div>
                <router-link to="/invitados" class="btn btn-ghost btn-sm">Ver perfil completo →</router-link>
              </div>
            </div>

            <!-- Tags -->
            <div class="sidebar-card">
              <h3>Temáticas</h3>
              <div class="tag-list">
                <span v-for="tag in episode.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>

            <!-- Related -->
            <div class="sidebar-card">
              <h3>Más episodios</h3>
              <div class="related-list">
                <router-link
                  v-for="rel in relatedEpisodes"
                  :key="rel.id"
                  :to="`/podcast/${rel.id}`"
                  class="related-item"
                >
                  <img :src="rel.image" :alt="rel.title" />
                  <div>
                    <span class="related-num">Ep. {{ rel.number }}</span>
                    <p>{{ rel.title }}</p>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- Platforms -->
            <div class="sidebar-card">
              <h3>Escuchar en</h3>
              <div class="platform-list">
                <a :href="episode.spotifyUrl" target="_blank" class="platform-full platform-spotify">
                  Escuchar en Spotify
                </a>
                <a :href="episode.youtubeUrl" target="_blank" class="platform-full platform-youtube">
                  Ver en YouTube
                </a>
                <a :href="episode.ivooxUrl" target="_blank" class="platform-full platform-ivoox">
                  Escuchar en iVoox
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="not-found">
    <div class="container">
      <h2>Episodio no encontrado</h2>
      <router-link to="/podcast" class="btn btn-primary">Ver todos los episodios</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEpisodesStore } from '../stores/episodes'

const route = useRoute()
const store = useEpisodesStore()
const episode = computed(() => store.getEpisodeById(route.params.id))
const relatedEpisodes = computed(() =>
  store.allEpisodes.filter(e => e.id !== episode.value?.id).slice(0, 3)
)

const playing = ref(false)
const progress = ref(0)
const currentTime = ref('0:00')
const copied = ref(false)

function togglePlay() { playing.value = !playing.value }
function seek(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  progress.value = ((e.clientX - rect.left) / rect.width) * 100
}
function formatDate(d) {
  return new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}
function share(network) {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`Escucha "${episode.value?.title}" en Hablando de TO`)
  if (network === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
  if (network === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}
async function copyLink() {
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<style scoped>
.ep-hero {
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  padding: 100px 0 60px;
  color: white;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-2xl);
  transition: color var(--transition-fast);
}
.back-link:hover { color: white; }

.ep-hero__content {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: var(--spacing-3xl);
  align-items: start;
}

.ep-hero__img {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.ep-hero__img img { width: 100%; }

.ep-meta {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.ep-hero__info h1 {
  color: white;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  margin-bottom: var(--spacing-md);
}

.ep-guest-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.8);
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.ep-date {
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-xl);
}

.player-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.player-title {
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-times {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  opacity: 0.7;
}

.ep-platforms {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-top: var(--spacing-lg);
}

/* Layout */
.ep-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: var(--spacing-3xl);
  align-items: start;
}

.content-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
}

.content-card h2 {
  font-size: 1.25rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-lg);
}

.content-card p {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.key-ideas {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.key-ideas li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.idea-number {
  min-width: 28px;
  height: 28px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.references {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.references li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.references li svg { flex-shrink: 0; margin-top: 2px; }

.share-card { }
.share-buttons { display: flex; gap: var(--spacing-sm); flex-wrap: wrap; }

/* Sidebar */
.sidebar-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
}

.sidebar-card h3 {
  font-size: 1rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-md);
}

.sidebar-guest__name {
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-sm);
}

.tag-list { display: flex; gap: 6px; flex-wrap: wrap; }

.related-list { display: flex; flex-direction: column; gap: var(--spacing-md); }

.related-item {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
  transition: opacity var(--transition-fast);
}
.related-item:hover { opacity: 0.7; }
.related-item img {
  width: 70px;
  height: 50px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.related-num { font-size: 0.75rem; color: var(--color-text-muted); display: block; }
.related-item p { font-size: 0.85rem; color: var(--color-text); font-weight: 500; line-height: 1.35; }

.platform-list { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.platform-full {
  display: block;
  text-align: center;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  transition: all var(--transition-fast);
}
.platform-full:hover { opacity: 0.85; transform: translateY(-1px); }

.not-found {
  padding: 120px 0;
  text-align: center;
}
.not-found h2 { margin-bottom: var(--spacing-xl); }

@media (max-width: 1024px) {
  .ep-layout { grid-template-columns: 1fr; }
  .ep-hero__content { grid-template-columns: 1fr; }
  .ep-hero__img { max-width: 400px; }
}
</style>
