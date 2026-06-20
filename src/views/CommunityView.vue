<template>
  <div class="community-view">
    <div class="page-hero">
      <div class="container">
        <span class="section-header__label">Espacio participativo</span>
        <h1>Comunidad</h1>
        <p>Tu voz importa. Participa, debate y ayuda a construir el futuro de la Terapia Ocupacional.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="community-grid">
          <!-- Encuesta activa -->
          <div class="community-card card">
            <div class="community-card__header">
              <span class="community-tag">📊 Encuesta activa</span>
              <span class="community-status">Abierta</span>
            </div>
            <h3>¿Qué temática te gustaría en el próximo episodio?</h3>
            <div class="poll-options">
              <label v-for="option in pollOptions" :key="option.id" class="poll-option">
                <input type="radio" name="poll" :value="option.id" v-model="selectedPoll" />
                <span class="poll-option__label">{{ option.label }}</span>
                <span class="poll-option__bar" :style="{ width: selectedPoll ? option.percent + '%' : '0%' }"></span>
                <span v-if="selectedPoll" class="poll-option__pct">{{ option.percent }}%</span>
              </label>
            </div>
            <button class="btn btn-primary" @click="submitPoll" :disabled="!selectedPoll || pollSubmitted">
              {{ pollSubmitted ? '✅ Votado' : 'Enviar voto' }}
            </button>
          </div>

          <!-- Proponer tema -->
          <div class="community-card card">
            <div class="community-card__header">
              <span class="community-tag">💡 Propuesta de tema</span>
            </div>
            <h3>¿Tienes una idea para un episodio?</h3>
            <p>Cuéntanos qué temas te gustaría que tratáramos. Las mejores propuestas se convierten en episodios.</p>
            <form @submit.prevent="submitIdea" class="community-form">
              <input v-model="idea.name" type="text" class="form-input" placeholder="Tu nombre" required />
              <input v-model="idea.email" type="email" class="form-input" placeholder="tu@email.com" required />
              <input v-model="idea.topic" type="text" class="form-input" placeholder="Tema propuesto" required />
              <textarea v-model="idea.description" class="form-input" rows="4" placeholder="Describe brevemente la propuesta..."></textarea>
              <button type="submit" class="btn btn-primary">Enviar propuesta</button>
            </form>
            <p v-if="ideaSubmitted" class="success-msg">🎉 ¡Gracias! Tu propuesta se ha enviado correctamente.</p>
          </div>

          <!-- Debate -->
          <div class="community-card card">
            <div class="community-card__header">
              <span class="community-tag">🗣️ Debate profesional</span>
            </div>
            <h3>Pregunta para la comunidad</h3>
            <p class="debate-question">
              ¿Cuál crees que es el mayor reto de la Terapia Ocupacional en España hoy?
            </p>
            <div class="debate-options">
              <button
                v-for="opt in debateOptions"
                :key="opt"
                class="debate-btn"
                :class="{ selected: selectedDebate === opt }"
                @click="selectedDebate = opt"
              >{{ opt }}</button>
            </div>
            <button class="btn btn-primary" @click="submitDebate" :disabled="!selectedDebate || debateSubmitted">
              {{ debateSubmitted ? '✅ Enviado' : 'Opinar' }}
            </button>
          </div>

          <!-- Redes sociales -->
          <div class="community-card community-card--social card">
            <div class="community-card__header">
              <span class="community-tag">📱 Síguenos</span>
            </div>
            <h3>Únete a la comunidad en redes</h3>
            <div class="social-links-grid">
              <a href="https://instagram.com/hablandode_to" target="_blank" class="social-block">
                <div class="social-block__icon" style="background:#E1306C">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div>
                  <strong>Instagram</strong>
                  <span>@hablandode_to</span>
                </div>
              </a>
              <a href="https://youtube.com/@hablandode_to" target="_blank" class="social-block">
                <div class="social-block__icon" style="background:#FF0000">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <div>
                  <strong>YouTube</strong>
                  <span>@hablandode_to</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPoll = ref(null)
const pollSubmitted = ref(false)
const pollOptions = [
  { id: 1, label: 'Terapia Ocupacional en oncología', percent: 34 },
  { id: 2, label: 'TO y tecnología asistiva', percent: 28 },
  { id: 3, label: 'Práctica basada en la evidencia', percent: 22 },
  { id: 4, label: 'TO en contexto penitenciario', percent: 16 }
]
function submitPoll() { if (selectedPoll.value) pollSubmitted.value = true }

const ideaSubmitted = ref(false)
const idea = ref({ name: '', email: '', topic: '', description: '' })
function submitIdea() { ideaSubmitted.value = true; idea.value = { name: '', email: '', topic: '', description: '' } }

const selectedDebate = ref(null)
const debateSubmitted = ref(false)
const debateOptions = [
  'Falta de reconocimiento profesional',
  'Escasa investigación propia',
  'Poca presencia en atención primaria',
  'Acceso limitado a formación especializada'
]
function submitDebate() { if (selectedDebate.value) debateSubmitted.value = true }
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, #1B4332, #2D6A4F);
  padding: 120px 0 60px;
  color: white;
}
.page-hero h1 { font-size: clamp(2rem, 5vw, 3rem); color: white; margin: var(--spacing-sm) 0; }
.page-hero p { color: rgba(255,255,255,0.75); font-size: 1.1rem; }
.page-hero .section-header__label { color: #95E3BE; }

.community-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
}

.community-card {
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.community-card--social {
  grid-column: span 1;
}

.community-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.community-tag {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.community-status {
  background: rgba(56,161,105,0.15);
  color: var(--color-success);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.community-card h3 {
  font-size: 1.2rem;
  color: var(--color-primary-dark);
  line-height: 1.35;
}

.community-card p {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Poll */
.poll-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.poll-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.poll-option:hover { border-color: var(--color-primary-light); }
.poll-option input { display: none; }
.poll-option__label { font-size: 0.9rem; color: var(--color-text); z-index: 1; flex: 1; }
.poll-option__bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(10,61,98,0.06);
  transition: width 0.5s ease;
}
.poll-option__pct {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-primary);
  z-index: 1;
}

/* Community form */
.community-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.community-form textarea {
  resize: vertical;
  min-height: 100px;
}

.success-msg {
  color: var(--color-success);
  font-weight: 600;
  text-align: center;
}

/* Debate */
.debate-question {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  line-height: 1.5;
  font-style: italic;
}

.debate-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.debate-btn {
  text-align: left;
  padding: 0.75rem var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  background: white;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.debate-btn:hover { border-color: var(--color-primary-light); color: var(--color-primary); }
.debate-btn.selected {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Social */
.social-links-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.social-block {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.social-block:hover {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-sm);
  transform: translateX(4px);
}

.social-block__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.social-block div:last-child {
  display: flex;
  flex-direction: column;
}

.social-block strong {
  font-size: 0.95rem;
  color: var(--color-text);
}

.social-block span {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .community-grid { grid-template-columns: 1fr; }
}
</style>
