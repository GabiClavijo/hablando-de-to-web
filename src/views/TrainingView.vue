<template>
  <div class="training-view">
    <div class="page-hero">
      <div class="container">
        <span class="section-header__label">Desarrollo profesional</span>
        <h1>Formación</h1>
        <p>Cursos, masterclasses y webinars especializados en Terapia Ocupacional. Próximamente.</p>
      </div>
    </div>

    <!-- Coming Soon -->
    <section class="section">
      <div class="container--narrow" style="text-align:center">
        <div class="coming-soon-badge">🚀 Próximamente</div>
        <h2>Estamos preparando algo especial</h2>
        <p>La sección de Formación de Hablando de TO está en desarrollo. Pronto encontrarás cursos, masterclasses, webinars y eventos especializados en Terapia Ocupacional.</p>

        <div class="training-preview">
          <div v-for="item in comingItems" :key="item.title" class="training-preview-card card">
            <span class="training-preview-icon">{{ item.icon }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="badge badge-accent">Próximamente</span>
          </div>
        </div>

        <div class="training-notify">
          <h3>Sé el primero en saberlo</h3>
          <p>Déjanos tu email y te avisamos cuando lancemos la formación.</p>
          <form @submit.prevent="notifySubmit" class="notify-form">
            <input v-model="notifyEmail" type="email" class="form-input" placeholder="tu@email.com" required />
            <button type="submit" class="btn btn-accent btn-lg">
              {{ notifyDone ? '✅ ¡Anotado!' : 'Avisarme' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifyEmail = ref('')
const notifyDone = ref(false)
function notifySubmit() { notifyDone.value = true; notifyEmail.value = '' }

const comingItems = [
  { icon: '🎓', title: 'Masterclasses', description: 'Sesiones intensivas con expertos en áreas clave de la Terapia Ocupacional.' },
  { icon: '💻', title: 'Webinars', description: 'Eventos online gratuitos y de pago sobre temas de actualidad en TO.' },
  { icon: '📋', title: 'Cursos online', description: 'Formación estructurada con contenido teórico, práctico y evaluación.' },
  { icon: '🤝', title: 'Talleres', description: 'Talleres prácticos para el desarrollo de competencias específicas.' },
  { icon: '📅', title: 'Eventos', description: 'Jornadas, congresos y encuentros de la comunidad de TO.' },
  { icon: '🏆', title: 'Certificaciones', description: 'Acreditaciones reconocidas para tu desarrollo profesional.' }
]
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, #44337A, #553C9A);
  padding: 120px 0 60px;
  color: white;
}
.page-hero h1 { font-size: clamp(2rem, 5vw, 3rem); color: white; margin: var(--spacing-sm) 0; }
.page-hero p { color: rgba(255,255,255,0.75); font-size: 1.1rem; }
.page-hero .section-header__label { color: #D6BCFA; }

.coming-soon-badge {
  display: inline-block;
  background: rgba(232,168,56,0.15);
  color: var(--color-accent-dark);
  border: 1px solid var(--color-accent);
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: var(--spacing-lg);
}

.section h2 { font-size: 2rem; color: var(--color-primary-dark); margin-bottom: var(--spacing-md); }
.section > .container--narrow > p { color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: var(--spacing-3xl); }

.training-preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  text-align: left;
  margin-bottom: var(--spacing-3xl);
}

.training-preview-card {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.training-preview-icon { font-size: 2rem; }
.training-preview-card h3 { font-size: 1rem; color: var(--color-primary-dark); }
.training-preview-card p { font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6; flex: 1; }

.training-notify {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  max-width: 500px;
  margin: 0 auto;
}

.training-notify h3 { color: var(--color-primary-dark); margin-bottom: 8px; }
.training-notify p { color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-lg); }

.notify-form {
  display: flex;
  gap: var(--spacing-sm);
}

@media (max-width: 768px) {
  .training-preview { grid-template-columns: repeat(2, 1fr); }
  .notify-form { flex-direction: column; }
}
</style>
