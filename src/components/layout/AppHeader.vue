<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled, 'header--open': menuOpen }">
    <div class="container header__inner">

      <!-- Logo -->
      <router-link to="/" class="header__logo" @click="closeMenu">
        <div class="logo-icon">
          <img
            v-if="!logoError"
            :src="'/logo.png'"
            alt="Hablando de TO"
            width="38"
            height="38"
            class="logo-img"
            @error="logoError = true"
          />
          <svg v-else width="38" height="38" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="19" fill="var(--color-primary)"/>
            <path d="M11 26 Q15 12 19 19 Q23 26 27 12" stroke="white" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <circle cx="19" cy="19" r="3.5" fill="var(--color-accent)"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">Hablando de TO</span>
          <span class="logo-tagline">Podcast · Terapia Ocupacional</span>
        </div>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="header__nav">
        <router-link to="/" class="nav-link" exact-active-class="nav-link--active">Inicio</router-link>
        <router-link to="/podcast" class="nav-link" active-class="nav-link--active">Episodios</router-link>
        <router-link to="/youtube" class="nav-link nav-link--yt" active-class="nav-link--active">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          YouTube
        </router-link>
        <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="nav-link nav-link--sp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
          Spotify
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="opacity:0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>

        <div class="nav-dropdown">
          <button class="nav-link nav-dropdown__trigger">
            Más
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="nav-dropdown__menu">
            <router-link to="/sobre" class="dropdown-item">
              <span class="dropdown-icon">🎙️</span>
              <div>
                <strong>Sobre el proyecto</strong>
                <span>Jorge Clavijo y el podcast</span>
              </div>
            </router-link>
            <router-link to="/metricas" class="dropdown-item">
              <span class="dropdown-icon">📊</span>
              <div>
                <strong>Métricas</strong>
                <span>Impacto y crecimiento</span>
              </div>
            </router-link>
            <router-link to="/invitados" class="dropdown-item">
              <span class="dropdown-icon">👥</span>
              <div>
                <strong>Invitados</strong>
                <span>Directorio de expertos</span>
              </div>
            </router-link>
            <router-link to="/comunidad" class="dropdown-item">
              <span class="dropdown-icon">🤝</span>
              <div>
                <strong>Comunidad</strong>
                <span>Participa y conecta</span>
              </div>
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/evidencia" class="dropdown-item">
              <span class="dropdown-icon">🔬</span>
              <div>
                <strong>Evidencia</strong>
                <span>Literatura científica</span>
              </div>
            </router-link>
            <router-link to="/recursos" class="dropdown-item">
              <span class="dropdown-icon">📚</span>
              <div>
                <strong>Recursos</strong>
                <span>Material para profesionales</span>
              </div>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- CTA + Mobile Toggle -->
      <div class="header__actions">
        <router-link to="/podcast" class="btn btn-primary btn-sm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
          Escuchar
        </router-link>
        <button class="hamburger" :class="{ active: menuOpen }" @click="toggleMenu" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <nav class="mobile-nav">
        <router-link to="/" class="mobile-nav__link" @click="closeMenu">
          <span>🏠</span> Inicio
        </router-link>
        <router-link to="/podcast" class="mobile-nav__link" @click="closeMenu">
          <span>🎙️</span> Episodios
        </router-link>
        <router-link to="/youtube" class="mobile-nav__link" @click="closeMenu">
          <span>📺</span> YouTube
        </router-link>
        <router-link to="/sobre" class="mobile-nav__link" @click="closeMenu">
          <span>ℹ️</span> Sobre el proyecto
        </router-link>
        <router-link to="/metricas" class="mobile-nav__link" @click="closeMenu">
          <span>📊</span> Métricas
        </router-link>
        <router-link to="/invitados" class="mobile-nav__link" @click="closeMenu">
          <span>👥</span> Invitados
        </router-link>
        <router-link to="/comunidad" class="mobile-nav__link" @click="closeMenu">
          <span>🤝</span> Comunidad
        </router-link>
        <router-link to="/evidencia" class="mobile-nav__link" @click="closeMenu">
          <span>🔬</span> Evidencia
        </router-link>
        <router-link to="/recursos" class="mobile-nav__link" @click="closeMenu">
          <span>📚</span> Recursos
        </router-link>
      </nav>
      <div class="mobile-platforms">
        <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="platform-tag platform-spotify" @click="closeMenu">Spotify</a>
        <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="platform-tag platform-youtube" @click="closeMenu">YouTube</a>
        <a href="https://podcasts.apple.com/us/podcast" target="_blank" rel="noopener" class="platform-tag platform-apple" @click="closeMenu">Apple</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)
const logoError = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-base);
}

.header--scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: 0 2px 20px rgba(114,148,149,0.12);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 2rem;
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  text-decoration: none;
}

.logo-img {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  object-fit: cover;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-name {
  font-weight: 800;
  font-size: 1rem;
  color: var(--color-deep);
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.logo-tagline {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

/* Desktop Nav */
.header__nav {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link--active {
  color: var(--color-primary-dark);
  background: rgba(114,148,149,0.1);
}

.nav-link--yt {
  color: #CC0000;
}
.nav-link--yt:hover {
  background: rgba(255,0,0,0.08);
  color: #CC0000;
}

.nav-link--sp {
  color: #1DB954;
}
.nav-link--sp:hover {
  background: rgba(29,185,84,0.08);
  color: #1DB954;
}

/* Dropdown */
.nav-dropdown {
  position: relative;
}

.nav-dropdown__trigger {
  font-family: inherit;
}

.nav-dropdown__menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: 0.5rem;
  min-width: 220px;
  opacity: 0;
  pointer-events: none;
  transition: all var(--transition-base);
  z-index: 200;
}

.nav-dropdown:hover .nav-dropdown__menu {
  opacity: 1;
  pointer-events: all;
  transform: translateX(-50%) translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.dropdown-item:hover {
  background: var(--color-bg-alt);
  color: var(--color-primary-dark);
}

.dropdown-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.dropdown-item strong {
  display: block;
  font-size: 0.85rem;
  color: var(--color-deep);
  font-weight: 600;
  line-height: 1.2;
}

.dropdown-item span:not(.dropdown-icon) {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.dropdown-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0.4rem 0.5rem;
}

/* Actions */
.header__actions {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  flex-shrink: 0;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
  border-radius: var(--radius-sm);
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
  transition: all var(--transition-base);
  transform-origin: center;
}

.hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile Menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 1rem 1.5rem 1.5rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.mobile-menu.open {
  max-height: 600px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
}

.mobile-nav__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.875rem;
  font-weight: 500;
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.mobile-nav__link:hover,
.mobile-nav__link.router-link-active {
  background: var(--color-bg-alt);
  color: var(--color-primary-dark);
}

.mobile-platforms {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@media (max-width: 1024px) {
  .header__nav { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { display: flex; }
  .header__actions .btn { display: none; }
  .header--open { background: var(--color-surface); }
}
</style>
