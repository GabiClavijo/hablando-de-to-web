<template>
  <div class="podcast-view">
    <div class="page-hero">
      <div class="container">
        <span class="section-header__label">Biblioteca de episodios</span>
        <h1>El Podcast</h1>
        <p>Conversaciones con expertos sobre Terapia Ocupacional. Escucha, aprende y crece.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Filters -->
        <div class="filters-bar">
          <div class="filters-bar__search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              v-model="store.searchQuery"
              type="search"
              placeholder="Buscar episodio o invitado..."
              class="form-input"
            />
          </div>
          <div class="filters-bar__tags">
            <span
              v-for="cat in store.categories"
              :key="cat"
              class="tag"
              :class="{ active: store.activeCategory === cat }"
              @click="store.activeCategory = cat"
            >{{ cat }}</span>
          </div>
          <div class="filters-bar__format">
            <span
              v-for="fmt in store.formats"
              :key="fmt"
              class="tag"
              :class="{ active: store.activeFormat === fmt }"
              @click="store.activeFormat = fmt"
            >{{ fmt }}</span>
          </div>
        </div>

        <!-- Results count -->
        <p class="results-count">
          <strong>{{ mergedEpisodes.length }}</strong> episodio{{ mergedEpisodes.length !== 1 ? 's' : '' }}
        </p>

        <!-- Episodes grid -->
        <div class="episodes-grid" v-if="mergedEpisodes.length">
          <router-link
            v-for="ep in mergedEpisodes"
            :key="ep.id"
            :to="`/podcast/${ep.id}`"
            class="episode-row card"
          >
            <div class="episode-row__img">
              <img :src="ep.image" :alt="ep.title" />
              <span class="ep-number">{{ ep.number }}</span>
            </div>
            <div class="episode-row__content">
              <div class="episode-row__meta">
                <span class="badge badge-primary">{{ ep.category }}</span>
                <span class="badge badge-secondary">{{ ep.format }}</span>
                <span class="ep-date">{{ formatDate(ep.date) }}</span>
              </div>
              <h3>{{ ep.title }}</h3>
              <p class="ep-guest">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {{ ep.guest }}
              </p>
              <p class="ep-summary">{{ ep.summary }}</p>
              <div class="episode-row__footer">
                <div class="ep-tags">
                  <span v-for="tag in ep.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <span class="ep-duration">⏱ {{ ep.duration }}</span>
              </div>
            </div>
            <div class="episode-row__platforms">
              <a :href="ep.spotifyUrl" target="_blank" class="platform-tag platform-spotify" @click.stop>Spotify</a>
              <a :href="ep.youtubeUrl" target="_blank" class="platform-tag platform-youtube" @click.stop>YouTube</a>
            </div>
          </router-link>
        </div>

        <div v-else-if="!mergedEpisodes.length" class="no-results">
          <span>🔍</span>
          <p>No se encontraron episodios con estos filtros.</p>
          <button class="btn btn-outline" @click="clearFilters">Limpiar filtros</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEpisodesStore } from '../stores/episodes'
import { useAllVideos } from '../composables/useAllVideos'

const store = useEpisodesStore()
const { videos: apiVideos, fromApi } = useAllVideos()

const mergedEpisodes = computed(() => {
  if (!fromApi.value || !apiVideos.value.length) return store.filteredEpisodes

  const query = store.searchQuery.toLowerCase()
  const cat = store.activeCategory
  const fmt = store.activeFormat

  return apiVideos.value
    .map(v => {
      const match = store.allEpisodes.find(ep => ep.youtubeId === v.id)
      return {
        id: match?.id ?? v.id,
        number: match?.number ?? '',
        title: match?.title ?? v.title,
        guest: match?.guest ?? v.title.split(' | ')[0] ?? '',
        category: match?.category ?? 'Divulgación',
        format: match?.format ?? 'Entrevista',
        date: match?.date ?? v.publishedAt ?? '',
        duration: match?.duration ?? v.duration ?? '',
        summary: match?.summary ?? v.description ?? '',
        tags: match?.tags ?? [],
        spotifyUrl: match?.spotifyUrl ?? '',
        youtubeUrl: match?.url ?? v.url ?? '',
        image: v.thumbnail ?? match?.image ?? '',
        views: v.views ?? 0,
        featured: match?.featured ?? false,
      }
    })
    .filter(ep => {
      const matchesCat = cat === 'Todos' || ep.category === cat
      const matchesFmt = fmt === 'Todos' || ep.format === fmt
      const matchesSearch = !query ||
        ep.title.toLowerCase().includes(query) ||
        ep.guest.toLowerCase().includes(query)
      return matchesCat && matchesFmt && matchesSearch
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

function clearFilters() {
  store.activeCategory = 'Todos'
  store.activeFormat = 'Todos'
  store.searchQuery = ''
}
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  padding: 120px 0 60px;
  color: white;
}
.page-hero h1 { font-size: clamp(2rem, 5vw, 3rem); color: white; margin: var(--spacing-sm) 0; }
.page-hero p { color: rgba(255,255,255,0.75); font-size: 1.1rem; }
.page-hero .section-header__label { color: var(--color-accent-light); }

.filters-bar {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  box-shadow: var(--shadow-sm);
}

.filters-bar__search {
  position: relative;
  display: flex;
  align-items: center;
}

.filters-bar__search svg {
  position: absolute;
  left: 16px;
  color: var(--color-text-muted);
}

.filters-bar__search .form-input {
  padding-left: 44px;
}

.filters-bar__tags, .filters-bar__format {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.results-count {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xl);
}

.episodes-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.episode-row {
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: var(--spacing-lg);
  align-items: start;
  padding: var(--spacing-lg);
  text-decoration: none;
}

.episode-row__img {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 16/9;
}

.episode-row__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ep-number {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--color-primary);
  color: white;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: var(--radius-full);
}

.episode-row__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.ep-date {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-left: auto;
}

.episode-row__content h3 {
  font-size: 1.1rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-sm);
  line-height: 1.35;
}

.ep-guest {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

.ep-summary {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.episode-row__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ep-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.ep-duration { font-size: 0.8rem; color: var(--color-text-muted); white-space: nowrap; }

.episode-row__platforms {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.no-results {
  text-align: center;
  padding: var(--spacing-4xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.no-results span { font-size: 3rem; }
.no-results p { color: var(--color-text-muted); }

@media (max-width: 768px) {
  .episode-row { grid-template-columns: 1fr; }
  .episode-row__platforms { flex-direction: row; }
}
</style>
