<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero__bg">
        <div class="hero__wave"></div>
        <div class="hero__particles">
          <span v-for="n in 6" :key="n" class="particle"></span>
        </div>
      </div>
      <div class="container">
        <div class="hero__content">
          <div class="hero__text">
            <span class="hero__badge">🎙️ Podcast · Divulgación · Comunidad</span>
            <h1 class="hero__title">
              El conocimiento sobre<br>
              <span class="gradient-text">Terapia Ocupacional</span><br>
              al alcance de todos
            </h1>
            <p class="hero__subtitle">
              Donde la evidencia científica y la experiencia profesional se unen
              para impulsar la Terapia Ocupacional. Episodios, recursos y comunidad
              para profesionales, estudiantes e investigadores.
            </p>
            <div class="hero__actions">
              <router-link to="/podcast" class="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Escuchar episodios
              </router-link>
              <router-link to="/evidencia" class="btn btn-outline btn-lg">
                Explorar recursos
              </router-link>
            </div>
            <div class="hero__stats">
              <div class="stat">
                <span class="stat__number">+6</span>
                <span class="stat__label">Episodios</span>
              </div>
              <div class="stat__divider"></div>
              <div class="stat">
                <span class="stat__number">6</span>
                <span class="stat__label">Invitados expertos</span>
              </div>
              <div class="stat__divider"></div>
              <div class="stat">
                <span class="stat__number">5</span>
                <span class="stat__label">Plataformas</span>
              </div>
            </div>
          </div>
          <div class="hero__visual">
            <div class="hero__card">
              <div class="hero__card-badge">🎵 Último episodio</div>
              <div class="hero__card-img">
                <img :src="latestEpisode?.image" alt="Último episodio" />
                <div class="hero__card-play">
                  <button class="play-btn" @click="togglePlay" aria-label="Reproducir">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path v-if="!playing" d="M8 5v14l11-7z"/>
                      <path v-else d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="hero__card-body">
                <span class="badge badge-accent">Ep. {{ latestEpisode?.number }}</span>
                <h3>{{ latestEpisode?.title }}</h3>
                <p>{{ latestEpisode?.guest }}</p>
                <div class="hero__card-platforms">
                  <a href="https://open.spotify.com/show/686Q2N3" target="_blank" class="platform-tag platform-spotify">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                    Spotify
                  </a>
                  <a href="https://youtube.com/@hablandode_to" target="_blank" class="platform-tag platform-youtube">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ESCUCHAR EN -->
    <section class="platforms-section">
      <div class="container">
        <p class="platforms-section__label">Escucha Hablando de TO donde prefieras</p>
        <div class="platforms-section__list">
          <a href="https://open.spotify.com/show/686Q2N3" target="_blank" class="platform-tag platform-spotify">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Spotify
          </a>
          <a href="https://podcasts.apple.com/us/podcast" target="_blank" class="platform-tag platform-apple">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Apple Podcasts
          </a>
          <a href="https://youtube.com/@hablandode_to" target="_blank" class="platform-tag platform-youtube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            YouTube
          </a>
          <a href="https://music.amazon.es/podcasts/469d" target="_blank" class="platform-tag platform-amazon">Amazon Music</a>
          <a href="https://go.ivoox.com/sq/2734836" target="_blank" class="platform-tag platform-ivoox">iVoox</a>
        </div>
      </div>
    </section>

    <!-- EXPLORA -->
    <section class="section explore-section">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Todo en un lugar</span>
          <h2 class="section-header__title">Explora Hablando de TO</h2>
          <p class="section-header__subtitle">
            Más que un podcast. Un ecosistema de conocimiento para la Terapia Ocupacional.
          </p>
        </div>
        <div class="explore-grid">
          <router-link
            v-for="item in exploreItems"
            :key="item.to"
            :to="item.to"
            class="explore-card"
            :style="{ '--card-color': item.color }"
          >
            <div class="explore-card__icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="explore-card__cta">
              Explorar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- EPISODIOS DESTACADOS -->
    <section class="section section--alt featured-section">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Selección editorial</span>
          <h2 class="section-header__title">Episodios destacados</h2>
        </div>
        <div class="featured-grid">
          <router-link
            v-for="ep in featuredEpisodes"
            :key="ep.id"
            :to="`/podcast/${ep.id}`"
            class="episode-card card"
          >
            <div class="episode-card__img">
              <img :src="ep.image" :alt="ep.title" />
              <span class="episode-card__num">Ep. {{ ep.number }}</span>
            </div>
            <div class="episode-card__body">
              <div class="episode-card__meta">
                <span class="badge badge-primary">{{ ep.category }}</span>
                <span class="episode-card__duration">⏱ {{ ep.duration }}</span>
              </div>
              <h3>{{ ep.title }}</h3>
              <p class="episode-card__guest">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {{ ep.guest }}
              </p>
              <p class="episode-card__summary">{{ ep.summary }}</p>
              <div class="episode-card__tags">
                <span v-for="tag in ep.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <div class="section-footer">
          <router-link to="/podcast" class="btn btn-outline">Ver todos los episodios</router-link>
        </div>
      </div>
    </section>

    <!-- INVITADOS -->
    <section class="section guests-section">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Red de referentes</span>
          <h2 class="section-header__title">Invitados destacados</h2>
          <p class="section-header__subtitle">Profesionales expertos que comparten su conocimiento y experiencia.</p>
        </div>
        <div class="guests-grid">
          <router-link
            v-for="guest in allGuests"
            :key="guest.id"
            :to="`/invitados`"
            class="guest-card card"
          >
            <img :src="guest.image" :alt="guest.name" class="guest-card__img" />
            <div class="guest-card__body">
              <h4>{{ guest.name }}</h4>
              <p class="guest-card__role">{{ guest.specialty }}</p>
              <span class="badge badge-secondary">Ep. {{ guest.episodes.join(', ') }}</span>
            </div>
          </router-link>
        </div>
        <div class="section-footer">
          <router-link to="/invitados" class="btn btn-outline">Ver directorio completo</router-link>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="newsletter-section" id="newsletter">
      <div class="container">
        <div class="newsletter-box">
          <div class="newsletter-box__text">
            <span class="section-header__label">Mantente al día</span>
            <h2>Recibe las novedades de Hablando de TO</h2>
            <ul class="newsletter-list">
              <li>✅ Nuevos episodios publicados</li>
              <li>✅ Recursos y evidencia científica</li>
              <li>✅ Artículos y noticias de TO</li>
              <li>✅ Próximos eventos y formaciones</li>
            </ul>
          </div>
          <div class="newsletter-box__form">
            <form @submit.prevent="subscribe" class="newsletter-form">
              <div class="form-group">
                <label>Nombre</label>
                <input v-model="form.name" type="text" class="form-input" placeholder="Tu nombre" required />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="form.email" type="email" class="form-input" placeholder="tu@email.com" required />
              </div>
              <button type="submit" class="btn btn-accent btn-lg" style="width:100%">
                Suscribirme gratis
              </button>
              <p class="newsletter-form__disclaimer">Sin spam. Cancela cuando quieras.</p>
            </form>
            <div v-if="subscribed" class="newsletter-success">
              🎉 ¡Suscripción realizada! Bienvenido a la comunidad.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEpisodesStore } from '../stores/episodes'
