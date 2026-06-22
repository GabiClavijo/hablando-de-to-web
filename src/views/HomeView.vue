<template>
  <div class="home">

    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero__bg">
        <div class="hero__circle hero__circle--1"></div>
        <div class="hero__circle hero__circle--2"></div>
        <div class="hero__particles">
          <span v-for="n in 8" :key="n" class="particle"></span>
        </div>
      </div>

      <div class="container">
        <div class="hero__content">

          <!-- Left: Text -->
          <div class="hero__text">
            <div class="hero__badge">
              <div class="soundwave">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
              Podcast · Terapia Ocupacional · Divulgación
            </div>

            <h1 class="hero__title">Hablando de TO</h1>

            <p class="hero__subtitle">
              Un podcast de referencia en Terapia Ocupacional que da voz a la profesión,
              a la evidencia y a las personas que la construyen.
            </p>

            <p class="hero__description">
              Conversaciones en profundidad que conectan ciencia, práctica y experiencia real
              para entender la Terapia Ocupacional en todas sus dimensiones.
            </p>

            <div class="hero__long-desc">
              <p>
                Creado y conducido por el terapeuta ocupacional e investigador
                <strong>Jorge Clavijo</strong>, Hablando de TO nace con el objetivo de divulgar,
                visibilizar y fortalecer la identidad profesional de la Terapia Ocupacional
                en el ámbito hispanohablante.
              </p>
              <p>
                A través de entrevistas extensas con profesionales, investigadores, instituciones
                y personas con experiencia vivida, el podcast explora la complejidad real de la
                ocupación humana y el papel de la Terapia Ocupacional en la sociedad.
              </p>
            </div>

            <div class="hero__actions">
              <router-link to="/podcast" class="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                🎧 Escuchar episodios
              </router-link>
              <router-link to="/youtube" class="btn btn-outline btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                📺 Ver en YouTube
              </router-link>
              <router-link to="/podcast" class="btn btn-ghost-visible btn-lg">
                📚 Explorar contenidos
              </router-link>
            </div>

            <div class="hero__authority">
              <span>Entrevistas en profundidad.</span>
              <span>Debate profesional.</span>
              <span>Evidencia aplicada.</span>
              <span>Identidad ocupacional en construcción.</span>
            </div>
          </div>

          <!-- Right: Visual card -->
          <div class="hero__visual">
            <div class="hero__podcast-art">
              <div class="podcast-art__inner">
                <div class="podcast-art__logo">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.12)"/>
                    <path d="M22 54 Q30 26 40 40 Q50 54 58 26" stroke="var(--color-accent)" stroke-width="4" stroke-linecap="round" fill="none"/>
                    <circle cx="40" cy="40" r="6" fill="white"/>
                    <circle cx="40" cy="40" r="12" stroke="white" stroke-width="1.5" fill="none" opacity="0.4"/>
                    <circle cx="40" cy="40" r="20" stroke="white" stroke-width="1" fill="none" opacity="0.2"/>
                  </svg>
                </div>
                <h2>Hablando de TO</h2>
                <p>Podcast de Terapia Ocupacional</p>
                <div class="podcast-art__wave">
                  <div class="soundwave">
                    <span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>

              <!-- Stats overlay -->
              <div class="podcast-art__stats">
                <div class="art-stat">
                  <span class="art-stat__num">+11K</span>
                  <span class="art-stat__label">Visualizaciones</span>
                </div>
                <div class="art-stat art-stat--accent">
                  <span class="art-stat__num">42+</span>
                  <span class="art-stat__label">Episodios</span>
                </div>
                <div class="art-stat">
                  <span class="art-stat__num">5</span>
                  <span class="art-stat__label">Plataformas</span>
                </div>
              </div>
            </div>

            <!-- Floating badges fuera del card para que no se recorten -->
            <div class="floating-badge floating-badge--spotify">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              En Spotify
            </div>
            <div class="floating-badge floating-badge--youtube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              En YouTube
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===== PLATAFORMAS ===== -->
    <section class="platforms-strip">
      <div class="container">
        <p class="platforms-strip__label">Escucha Hablando de TO donde prefieras</p>
        <div class="platforms-strip__list">
          <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="platform-tag platform-spotify">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Spotify
          </a>
          <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="platform-tag platform-youtube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            YouTube
          </a>
          <a href="https://podcasts.apple.com/us/podcast" target="_blank" rel="noopener" class="platform-tag platform-apple">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Apple Podcasts
          </a>
          <a href="https://music.amazon.es/podcasts" target="_blank" rel="noopener" class="platform-tag platform-amazon">Amazon Music</a>
          <a href="https://go.ivoox.com/sq/2734836" target="_blank" rel="noopener" class="platform-tag platform-ivoox">iVoox</a>
        </div>
      </div>
    </section>

    <!-- ===== SPOTIFY EMBED ===== -->
    <section class="section spotify-section">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Escucha ahora</span>
          <h2 class="section-header__title">El podcast en Spotify</h2>
          <p class="section-header__subtitle">Todos los episodios disponibles directamente desde aquí.</p>
        </div>
        <div class="spotify-embed-wrapper">
          <iframe
            src="https://open.spotify.com/embed/show/686Q2N3yZtX36SqEzRbFCB?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameborder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Hablando de TO en Spotify"
          ></iframe>
        </div>
        <div class="spotify-cta">
          <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Seguir en Spotify
          </a>
        </div>
      </div>
    </section>

    <!-- ===== EPISODIOS DESTACADOS ===== -->
    <section class="section section--alt featured-section">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Selección editorial</span>
          <h2 class="section-header__title">Episodios destacados</h2>
          <p class="section-header__subtitle">Explora por tema, invitado o formato de conversación.</p>
        </div>

        <!-- Filter tags -->
        <div class="filter-bar">
          <button
            v-for="cat in quickFilters"
            :key="cat"
            class="tag"
            :class="{ active: activeFilter === cat }"
            @click="setFilter(cat)"
          >
            {{ cat }}
          </button>
        </div>

        <div class="featured-grid">
          <router-link
            v-for="ep in displayedEpisodes"
            :key="ep.id"
            :to="`/podcast/${ep.id}`"
            class="episode-card card"
          >
            <div class="episode-card__img">
              <img :src="ep.image" :alt="ep.title" loading="lazy" />
              <span class="episode-card__num">Ep. {{ ep.number }}</span>
              <div class="episode-card__format">{{ ep.format }}</div>
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
          <router-link to="/podcast" class="btn btn-outline">
            Ver todos los episodios
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===== YOUTUBE ===== -->
    <section class="section youtube-section">
      <div class="container">
        <div class="youtube-split">
          <div class="youtube-split__text">
            <span class="section-header__label">Canal de YouTube</span>
            <h2>Síguenos en YouTube</h2>
            <p>
              Todos los episodios del podcast disponibles en formato vídeo.
              Entrevistas completas, imágenes de los invitados y una experiencia
              visual enriquecida del contenido.
            </p>
            <div class="youtube-features">
              <div class="yt-feature">
                <span class="yt-feature__icon">🎬</span>
                <div>
                  <strong>Episodios completos</strong>
                  <p>En vídeo HD sin edición</p>
                </div>
              </div>
              <div class="yt-feature">
                <span class="yt-feature__icon">👥</span>
                <div>
                  <strong>Invitados en pantalla</strong>
                  <p>Conecta con cada voz del podcast</p>
                </div>
              </div>
              <div class="yt-feature">
                <span class="yt-feature__icon">📊</span>
                <div>
                  <strong>+10.000 visualizaciones</strong>
                  <p>En el episodio más visto</p>
                </div>
              </div>
            </div>
            <div class="youtube-actions">
              <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="btn btn-youtube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Suscribirse al canal
              </a>
              <router-link to="/youtube" class="btn btn-outline">Ver más episodios</router-link>
            </div>
          </div>
          <div class="youtube-split__visual">
            <div class="youtube-channel-card">
              <div class="yt-card-header">
                <div class="yt-channel-art">
                  <svg width="60" height="60" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="rgba(114,148,149,0.15)"/>
                    <path d="M22 54 Q30 26 40 40 Q50 54 58 26" stroke="var(--color-primary)" stroke-width="4" stroke-linecap="round" fill="none"/>
                    <circle cx="40" cy="40" r="6" fill="var(--color-primary)"/>
                  </svg>
                  <div>
                    <h4>Hablando de TO</h4>
                    <span>@Hablandode_to</span>
                  </div>
                </div>
                <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="yt-subscribe-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  Suscribirse
                </a>
              </div>
              <div class="yt-videos-list">
                <a
                  v-for="ep in topYouTubeEpisodes"
                  :key="ep.id"
                  :href="ep.youtubeUrl"
                  target="_blank"
                  rel="noopener"
                  class="yt-video-item"
                >
                  <div class="yt-video-thumb">
                    <img :src="ep.image" :alt="ep.title" loading="lazy" />
                    <div class="yt-play-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div class="yt-video-info">
                    <h5>{{ ep.title }}</h5>
                    <span>{{ ep.viewsLabel }} visualizaciones</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== MÉTRICAS TEASER ===== -->
    <section class="section section--alt metrics-teaser">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Impacto real</span>
          <h2 class="section-header__title">El podcast en números</h2>
          <p class="section-header__subtitle">Transparencia sobre el alcance y crecimiento de Hablando de TO.</p>
        </div>
        <div class="metrics-grid">
          <div class="metric-card metric-card--primary">
            <div class="metric-card__icon">🎵</div>
            <div class="metric-card__value">+2.400</div>
            <div class="metric-card__label">Reproducciones en Spotify</div>
            <div class="metric-card__period">Junio 2026</div>
          </div>
          <div class="metric-card metric-card--red">
            <div class="metric-card__icon">▶️</div>
            <div class="metric-card__value">+10.000</div>
            <div class="metric-card__label">Visualizaciones en YouTube</div>
            <div class="metric-card__period">Episodio más visto</div>
          </div>
          <div class="metric-card metric-card--accent">
            <div class="metric-card__icon">⏱</div>
            <div class="metric-card__value">+60 h</div>
            <div class="metric-card__label">Tiempo de escucha</div>
            <div class="metric-card__period">Promedio mensual</div>
          </div>
          <div class="metric-card metric-card--green">
            <div class="metric-card__icon">📈</div>
            <div class="metric-card__value">↑ 35%</div>
            <div class="metric-card__label">Crecimiento mensual</div>
            <div class="metric-card__period">Mayo–Junio 2026</div>
          </div>
        </div>
        <div class="section-footer">
          <router-link to="/metricas" class="btn btn-primary">
            Ver dashboard completo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===== SOBRE EL PROYECTO ===== -->
    <section class="section about-teaser">
      <div class="container">
        <div class="about-teaser__inner">
          <div class="about-teaser__text">
            <span class="section-header__label">Quién está detrás</span>
            <h2>Jorge Clavijo</h2>
            <p class="about-role">Terapeuta Ocupacional · Investigador · Divulgador</p>
            <p>
              Hablando de TO nace de la convicción de que la Terapia Ocupacional merece
              un espacio de divulgación riguroso, accesible y en español. Jorge Clavijo
              conduce cada entrevista con profundidad clínica y curiosidad investigadora.
            </p>
            <router-link to="/sobre" class="btn btn-outline" style="margin-top: 1.5rem">
              Conoce el proyecto
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </router-link>
          </div>
          <div class="about-teaser__visual">
            <div class="about-quote-card">
              <div class="about-quote-card__mark">"</div>
              <p>
                Cada conversación en Hablando de TO es una oportunidad de mostrar
                la profundidad y la relevancia social de nuestra profesión.
              </p>
              <div class="about-quote-card__author">
                <div class="author-avatar">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <strong>Jorge Clavijo</strong>
                  <span>Conductor y creador</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== NEWSLETTER ===== -->
    <section class="newsletter-section" id="newsletter">
      <div class="container">
        <div class="newsletter-box">
          <div class="newsletter-box__text">
            <span class="section-header__label" style="color: var(--color-accent-light)">Mantente al día</span>
            <h2>Recibe las novedades de Hablando de TO</h2>
            <ul class="newsletter-list">
              <li>✅ Nuevos episodios publicados</li>
              <li>✅ Recursos y evidencia científica</li>
              <li>✅ Artículos y noticias de TO</li>
              <li>✅ Próximos eventos y formaciones</li>
            </ul>
          </div>
          <div class="newsletter-box__form">
            <form v-if="!subscribed" @submit.prevent="subscribe" class="newsletter-form">
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
            <div v-else class="newsletter-success">
              🎉 ¡Suscripción realizada! Bienvenido a la comunidad.
            </div>
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

