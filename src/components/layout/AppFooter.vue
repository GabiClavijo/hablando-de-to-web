<template>
  <footer class="footer">
    <div class="container">
      <!-- Top section -->
      <div class="footer__top">
        <!-- Brand -->
        <div class="footer__brand">
          <div class="footer-logo">
            <svg width="40" height="40" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="19" fill="rgba(255,255,255,0.12)"/>
              <path d="M11 26 Q15 12 19 19 Q23 26 27 12" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
              <circle cx="19" cy="19" r="3.5" fill="white"/>
            </svg>
            <span class="footer-logo__name">Hablando de TO</span>
          </div>
          <p class="footer__tagline">
            "Entrevistas en profundidad. Debate profesional. Evidencia aplicada. Identidad ocupacional en construcción."
          </p>
          <p class="footer__description">
            Podcast y plataforma de divulgación profesional sobre Terapia Ocupacional.
            Creado por Jorge Clavijo para la comunidad hispanohablante.
          </p>
          <div class="footer__social">
            <a href="https://instagram.com/hablandode_to" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="social-btn" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="social-btn" aria-label="Spotify">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation columns -->
        <div class="footer__links">
          <div class="footer__col">
            <h4>El podcast</h4>
            <ul>
              <li><router-link to="/podcast">Todos los episodios</router-link></li>
              <li><router-link to="/youtube">Canal de YouTube</router-link></li>
              <li><router-link to="/invitados">Invitados</router-link></li>
              <li><router-link to="/sobre">Sobre el proyecto</router-link></li>
              <li><router-link to="/metricas">Métricas</router-link></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>Contenido</h4>
            <ul>
              <li><router-link to="/evidencia">Evidencia científica</router-link></li>
              <li><router-link to="/recursos">Recursos TO</router-link></li>
              <li><router-link to="/formacion">Formación</router-link></li>
              <li><router-link to="/comunidad">Comunidad</router-link></li>
              <li><a href="#newsletter">Newsletter</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>Escúchanos</h4>
            <ul>
              <li><a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener">Spotify</a></li>
              <li><a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener">YouTube</a></li>
              <li><a href="https://podcasts.apple.com/us/podcast" target="_blank" rel="noopener">Apple Podcasts</a></li>
              <li><a href="https://music.amazon.es/podcasts" target="_blank" rel="noopener">Amazon Music</a></li>
              <li><a href="https://go.ivoox.com/sq/2734836" target="_blank" rel="noopener">iVoox</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Platform strip -->
      <div class="footer__platforms">
        <p>Disponible en:</p>
        <div class="footer__platform-tags">
          <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="platform-tag platform-spotify">Spotify</a>
          <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="platform-tag platform-youtube">YouTube</a>
          <a href="https://podcasts.apple.com/us/podcast" target="_blank" rel="noopener" class="platform-tag platform-apple">Apple Podcasts</a>
          <a href="https://music.amazon.es/podcasts" target="_blank" rel="noopener" class="platform-tag platform-amazon">Amazon Music</a>
          <a href="https://go.ivoox.com/sq/2734836" target="_blank" rel="noopener" class="platform-tag platform-ivoox">iVoox</a>
        </div>
      </div>

      <!-- Bottom -->
      <div class="footer__bottom">
        <p>© {{ currentYear }} Hablando de TO · Jorge Clavijo · Todos los derechos reservados.</p>
        <p class="footer__made">Hecho con ❤️ para la comunidad hispanohablante de Terapia Ocupacional</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--color-deep-dark);
  color: rgba(255,255,255,0.8);
  padding: 5rem 0 0;
}

.footer__top {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.footer-logo__name {
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.01em;
}

.footer__tagline {
  font-style: italic;
  color: var(--color-accent-light);
  font-size: 0.9rem;
  margin-bottom: 0.875rem;
  line-height: 1.6;
}

.footer__description {
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1.5rem;
}

.footer__social {
  display: flex;
  gap: 0.5rem;
}

.social-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.7);
  transition: all var(--transition-fast);
}

.social-btn:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
}

.footer__links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer__col h4 {
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.footer__col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer__col a {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.5);
  transition: color var(--transition-fast);
  text-decoration: none;
}

.footer__col a:hover {
  color: var(--color-accent-light);
}

/* Platforms */
.footer__platforms {
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer__platforms p {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
  white-space: nowrap;
}

.footer__platform-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.footer__platform-tags .platform-tag {
  opacity: 0.85;
  font-size: 0.75rem;
  padding: 4px 12px;
}

/* Bottom */
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 1024px) {
  .footer__top {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .footer__links {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer__bottom {
    flex-direction: column;
    gap: 0.375rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer__links {
    grid-template-columns: 1fr;
  }
}
</style>
