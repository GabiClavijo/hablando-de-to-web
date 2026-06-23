<template>
  <div class="guests-view">
    <div class="page-hero">
      <div class="container">
        <span class="section-header__label">Red de referentes</span>
        <h1>Invitados</h1>
        <p>Profesionales expertos que comparten conocimiento y experiencia en Terapia Ocupacional.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="guests-directory">
          <div
            v-for="guest in allGuests"
            :key="guest.id"
            class="guest-profile card"
          >
            <div class="guest-profile__img">
              <img :src="guest.image" :alt="guest.name" />
            </div>
            <div class="guest-profile__content">
              <div class="guest-profile__header">
                <div>
                  <h3>{{ guest.name }}</h3>
                  <p class="guest-role">{{ guest.role }}</p>
                  <span class="badge badge-secondary">{{ guest.specialty }}</span>
                </div>
                <div class="guest-social">
                  <a v-if="guest.social.linkedin" :href="guest.social.linkedin" target="_blank" class="social-link" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a v-if="guest.social.twitter" :href="guest.social.twitter" target="_blank" class="social-link" aria-label="Twitter">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.736-8.847L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a v-if="guest.social.researchgate" :href="guest.social.researchgate" target="_blank" class="social-link" aria-label="ResearchGate">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .079.53 3.217 3.217 0 0 0 .112.437c.243.743.65 1.302 1.213 1.678.565.376 1.255.564 2.073.564.822 0 1.518-.19 2.09-.572.57-.38.976-.939 1.217-1.677a3.108 3.108 0 0 0 .113-.437 8.428 8.428 0 0 0 .077-.53 8.566 8.566 0 0 0 .048-.727c.012-.282.014-.622.014-1.017 0-.395-.002-.734-.014-1.016a8.566 8.566 0 0 0-.048-.727 8.428 8.428 0 0 0-.077-.53 3.108 3.108 0 0 0-.113-.437c-.241-.738-.647-1.297-1.217-1.68C21.104.19 20.408 0 19.586 0z"/></svg>
                  </a>
                  <a v-if="guest.social.youtube" :href="guest.social.youtube" target="_blank" class="social-link" aria-label="YouTube">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>
              <p class="guest-bio">{{ guest.bio }}</p>
              <div class="guest-meta">
                <span class="guest-workplace">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  {{ guest.workArea }}
                </span>
              </div>
              <div class="guest-publications" v-if="guest.publications?.length">
                <h4>Publicaciones</h4>
                <ul>
                  <li v-for="pub in guest.publications" :key="pub">{{ pub }}</li>
                </ul>
              </div>
              <div class="guest-episodes" v-if="guest.episodes?.length || guest.social?.youtube">
                <h4>Episodios</h4>
                <div class="guest-ep-links">
                  <router-link
                    v-for="epId in guest.episodes"
                    :key="epId"
                    :to="`/podcast/${epId}`"
                    class="btn btn-outline btn-sm"
                  >
                    Episodio {{ epId }}
                  </router-link>
                  <a v-if="guest.fromApi && guest.social?.youtube" :href="guest.social.youtube" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
                    Ver en YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { guests } from '../data/guests'
import { useAllVideos } from '../composables/useAllVideos'

const { videos, fromApi } = useAllVideos()

// Extrae el nombre del invitado del título del vídeo (patrón "Nombre | Tema")
function extractGuest(title) {
  const sep = title.indexOf(' | ')
  if (sep === -1) return null
  const name = title.substring(0, sep).trim()
  // Excluir genéricos
  if (/debate|TO a |mesa/i.test(name)) return null
  return name
}

// Construye perfiles básicos desde vídeos de YouTube no cubiertos por datos estáticos
const apiGuests = computed(() => {
  if (!fromApi.value || !videos.value.length) return []
  const staticNames = new Set(guests.map(g => g.name.toLowerCase()))
  const seen = new Set()
  const result = []
  for (const v of videos.value) {
    const name = extractGuest(v.title)
    if (!name || seen.has(name.toLowerCase()) || staticNames.has(name.toLowerCase())) continue
    seen.add(name.toLowerCase())
    result.push({
      id: `yt-${v.id}`,
      name,
      role: 'Invitado/a — Hablando de TO',
      specialty: v.title.split(' | ')[1] || 'Terapia Ocupacional',
      bio: v.description ? v.description.slice(0, 220) + (v.description.length > 220 ? '…' : '') : `Invitado en el episodio "${v.title}".`,
      image: v.thumbnail || `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
      episodes: [],
      publications: [],
      workArea: 'Ver episodio en YouTube',
      social: { youtube: v.url },
      fromApi: true
    })
  }
  return result
})

const allGuests = computed(() => [...guests, ...apiGuests.value])
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

.guests-directory {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.guest-profile {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--spacing-2xl);
  padding: var(--spacing-2xl);
}

.guest-profile__img {
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 1;
  max-height: 200px;
}
.guest-profile__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.guest-profile__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.guest-profile__content h3 {
  font-size: 1.4rem;
  color: var(--color-primary-dark);
  margin-bottom: 4px;
}

.guest-role {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin-bottom: var(--spacing-sm);
}

.guest-social { display: flex; gap: 8px; }
.social-link {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}
.social-link:hover { background: var(--color-primary); color: white; }

.guest-bio {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

.guest-meta {
  margin-bottom: var(--spacing-lg);
}

.guest-workplace {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.guest-publications h4,
.guest-episodes h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--spacing-sm);
}

.guest-publications ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: var(--spacing-md);
}

.guest-publications li {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  padding-left: 12px;
  border-left: 2px solid var(--color-accent);
}

.guest-ep-links { display: flex; gap: var(--spacing-sm); flex-wrap: wrap; }

@media (max-width: 768px) {
  .guest-profile { grid-template-columns: 1fr; }
  .guest-profile__img { max-width: 160px; max-height: 160px; }
  .guest-profile__header { flex-direction: column; gap: var(--spacing-sm); }
}
</style>