const store = useEpisodesStore()
const { allEpisodes } = storeToRefs(store)

const subscribed = ref(false)
const form = ref({ name: '', email: '' })
const activeFilter = ref('Todos')

const quickFilters = ['Todos', 'Debate', 'Práctica clínica', 'Investigación', 'Experiencia vivida', 'Internacional']

const displayedEpisodes = computed(() => {
  if (activeFilter.value === 'Todos') {
    return allEpisodes.value.filter(ep => ep.featured).slice(0, 3)
  }
  return allEpisodes.value
    .filter(ep => ep.category === activeFilter.value || ep.tags.includes(activeFilter.value))
    .slice(0, 3)
})

const topYouTubeEpisodes = computed(() => {
  return [...allEpisodes.value]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3)
    .map(ep => ({
      ...ep,
      viewsLabel: ep.views ? ep.views.toLocaleString('es-ES') : ''
    }))
})

function setFilter(cat) {
  activeFilter.value = cat
}

function subscribe() {
  subscribed.value = true
  form.value = { name: '', email: '' }
}
</script>

<style scoped>
/* ===== HERO ===== */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 120px 0 80px;
  background: linear-gradient(145deg, #2D5153 0%, #3E6E70 40%, #507172 100%);
  color: white;
}

.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__circle {
  position: absolute;
  border-radius: 50%;
}