import { guests } from '../data/guests'
import { storeToRefs } from 'pinia'

const store = useEpisodesStore()
const { featuredEpisodes, latestEpisode } = storeToRefs(store)
const allGuests = guests

const playing = ref(false)
const subscribed = ref(false)
const form = ref({ name: '', email: '' })

function togglePlay() {
  playing.value = !playing.value
}

function subscribe() {
  subscribed.value = true
  form.value = { name: '', email: '' }
}

const exploreItems = [
  {
    to: '/podcast',
    icon: '🎙️',
    title: 'Podcast',
    description: 'Episodios con expertos sobre neurorehabilitación, salud mental, pediatría, geriatría e investigación.',
    color: '#0A3D62'
  },
  {
    to: '/evidencia',
    icon: '🔬',
    title: 'Evidencia Científica',
    description: 'Resúmenes de artículos, revisiones y síntesis de literatura científica con aplicación clínica práctica.',
    color: '#1565C0'
  },
  {
    to: '/recursos',
    icon: '📚',
    title: 'Recursos',
    description: 'Guías clínicas, infografías, plantillas y material para estudiantes y profesionales.',
    color: '#E8A838'
  },
  {
    to: '/comunidad',
    icon: '🤝',
    title: 'Comunidad',
    description: 'Debates, encuestas, propuesta de temas y participación activa de terapeutas ocupacionales.',
    color: '#38A169'
  },
  {
    to: '/formacion',
    icon: '🎓',
    title: 'Formación',
    description: 'Cursos, masterclasses, webinars y eventos especializados en Terapia Ocupacional.',
    color: '#805AD5'
  },
  {
    to: '/invitados',
    icon: '👥',
    title: 'Invitados',
    description: 'Directorio de profesionales referentes con su especialidad, publicaciones y episodios.',
    color: '#D53F8C'
  }
]
</script>

<style scoped>
/* ====== HERO ====== */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #F8FAFF 0%, #EEF3FA 100%);
}

.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__wave {
  position: absolute;
  right: -200px;
  top: -100px;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(21,101,192,0.06) 0%, transparent 70%);
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0.3;
  animation: pulse 3s ease-in-out infinite;
}
.particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { top: 60%; left: 5%; animation-delay: 0.5s; }
.particle:nth-child(3) { top: 30%; right: 15%; animation-delay: 1s; }
.particle:nth-child(4) { top: 70%; right: 10%; animation-delay: 1.5s; }
.particle:nth-child(5) { top: 50%; left: 20%; animation-delay: 2s; }
.particle:nth-child(6) { top: 15%; right: 30%; animation-delay: 2.5s; }

