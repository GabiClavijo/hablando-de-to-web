<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled, 'header--open': menuOpen }">
    <div class="container header__inner">
      <!-- Logo -->
      <router-link to="/" class="header__logo" @click="closeMenu">
        <div class="logo-icon">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="var(--color-primary)"/>
            <path d="M10 24 Q14 12 18 18 Q22 24 26 12" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <circle cx="18" cy="18" r="3" fill="white"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">Hablando de TO</span>
          <span class="logo-tagline">Podcast · Terapia Ocupacional</span>
        </div>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="header__nav">
        <router-link to="/podcast" class="nav-link">Podcast</router-link>
        <router-link to="/invitados" class="nav-link">Invitados</router-link>
        <router-link to="/evidencia" class="nav-link">Evidencia</router-link>
        <div class="nav-dropdown">
          <button class="nav-link nav-dropdown__trigger">
            Más
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div class="nav-dropdown__menu">
            <router-link to="/comunidad" class="dropdown-item">
              <span class="dropdown-icon">🤝</span> Comunidad
            </router-link>
            <router-link to="/formacion" class="dropdown-item">
              <span class="dropdown-icon">🎓</span> Formación
            </router-link>
            <router-link to="/recursos" class="dropdown-item">
              <span class="dropdown-icon">📚</span> Recursos
            </router-link>
          </div>
        </div>
      </nav>

      <!-- CTA + Mobile Toggle -->
      <div class="header__actions">
        <a href="https://open.spotify.com/show/686Q2N3" target="_blank" class="btn btn-primary btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Escuchar
        </a>
        <button class="hamburger" :class="{ active: menuOpen }" @click="toggleMenu" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <nav class="mobile-nav">
        <router-link to="/" class="mobile-nav__link" @click="closeMenu">Inicio</router-link>
        <router-link to="/podcast" class="mobile-nav__link" @click="closeMenu">Podcast</router-link>
        <router-link to="/invitados" class="mobile-nav__link" @click="closeMenu">Invitados</router-link>
        <router-link to="/evidencia" class="mobile-nav__link" @click="closeMenu">Evidencia</router-link>
        <router-link to="/comunidad" class="mobile-nav__link" @click="closeMenu">Comunidad</router-link>
        <router-link to="/formacion" class="mobile-nav__link" @click="closeMenu">Formación</router-link>
        <router-link to="/recursos" class="mobile-nav__link" @click="closeMenu">Recursos</router-link>
      </nav>
      <div class="mobile-platforms">
        <a href="https://open.spotify.com/show/686Q2N3" target="_blank" class="platform-tag platform-spotify">Spotify</a>
        <a href="https://podcasts.apple.com/us/podcast" target="_blank" class="platform-tag platform-apple">Apple</a>
        <a href="https://youtube.com/@hablandode_to" target="_blank" class="platform-tag platform-youtube">YouTube</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

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
  background: rgba(248, 250, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-base);
}

.header--scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: var(--spacing-xl);
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-name {
  font-weight: 800;
  font-size: 1.05rem;
  color: var(--color-primary-dark);
  line-height: 1.1;
}

.logo-tagline {
  font-size: 0.68rem;
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
}

/* Desktop Nav */
.header__nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-primary);
  background: rgba(10,61,98,0.06);
}

/* Dropdown */
.nav-dropdown {
  position: relative;
}

.nav-dropdown__menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 8px;
  min-width: 180px;
  opacity: 0;
  pointer-events: none;
  transition: all var(--transition-base);
  z-index: 100;
}

.nav-dropdown:hover .nav-dropdown__menu {
  opacity: 1;
  pointer-events: all;
  transform: translateX(-50%) translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0.6rem 0.875rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.dropdown-item:hover {
  background: var(--color-bg-alt);
  color: var(--color-primary);
}

/* Actions */
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
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
  padding: var(--spacing-lg) var(--spacing-xl) var(--spacing-xl);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-slow);
}

.mobile-menu.open {
  max-height: 500px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
}

.mobile-nav__link {
  padding: 0.75rem var(--spacing-md);
  font-weight: 500;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.mobile-nav__link:hover,
.mobile-nav__link.router-link-active {
  background: var(--color-bg-alt);
  color: var(--color-primary);
}

.mobile-platforms {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .header__nav { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { display: flex; }
  .header__actions .btn { display: none; }
  .header--open { background: var(--color-surface); }
}
</style>