.hero__circle--1 {
  width: 700px;
  height: 700px;
  top: -200px;
  right: -200px;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%);
}

.hero__circle--2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
  background: radial-gradient(circle, rgba(232,168,56,0.1) 0%, transparent 60%);
}

.particle {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  animation: pulse 3s ease-in-out infinite;
}
.particle:nth-child(1) { top: 15%; left: 8%; animation-delay: 0s; }
.particle:nth-child(2) { top: 65%; left: 4%; animation-delay: 0.6s; }
.particle:nth-child(3) { top: 30%; right: 12%; animation-delay: 1.2s; }
.particle:nth-child(4) { top: 75%; right: 8%; animation-delay: 1.8s; }
.particle:nth-child(5) { top: 50%; left: 18%; animation-delay: 2.4s; }
.particle:nth-child(6) { top: 10%; right: 28%; animation-delay: 0.3s; }
.particle:nth-child(7) { top: 85%; left: 45%; animation-delay: 0.9s; }
.particle:nth-child(8) { top: 20%; left: 60%; animation-delay: 1.5s; }

.hero__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.9);
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease forwards;
}

.hero__badge .soundwave {
  color: var(--color-accent-light);
}

h1.hero__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1.25rem;
  color: white;
  letter-spacing: -0.02em;
  animation: fadeInUp 0.7s ease 0.1s both;
}

