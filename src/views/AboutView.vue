<template>
  <div class="about-page">

    <!-- Hero -->
    <section class="about-hero">
      <div class="container">
        <div class="about-hero__inner">
          <div class="about-hero__text">
            <span class="section-header__label">Sobre el proyecto</span>
            <h1>Hablando de TO</h1>
            <p class="about-hero__subtitle">
              Un podcast de referencia en Terapia Ocupacional que da voz a la profesión,
              a la evidencia y a las personas que la construyen.
            </p>
            <div class="hero-pills">
              <span class="hero-pill">🎙️ Divulgación</span>
              <span class="hero-pill">🔬 Evidencia científica</span>
              <span class="hero-pill">🌍 Hispanohablante</span>
              <span class="hero-pill">🤝 Comunidad TO</span>
            </div>
          </div>
          <div class="about-hero__image">
            <div class="host-card">
              <div class="host-card__avatar">
                <img
                  v-if="!avatarError"
                  :src="'/jorge-clavijo.jpg'"
                  alt="Jorge Clavijo"
                  class="host-card__photo"
                  @error="avatarError = true"
                />
                <svg v-else width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="40" fill="var(--color-primary-light)" opacity="0.2"/>
                  <circle cx="40" cy="30" r="16" fill="var(--color-primary)"/>
                  <path d="M12 74 Q12 56 40 56 Q68 56 68 74" fill="var(--color-primary)"/>
                </svg>
              </div>
              <div class="host-card__info">
                <h3>Jorge Clavijo</h3>
                <p>Terapeuta Ocupacional · Investigador</p>
                <div class="host-card__tags">
                  <span>Divulgador</span>
                  <span>Entrevistador</span>
                  <span>Conductor</span>
                </div>
              </div>
              <div class="host-card__social">
                <div class="soundwave" style="color: var(--color-primary)">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <span style="font-size: 0.78rem; color: var(--color-text-muted)">Al micrófono desde 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="section">
      <div class="container">
        <div class="mission-block">
          <div class="mission-block__label">
            <span class="section-header__label">Nuestra misión</span>
          </div>
          <div class="mission-content">
            <div class="mission-quote">
              <div class="mission-quote__mark">"</div>
              <p>
                Conversaciones en profundidad que conectan ciencia, práctica y experiencia real
                para entender la Terapia Ocupacional en todas sus dimensiones.
              </p>
            </div>
            <div class="mission-text">
              <p>
                <strong>Hablando de TO</strong> nace con el objetivo de <strong>divulgar, visibilizar
                y fortalecer la identidad profesional</strong> de la Terapia Ocupacional en el
                ámbito hispanohablante.
              </p>
              <p>
                A través de entrevistas extensas con profesionales, investigadores, instituciones
                y personas con experiencia vivida, el podcast explora la complejidad real de la
                ocupación humana y el papel de la Terapia Ocupacional en la sociedad.
              </p>
              <p>
                El proyecto surge de la convicción de que nuestra profesión merece un espacio
                propio de debate, análisis y divulgación: riguroso pero accesible, científico
                pero cercano, profesional pero humano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Qué nos guía</span>
          <h2 class="section-header__title">Pilares del podcast</h2>
        </div>
        <div class="values-grid">
          <div v-for="val in values" :key="val.title" class="value-card">
            <div class="value-card__icon">{{ val.icon }}</div>
            <h3>{{ val.title }}</h3>
            <p>{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Jorge Clavijo -->
    <section class="section host-section">
      <div class="container">
        <div class="host-bio">
          <div class="host-bio__visual">
            <div class="host-bio__avatar">
              <img
                v-if="!bioAvatarError"
                :src="'/jorge-clavijo.jpg'"
                alt="Jorge Clavijo"
                class="host-bio__photo"
                @error="bioAvatarError = true"
              />
              <svg v-else width="140" height="140" viewBox="0 0 140 140" fill="none">
                <circle cx="70" cy="70" r="70" fill="var(--color-bg-alt)"/>
                <circle cx="70" cy="52" r="26" fill="var(--color-primary)"/>
                <path d="M20 126 Q20 96 70 96 Q120 96 120 126" fill="var(--color-primary)"/>
              </svg>
              <div class="host-bio__badge">
                <div class="soundwave" style="color: white; gap: 2px;">
                  <span style="width: 2px;"></span>
                  <span style="width: 2px;"></span>
                  <span style="width: 2px;"></span>
                  <span style="width: 2px;"></span>
                  <span style="width: 2px;"></span>
                </div>
                <span>En el aire</span>
              </div>
            </div>
            <div class="host-bio__links">
              <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" rel="noopener" class="host-link platform-spotify">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                Spotify
              </a>
              <a href="https://www.youtube.com/@Hablandode_to" target="_blank" rel="noopener" class="host-link platform-youtube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube
              </a>
            </div>
          </div>
          <div class="host-bio__text">
            <span class="section-header__label">El conductor</span>
            <h2>Jorge Clavijo</h2>
            <p class="host-role">Terapeuta Ocupacional · Investigador · Divulgador</p>
            <div class="host-bio__paragraphs">
              <p>
                Jorge Clavijo es terapeuta ocupacional e investigador con una profunda vocación
                por la divulgación científica y la identidad profesional de la Terapia Ocupacional.
              </p>
              <p>
                Con formación en ciencias de la salud y experiencia tanto en la práctica clínica
                como en el ámbito académico, Jorge conduce cada entrevista con rigor científico
                y cercanía humana, buscando siempre conectar la evidencia con la realidad
                cotidiana de los profesionales y las personas que atienden.
              </p>
              <p>
                Su objetivo con Hablando de TO es claro: <strong>construir un espacio de referencia
                en español</strong> donde la Terapia Ocupacional pueda ser comprendida, debatida
                y celebrada en toda su complejidad.
              </p>
            </div>
            <div class="host-values">
              <div v-for="hv in hostValues" :key="hv.label" class="host-value-item">
                <span class="host-value-item__icon">{{ hv.icon }}</span>
                <div>
                  <strong>{{ hv.label }}</strong>
                  <span>{{ hv.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Audiences -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Para quién</span>
          <h2 class="section-header__title">¿A quién está dirigido?</h2>
          <p class="section-header__subtitle">Hablando de TO es para toda persona interesada en la ocupación humana y en la Terapia Ocupacional.</p>
        </div>
        <div class="audiences-grid">
          <div v-for="aud in audiences" :key="aud.title" class="audience-card">
            <div class="audience-card__icon">{{ aud.icon }}</div>
            <h4>{{ aud.title }}</h4>
            <p>{{ aud.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Historia</span>
          <h2 class="section-header__title">Cómo empezó todo</h2>
        </div>
        <div class="timeline">
          <div v-for="(item, i) in timeline" :key="i" class="timeline-item" :class="{ 'timeline-item--right': i % 2 !== 0 }">
            <div class="timeline-item__dot"></div>
            <div class="timeline-item__content">
              <span class="timeline-item__date">{{ item.date }}</span>
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="about-cta">
      <div class="container">
        <div class="about-cta__inner">
          <h2>¿Quieres ser parte de Hablando de TO?</h2>
          <p>Si eres profesional, investigador o institución y tienes algo valioso que aportar, nos encantaría escucharte.</p>
          <div class="about-cta__buttons">
            <router-link to="/podcast" class="btn btn-primary btn-lg">Ver episodios</router-link>
            <router-link to="/comunidad" class="btn btn-outline-white btn-lg">Contactar</router-link>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const avatarError = ref(false)
const bioAvatarError = ref(false)

const values = [
  {
    icon: '🔬',
    title: 'Rigor científico',
    desc: 'Cada episodio está fundamentado en evidencia, con referencias y profundidad académica sin perder la accesibilidad.'
  },
  {
    icon: '🌍',
    title: 'Visión hispanohablante',
    desc: 'Un podcast pensado para la comunidad TO en español, con perspectiva latinoamericana y europea.'
  },
  {
    icon: '🤝',
    title: 'Identidad profesional',
    desc: 'Creemos que la TO necesita un espacio propio donde la profesión pueda explicarse, debatirse y crecer.'
  },
  {
    icon: '💬',
    title: 'Conversación auténtica',
    desc: 'Entrevistas extensas y sin filtros, donde el invitado puede desarrollar su pensamiento con libertad.'
  },
  {
    icon: '📚',
    title: 'Acceso libre',
    desc: 'Todo el contenido es gratuito y accesible en múltiples plataformas, sin barreras para ningún profesional.'
  },
  {
    icon: '🔄',
    title: 'Perspectivas diversas',
    desc: 'Desde la práctica clínica hasta la investigación, pasando por la experiencia vivida y las instituciones.'
  }
]

const hostValues = [
  { icon: '🎓', label: 'Formación académica', desc: 'Ciencias de la Salud e investigación' },
  { icon: '🏥', label: 'Experiencia clínica', desc: 'Práctica directa en TO' },
  { icon: '🎙️', label: 'Divulgación', desc: 'Comunicación científica accesible' },
]

const audiences = [
  {
    icon: '👩‍⚕️',
    title: 'Terapeutas Ocupacionales',
    desc: 'Profesionales en activo que quieren actualizarse, conectar con la comunidad y reflexionar sobre su práctica.'
  },
  {
    icon: '🎓',
    title: 'Estudiantes de TO',
    desc: 'Futuros profesionales que buscan inspiración, orientación vocacional y contacto con referentes de la profesión.'
  },
  {
    icon: '🔬',
    title: 'Investigadores',
    desc: 'Académicos y científicos interesados en el estado del arte de la Terapia Ocupacional y la ciencia ocupacional.'
  },
  {
    icon: '🏛️',
    title: 'Instituciones y asociaciones',
    desc: 'Organizaciones del ámbito sanitario, educativo y social que trabajan con o para terapeutas ocupacionales.'
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Personas y familias',
    desc: 'Usuarios de servicios de TO y familiares que quieren entender mejor qué hace un terapeuta ocupacional.'
  },
  {
    icon: '🌐',
    title: 'Público general',
    desc: 'Cualquier persona curiosa sobre la ocupación humana, la salud y el bienestar desde una perspectiva diferente.'
  }
]

const timeline = [
  {
    date: 'Finales de 2023',
    title: 'La idea germina',
    desc: 'Jorge Clavijo detecta la ausencia de un podcast de referencia en Terapia Ocupacional en español y decide crearlo.'
  },
  {
    date: 'Verano 2024',
    title: 'Preparación y diseño',
    desc: 'Se diseña el formato de entrevista extensa, se elige el nombre Hablando de TO y se graban los primeros episodios.'
  },
  {
    date: 'Septiembre 2024',
    title: 'Episodio 1: TO en colegios',
    desc: 'Se publica el primer episodio del podcast, centrado en el papel del terapeuta ocupacional en el ámbito educativo, marcando el inicio del proyecto Hablando de TO.'
  },
  {
    date: 'Otoño–Invierno 2024',
    title: 'Expansión temática',
    desc: 'Episodios sobre cuidados paliativos, salud mental, oncología e investigación consolidan el podcast como referente hispanohablante.'
  },
  {
    date: 'Junio 2026',
    title: '+11.000 visualizaciones',
    desc: 'El episodio sobre sexualidad y TO supera las 11.000 visualizaciones en YouTube. La comunidad sigue creciendo.'
  }
]
</script>

<style scoped>
/* ===== HERO ===== */
.about-hero {
  background: linear-gradient(145deg, var(--color-deep) 0%, var(--color-primary-dark) 100%);
  padding: 140px 0 80px;
  color: white;
}

.about-hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-hero__text .section-header__label {
  color: var(--color-accent-light);
}

.about-hero__text h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  color: white;
  margin: 0.5rem 0 1rem;
  letter-spacing: -0.02em;
}

.about-hero__subtitle {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hero-pill {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.85);
  padding: 0.3rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 500;
}

/* Host card */
.host-card {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  backdrop-filter: blur(12px);
}

.host-card__avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.host-card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.host-bio__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.host-card__info h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
}

.host-card__info p {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.65);
  margin-bottom: 0.75rem;
}

.host-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: center;
}

.host-card__tags span {
  background: rgba(232,168,56,0.2);
  border: 1px solid rgba(232,168,56,0.3);
  color: var(--color-accent-light);
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.host-card__social {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

/* ===== MISSION ===== */
.mission-block {
  max-width: 960px;
  margin: 0 auto;
}

.mission-block__label {
  margin-bottom: 2rem;
}

.mission-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.mission-quote {
  background: linear-gradient(145deg, var(--color-primary), var(--color-primary-dark));
  border-radius: 20px;
  padding: 2.5rem;
  color: white;
}

.mission-quote__mark {
  font-size: 4rem;
  line-height: 0.7;
  color: rgba(255,255,255,0.25);
  font-family: Georgia, serif;
  margin-bottom: 0.75rem;
}

.mission-quote p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.9);
  font-style: italic;
}

.mission-text p {
  font-size: 0.98rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin-bottom: 1rem;
}

.mission-text strong { color: var(--color-deep); }

/* ===== VALUES ===== */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.value-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.75rem;
  transition: all var(--transition-base);
}
.value-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
  border-color: var(--color-primary-light);
}