.hero__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4xl);
  align-items: center;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(10,61,98,0.08);
  border: 1px solid rgba(10,61,98,0.15);
  color: var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  margin-bottom: var(--spacing-xl);
  animation: fadeInUp 0.6s ease forwards;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: var(--spacing-xl);
  color: var(--color-primary-dark);
  animation: fadeInUp 0.7s ease 0.1s both;
}

.hero__subtitle {
  font-size: 1.15rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacing-2xl);
  max-width: 520px;
  animation: fadeInUp 0.7s ease 0.2s both;
}

.hero__actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-2xl);
  animation: fadeInUp 0.7s ease 0.3s both;
}

.hero__stats {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  animation: fadeInUp 0.7s ease 0.4s both;
}

.stat__number {
  display: block;
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--color-primary);
  line-height: 1;
}
.stat__label {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  font-weight: 500;
}
.stat__divider {
  width: 1px;
  height: 40px;
  background: var(--color-border);
}

/* Hero card */
.hero__visual {
  animation: fadeIn 0.8s ease 0.3s both;
}

.hero__card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.hero__card-badge {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-bg-alt);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

.hero__card-img {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.hero__card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__card-play {
  position: absolute;
  inset: 0;
  background: rgba(10,61,98,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.hero__card-img:hover .hero__card-play {
  opacity: 1;
}

.hero__card-body {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.hero__card-body h3 {
  font-size: 1.05rem;
  color: var(--color-primary-dark);
  line-height: 1.3;
}

.hero__card-body p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.hero__card-platforms {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-top: var(--spacing-sm);
}

/* ====== PLATFORMS ====== */
.platforms-section {
  background: var(--color-primary-dark);
  padding: var(--spacing-xl) 0;
}

.platforms-section__label {
  color: rgba(255,255,255,0.6);
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.platforms-section__list {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

/* ====== EXPLORE ====== */
.explore-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

.explore-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.explore-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-color);
  transform: scaleX(0);
  transition: transform var(--transition-base);
  transform-origin: left;
}

.explore-card:hover::before {
  transform: scaleX(1);
}

.explore-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: transparent;
}

.explore-card__icon {
  font-size: 2rem;
}

.explore-card h3 {
  font-size: 1.15rem;
  color: var(--color-primary-dark);
}

.explore-card p {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  flex: 1;
}

.explore-card__cta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--card-color);
  margin-top: var(--spacing-sm);
  transition: gap var(--transition-fast);
}

.explore-card:hover .explore-card__cta {
  gap: 10px;
}

/* ====== FEATURED EPISODES ====== */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

.episode-card__img {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.episode-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.episode-card:hover .episode-card__img img {
  transform: scale(1.05);
}

.episode-card__num {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  background: var(--color-primary);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.episode-card__body {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.episode-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.episode-card__duration {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.episode-card__body h3 {
  font-size: 1rem;
  line-height: 1.35;
  color: var(--color-primary-dark);
}

.episode-card__guest {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.episode-card__summary {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.episode-card__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

/* ====== GUESTS ====== */
.guests-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--spacing-lg);
}

.guest-card {
  text-align: center;
}

.guest-card__img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.guest-card__body {
  padding: var(--spacing-md);
}

.guest-card__body h4 {
  font-size: 0.9rem;
  color: var(--color-primary-dark);
  margin-bottom: 4px;
}

.guest-card__role {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

.section-footer {
  text-align: center;
  margin-top: var(--spacing-3xl);
}

/* ====== NEWSLETTER ====== */
.newsletter-section {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  padding: var(--spacing-4xl) 0;
}

.newsletter-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4xl);
  align-items: center;
}

.newsletter-box__text h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: white;
  margin-bottom: var(--spacing-xl);
  line-height: 1.3;
}

.newsletter-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.newsletter-list li {
  color: rgba(255,255,255,0.85);
  font-size: 0.95rem;
}

.newsletter-box__form {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  backdrop-filter: blur(10px);
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.newsletter-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.newsletter-form label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
}

.newsletter-form__disclaimer {
  text-align: center;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.5);
}

.newsletter-success {
  text-align: center;
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
  padding: var(--spacing-xl);
  background: rgba(56,161,105,0.3);
  border-radius: var(--radius-md);
}

@media (max-width: 1024px) {
  .explore-grid { grid-template-columns: repeat(2, 1fr); }
  .featured-grid { grid-template-columns: repeat(2, 1fr); }
  .guests-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .hero__content { grid-template-columns: 1fr; }
  .hero__visual { display: none; }
  .explore-grid { grid-template-columns: 1fr; }
  .featured-grid { grid-template-columns: 1fr; }
  .guests-grid { grid-template-columns: repeat(2, 1fr); }
  .newsletter-box { grid-template-columns: 1fr; }
  .hero__stats { gap: var(--spacing-lg); }
}
</style>