.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255,255,255,0.85);
  line-height: 1.65;
  margin-bottom: 1rem;
  font-weight: 500;
  animation: fadeInUp 0.7s ease 0.2s both;
}

.hero__description {
  font-size: 1rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-style: italic;
  animation: fadeInUp 0.7s ease 0.25s both;
}

.hero__long-desc {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.7s ease 0.3s both;
}

.hero__long-desc p {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.72);
  line-height: 1.7;
}

.hero__long-desc strong {
  color: var(--color-accent-light);
}

.hero__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  animation: fadeInUp 0.7s ease 0.35s both;
}

.hero__actions .btn-primary {
  background: white;
  color: var(--color-deep);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
.hero__actions .btn-primary:hover {
  background: var(--color-accent-light);
  color: var(--color-deep);
}

.hero__actions .btn-outline {
  border-color: rgba(255,255,255,0.7);
  color: white;
}
.hero__actions .btn-outline:hover {
  background: rgba(255,255,255,0.15);
  border-color: white;
}

.hero__actions .btn-ghost {
  color: rgba(255,255,255,0.8);
}
.hero__actions .btn-ghost:hover {
  background: rgba(255,255,255,0.1);
  color: white;
}

.hero__actions .btn-ghost-visible {
  color: rgba(255,255,255,0.85);
  border: 2px solid rgba(255,255,255,0.35);
  background: transparent;
  border-radius: 9999px;
  padding: 0.65rem 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-base);
  text-decoration: none;
}
.hero__actions .btn-ghost-visible:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.65);
  color: white;
  transform: translateY(-2px);
}