.value-card__icon {
  font-size: 2rem;
  margin-bottom: 0.875rem;
}

.value-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-deep);
  margin-bottom: 0.5rem;
}

.value-card p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

/* ===== HOST BIO ===== */
.host-bio {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 4rem;
  align-items: start;
}

.host-bio__visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.host-bio__avatar {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid var(--color-primary-light);
  box-shadow: 0 8px 40px rgba(114,148,149,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-alt);
}

.host-bio__badge {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: white;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}

.host-bio__links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.host-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}
.host-link:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

.host-bio__text .section-header__label {
  display: block;
  margin-bottom: 0.5rem;
}

.host-bio__text h2 {
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-deep);
  margin-bottom: 0.25rem;
}

.host-role {
  font-size: 0.9rem;
  color: var(--color-primary);
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 1.5rem;
}

.host-bio__paragraphs {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 2rem;
}

.host-bio__paragraphs p {
  font-size: 0.98rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
}

.host-bio__paragraphs strong { color: var(--color-deep); }

.host-values {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.host-value-item {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  background: var(--color-bg-alt);
  border-radius: 12px;
}

.host-value-item__icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.host-value-item strong {
  display: block;
  font-size: 0.875rem;
  color: var(--color-deep);
  margin-bottom: 2px;
}

.host-value-item span {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* ===== AUDIENCES ===== */
.audiences-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.audience-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.75rem;
  transition: all var(--transition-base);
}
.audience-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.audience-card__icon {
  font-size: 2.25rem;
  margin-bottom: 0.875rem;
}

.audience-card h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-deep);
  margin-bottom: 0.5rem;
}