.hero__authority {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  animation: fadeInUp 0.7s ease 0.4s both;
}

.hero__authority span {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.6);
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 9999px;
}

/* Podcast art */
.hero__visual {
  animation: fadeIn 0.8s ease 0.3s both;
  position: relative;
}

.hero__podcast-art {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 24px;
  padding: 0;
  overflow: hidden;
}

.podcast-art__inner {
  background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04));
  padding: 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.podcast-art__logo {
  margin-bottom: 0.5rem;
}

.podcast-art__inner h2 {
  font-size: 1.6rem;
  font-weight: 900;
  color: white;
  letter-spacing: -0.01em;
}

.podcast-art__inner p {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.6);
}

.podcast-art__wave {
  margin-top: 0.5rem;
  color: var(--color-accent-light);
}

.podcast-art__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid rgba(255,255,255,0.1);
}

.art-stat {
  padding: 1rem;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.1);
}
.art-stat:last-child { border-right: none; }

.art-stat--accent .art-stat__num {
  color: var(--color-accent-light);
}

.art-stat__num {
  display: block;
  font-size: 1.35rem;
  font-weight: 900;
  color: white;
  line-height: 1;
  margin-bottom: 4px;
}

.art-stat__label {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.55);
  font-weight: 500;
}

.floating-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  animation: fadeIn 1s ease 0.6s both;
}

.floating-badge--spotify {
  background: #1DB954;
  color: white;
  top: -14px;
  right: 24px;
}

.floating-badge--youtube {
  background: #FF0000;
  color: white;
  bottom: -14px;
  left: 24px;
}

/* Hace que los yt-video-item sean clickeables con enlace real */
.yt-video-item a {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

/* ===== PLATFORMS STRIP ===== */
.platforms-strip {
  background: var(--color-deep);
  padding: 1.25rem 0;
}

.platforms-strip__label {
  text-align: center;
  color: rgba(255,255,255,0.55);
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.platforms-strip__list {
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  flex-wrap: wrap;
}

/* ===== SPOTIFY ===== */
.spotify-section {
  background: var(--color-bg);
}

.spotify-embed-wrapper {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  max-width: 900px;
  margin: 0 auto;
}

.spotify-cta {
  text-align: center;
  margin-top: 1.5rem;
}

/* ===== EPISODES FILTER ===== */
.filter-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
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
  top: 0.5rem;
  left: 0.5rem;
  background: var(--color-primary);
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 9999px;
}

.episode-card__format {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
  backdrop-filter: blur(4px);
}

.episode-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.episode-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.episode-card__duration {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.episode-card__body h3 {
  font-size: 0.98rem;
  line-height: 1.35;
  color: var(--color-deep);
}

.episode-card__guest {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.83rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.episode-card__summary {
  font-size: 0.865rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.episode-card__tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.section-footer {
  text-align: center;
  margin-top: 2.5rem;
}

/* ===== YOUTUBE ===== */
.youtube-section {
  background: var(--color-bg);
}

.youtube-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.youtube-split__text h2 {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  color: var(--color-deep);
  margin: 0.5rem 0 1rem;
}

.youtube-split__text p {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.youtube-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.yt-feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.yt-feature__icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.yt-feature strong {
  display: block;
  font-size: 0.92rem;
  color: var(--color-deep);
  margin-bottom: 2px;
}

.yt-feature p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 0;
}

.youtube-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-youtube {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.95rem;
  background: #FF0000;
  color: white;
  transition: all var(--transition-base);
  border: 2px solid transparent;
}
.btn-youtube:hover {
  background: #CC0000;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,0,0,0.3);
}

.youtube-channel-card {
  background: var(--color-surface);
  border-radius: 20px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.yt-card-header {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-alt);
}

.yt-channel-art {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.yt-channel-art h4 {
  font-size: 0.92rem;
  color: var(--color-deep);
  margin-bottom: 2px;
}

.yt-channel-art span {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.yt-subscribe-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #FF0000;
  color: white;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  transition: all var(--transition-fast);
}
.yt-subscribe-btn:hover {
  background: #CC0000;
  transform: scale(1.03);
}

.yt-videos-list {
  display: flex;
  flex-direction: column;
}

.yt-video-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition-fast);
  cursor: pointer;
}
.yt-video-item:last-child { border-bottom: none; }
.yt-video-item:hover { background: var(--color-bg-alt); }

.yt-video-thumb {
  width: 80px;
  height: 52px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.yt-video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.yt-play-icon {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.yt-video-item:hover .yt-play-icon { opacity: 1; }

.yt-video-info h5 {
  font-size: 0.83rem;
  color: var(--color-deep);
  line-height: 1.35;
  margin-bottom: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.yt-video-info span {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* ===== METRICS TEASER ===== */
.metrics-teaser {
  background: var(--color-bg-alt);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.metric-card {
  background: white;
  border-radius: 16px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}
.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.metric-card__icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  display: block;
}

.metric-card__value {
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.metric-card__label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.metric-card__period {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.metric-card--primary .metric-card__value { color: var(--color-primary); }
.metric-card--primary { border-top: 4px solid var(--color-primary); }

.metric-card--red .metric-card__value { color: #E53E3E; }
.metric-card--red { border-top: 4px solid #FF0000; }

.metric-card--accent .metric-card__value { color: var(--color-accent-dark); }
.metric-card--accent { border-top: 4px solid var(--color-accent); }

.metric-card--green .metric-card__value { color: var(--color-success); }
.metric-card--green { border-top: 4px solid var(--color-success); }

/* ===== ABOUT TEASER ===== */
.about-teaser__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-teaser__text h2 {
  font-size: 2.25rem;
  font-weight: 900;
  color: var(--color-deep);
  margin: 0.5rem 0 0.5rem;
}

.about-role {
  font-size: 0.9rem;
  color: var(--color-primary);
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 1rem;
}

.about-teaser__text p {
  font-size: 0.98rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.about-quote-card {
  background: linear-gradient(145deg, var(--color-primary), var(--color-primary-dark));
  border-radius: 20px;
  padding: 2.5rem;
  color: white;
  position: relative;
}

.about-quote-card__mark {
  font-size: 5rem;
  line-height: 0.5;
  color: rgba(255,255,255,0.2);
  font-family: Georgia, serif;
  margin-bottom: 1rem;
}

.about-quote-card p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.9);
  margin-bottom: 1.5rem;
  font-style: italic;
}

.about-quote-card__author {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.about-quote-card__author strong {
  display: block;
  font-size: 0.9rem;
  color: white;
}

.about-quote-card__author span {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.6);
}

/* ===== NEWSLETTER ===== */
.newsletter-section {
  background: linear-gradient(135deg, var(--color-deep) 0%, #2D5153 100%);
  padding: 5rem 0;
}

.newsletter-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.newsletter-box__text h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: white;
  margin: 0.5rem 0 1.5rem;
  line-height: 1.3;
}

.newsletter-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.newsletter-list li {
  color: rgba(255,255,255,0.8);
  font-size: 0.95rem;
}

.newsletter-box__form {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.newsletter-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.newsletter-form label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
}

.newsletter-form .form-input {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.15);
  color: white;
}

.newsletter-form .form-input::placeholder {
  color: rgba(255,255,255,0.35);
}

.newsletter-form .form-input:focus {
  border-color: var(--color-primary-light);
}

.newsletter-form__disclaimer {
  text-align: center;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
}

.newsletter-success {
  text-align: center;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 2rem;
  background: rgba(56,161,105,0.25);
  border: 1px solid rgba(56,161,105,0.4);
  border-radius: 16px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hero__content { grid-template-columns: 1fr; }
  .hero__visual { display: none; }
  .youtube-split { grid-template-columns: 1fr; }
  .featured-grid { grid-template-columns: repeat(2, 1fr); }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .about-teaser__inner { grid-template-columns: 1fr; }
  .newsletter-box { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (max-width: 768px) {
  .hero { padding: 100px 0 60px; }
  .featured-grid { grid-template-columns: 1fr; }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .hero__actions { flex-direction: column; align-items: flex-start; }
  .hero__authority { gap: 0.35rem; }
}

@media (max-width: 480px) {
  .metrics-grid { grid-template-columns: 1fr; }
}
</style>