.audience-card p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

/* ===== TIMELINE ===== */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
  transform: translateX(-50%);
}

.timeline-item {
  display: grid;
  grid-template-columns: 1fr 32px 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  align-items: start;
}

.timeline-item__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 3px solid white;
  box-shadow: 0 0 0 2px var(--color-primary);
  margin: 8px auto 0;
  grid-column: 2;
}

.timeline-item__content {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: var(--shadow-sm);
  grid-column: 1;
  grid-row: 1;
}

.timeline-item--right .timeline-item__content {
  grid-column: 3;
}

.timeline-item--right .timeline-item__dot {
  grid-column: 2;
  grid-row: 1;
}

.timeline-item__date {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 0.375rem;
}

.timeline-item__content h4 {
  font-size: 0.95rem;
  color: var(--color-deep);
  margin-bottom: 0.375rem;
}

.timeline-item__content p {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ===== CTA ===== */
.about-cta {
  background: linear-gradient(145deg, var(--color-primary), var(--color-deep));
  padding: 5rem 0;
  text-align: center;
  color: white;
}

.about-cta__inner h2 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  color: white;
  margin-bottom: 0.875rem;
}

.about-cta__inner p {
  color: rgba(255,255,255,0.75);
  margin-bottom: 2rem;
  font-size: 1.05rem;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

.about-cta__buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.about-cta__inner .btn-primary {
  background: white;
  color: var(--color-deep);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .about-hero__inner { grid-template-columns: 1fr; }
  .about-hero__image { display: none; }
  .mission-content { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .host-bio { grid-template-columns: 1fr; }
  .host-bio__visual { flex-direction: row; justify-content: flex-start; align-items: flex-start; }
  .host-bio__avatar { width: 200px; height: 200px; }
  .audiences-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .values-grid { grid-template-columns: 1fr; }
  .audiences-grid { grid-template-columns: 1fr; }
  .timeline::before { left: 20px; }
  .timeline-item { grid-template-columns: 42px 1fr; }
  .timeline-item__dot { grid-column: 1; width: 12px; height: 12px; }
  .timeline-item__content { grid-column: 2; grid-row: 1; }
  .timeline-item--right .timeline-item__content { grid-column: 2; }
  .timeline-item--right .timeline-item__dot { grid-column: 1; }
  .host-bio__visual { flex-direction: column; align-items: center; }
}
</style>
