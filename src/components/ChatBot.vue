<template>
  <!-- Floating Button -->
  <div class="chatbot-wrapper">
    <transition name="chat-panel">
      <div v-if="isOpen" class="chatbot-panel" role="dialog" aria-label="Asistente de Hablando de TO">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-header__info">
            <div class="chatbot-avatar">
              <svg width="24" height="24" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.15)"/>
                <path d="M22 54 Q30 26 40 40 Q50 54 58 26" stroke="white" stroke-width="4" stroke-linecap="round" fill="none"/>
                <circle cx="40" cy="40" r="7" fill="var(--color-accent)"/>
              </svg>
            </div>
            <div>
              <div class="chatbot-header__name">Asistente TO</div>
              <div class="chatbot-header__status">
                <span class="status-dot"></span>
                En línea
              </div>
            </div>
          </div>
          <button class="chatbot-close" @click="close" aria-label="Cerrar chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Messages -->
        <div class="chatbot-messages" ref="messagesEl">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="chatbot-msg"
            :class="msg.from === 'bot' ? 'chatbot-msg--bot' : 'chatbot-msg--user'"
          >
            <div v-if="msg.from === 'bot'" class="chatbot-msg__avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5"/><path d="M8 14 Q10 10 12 12 Q14 14 16 10" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
            </div>
            <div class="chatbot-msg__bubble" v-html="msg.text"></div>
          </div>
          <div v-if="isTyping" class="chatbot-msg chatbot-msg--bot">
            <div class="chatbot-msg__avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5"/></svg>
            </div>
            <div class="chatbot-msg__bubble chatbot-msg__bubble--typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="chatbot-quick" v-if="showQuickActions">
          <p class="chatbot-quick__label">Preguntas frecuentes:</p>
          <div class="chatbot-quick__chips">
            <button
              v-for="chip in quickChips"
              :key="chip.label"
              class="quick-chip"
              @click="sendQuick(chip)"
            >
              {{ chip.label }}
            </button>
          </div>
        </div>

        <!-- Input -->
        <div class="chatbot-input">
          <input
            v-model="inputText"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Escribe tu pregunta..."
            class="chatbot-input__field"
            :disabled="isTyping"
            ref="inputEl"
          />
          <button
            class="chatbot-input__send"
            @click="sendMessage"
            :disabled="!inputText.trim() || isTyping"
            aria-label="Enviar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </transition>

    <!-- Toggle Button -->
    <button
      class="chatbot-toggle"
      @click="toggle"
      :class="{ 'chatbot-toggle--open': isOpen }"
      aria-label="Abrir asistente"
    >
      <transition name="icon-swap" mode="out-in">
        <svg v-if="!isOpen" key="open" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
        <svg v-else key="close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </transition>
      <span v-if="!isOpen && unread > 0" class="chatbot-badge">{{ unread }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { episodesKnowledge } from '@/data/episodesKnowledge.js'

const isOpen = ref(false)
const isTyping = ref(false)
const inputText = ref('')
const messagesEl = ref(null)
const inputEl = ref(null)
const unread = ref(1)
const showQuickActions = ref(true)

const messages = ref([
  {
    from: 'bot',
    text: `¡Hola! 👋 Soy el asistente de <strong>Hablando de TO</strong>.<br><br>
           Puedo ayudarte con información sobre el podcast, la Terapia Ocupacional,
           recomendaciones de episodios o cómo navegar por la web.<br><br>
           ¿En qué puedo ayudarte?`
  }
])

const quickChips = [
  { label: '🎙️ ¿Qué es este podcast?', query: 'qué es este podcast' },
  { label: '🦺 ¿Qué es la TO?', query: 'qué es la terapia ocupacional' },
  { label: '🎧 Episodios recomendados', query: 'recomiéndame episodios' },
  { label: '📍 ¿Dónde escuchar?', query: 'dónde puedo escuchar el podcast' },
  { label: '👤 Sobre Jorge Clavijo', query: 'quién es jorge clavijo' },
]

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function searchEpisodes(query) {
  const q = normalize(query)
  const words = q.split(/\s+/).filter(w => w.length > 2)
  const scored = episodesKnowledge.map(ep => {
    const hay = normalize(ep.title + ' ' + ep.guest + ' ' + ep.description + ' ' + ep.tags.join(' '))
    const score = words.reduce((s, w) => {
      const inTitle = normalize(ep.title + ' ' + ep.guest).includes(w) ? 3 : 0
      const inDesc = hay.includes(w) ? 1 : 0
      return s + inTitle + inDesc
    }, 0)
    return { ep, score }
  })
  return scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(x => x.ep)
}

function formatEpisodeList(eps) {
  return eps.map(ep =>
    `• <a href="${ep.url}" target="_blank" style="color:var(--color-primary);font-weight:600;">Ep. #${ep.num}</a> — ${ep.guest || ep.title.split('|')[1]?.trim() || ep.title}`
  ).join('<br>')
}

const staticResponses = [
  {
    patterns: ['qué es este podcast', 'de qué trata', 'qué es hablando'],
    response: `<strong>Hablando de TO</strong> es un podcast de referencia en Terapia Ocupacional creado y conducido por <strong>Jorge Clavijo</strong>.<br><br>
               🎙️ Entrevistas en profundidad con profesionales, investigadores y personas con experiencia vivida.<br>
               📚 42 episodios publicados desde septiembre 2024.<br><br>
               ¿Quieres que te recomiende episodios sobre algún tema?`
  },
  {
    patterns: ['qué es la terapia ocupacional', 'qué hace un to', 'qué es la to'],
    response: `La <strong>Terapia Ocupacional (TO)</strong> es una profesión sanitaria que ayuda a las personas a participar en las actividades significativas para ellas.<br><br>
               🏠 Actividades de la vida diaria: vestirse, cocinar, trabajar...<br>
               🧠 Trabaja con personas con dificultades físicas, cognitivas o sociales.<br>
               🌍 Su objetivo: mejorar la autonomía y calidad de vida.<br><br>
               En este podcast exploramos todos estos ámbitos con profesionales reales. 🎙️`
  },
  {
    patterns: ['recomiéndame', 'por dónde empezar', 'mejor episodio', 'más visto'],
    response: () => {
      const top = [...episodesKnowledge].sort((a, b) => b.views - a.views).slice(0, 4)
      return `Los episodios más vistos del canal 🏆:<br><br>${formatEpisodeList(top)}<br><br>¿Hay algún tema en concreto que te interese?`
    }
  },
  {
    patterns: ['spotify', 'dónde escuchar', 'plataformas', 'dónde puedo escuchar'],
    response: `Puedes escuchar <strong>Hablando de TO</strong> en 🎧:<br><br>
               🟢 <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB" target="_blank" style="color:#1DB954;font-weight:600;">Spotify</a><br>
               🔴 <a href="https://www.youtube.com/@Hablandode_to" target="_blank" style="color:#FF0000;font-weight:600;">YouTube</a><br>
               🍎 Apple Podcasts · iVoox · Amazon Music<br><br>
               ¡Gratuito en todas las plataformas!`
  },
  {
    patterns: ['jorge', 'clavijo', 'quién es', 'conductor', 'creador'],
    response: `<strong>Jorge Clavijo</strong> es el creador y conductor de Hablando de TO 🎙️.<br><br>
               👨‍⚕️ Terapeuta Ocupacional<br>
               📢 Comprometido con la divulgación y visibilidad de la TO en español<br>
               🎙️ 42 episodios publicados desde septiembre 2024`
  },
  {
    patterns: ['hola', 'buenos días', 'buenas', 'hey', 'saludos'],
    response: `¡Hola! 👋 Soy el asistente de <strong>Hablando de TO</strong>.<br><br>
               Puedo ayudarte a encontrar episodios sobre cualquier tema de Terapia Ocupacional. Prueba a preguntarme por un área específica como <em>neurorrehabilitación</em>, <em>salud mental</em>, <em>paliativos</em>...`
  },
  {
    patterns: ['gracias', 'muchas gracias', 'perfecto', 'genial'],
    response: `¡De nada! 😊 Si quieres explorar más episodios, pregúntame por cualquier tema de Terapia Ocupacional. 🎧`
  },
]

function findResponse(text) {
  const lower = normalize(text)

  // Check static responses first
  for (const entry of staticResponses) {
    if (entry.patterns.some(p => lower.includes(normalize(p)))) {
      return typeof entry.response === 'function' ? entry.response() : entry.response
    }
  }

  // Search episodes by keyword
  const results = searchEpisodes(text)
  if (results.length > 0) {
    const intro = results.length === 1
      ? `Encontré este episodio relacionado 🎙️:`
      : `Encontré ${results.length} episodios relacionados 🎙️:`
    return `${intro}<br><br>${formatEpisodeList(results)}<br><br>¿Quieres saber más sobre alguno?`
  }

  return `No encontré episodios sobre ese tema en el podcast.<br><br>
Prueba a preguntar por temas como: <em>paliativos, neurorrehabilitación, salud mental, MOHO, integración sensorial, TCA, investigación, deporte, prisiones...</em>`
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isTyping.value) return

  messages.value.push({ from: 'user', text })
  inputText.value = ''
  showQuickActions.value = false
  await scrollToBottom()

  isTyping.value = true
  await scrollToBottom()

  await new Promise(resolve => setTimeout(resolve, 700 + Math.random() * 500))

  isTyping.value = false
  messages.value.push({ from: 'bot', text: findResponse(text) })
  await scrollToBottom()
}

async function sendQuick(chip) {
  inputText.value = chip.query
  await sendMessage()
}

async function scrollToBottom() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    unread.value = 0
    nextTick(() => inputEl.value?.focus())
  }
}

function close() {
  isOpen.value = false
}
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

/* ===== TOGGLE BUTTON ===== */
.chatbot-toggle {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 24px rgba(114,148,149,0.45);
  transition: all var(--transition-base);
  position: relative;
  flex-shrink: 0;
}

.chatbot-toggle:hover {
  background: var(--color-primary-dark);
  transform: scale(1.08);
  box-shadow: 0 8px 32px rgba(114,148,149,0.5);
}

.chatbot-toggle--open {
  background: var(--color-deep);
}

.chatbot-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-accent);
  color: white;
  font-size: 0.7rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

/* ===== PANEL ===== */
.chatbot-panel {
  width: 360px;
  max-height: 520px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

/* ===== HEADER ===== */
.chatbot-header {
  background: linear-gradient(135deg, var(--color-primary), var(--color-deep));
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.chatbot-header__info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chatbot-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chatbot-header__name {
  font-size: 0.92rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.chatbot-header__status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.7);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ADE80;
  animation: pulse 2s ease-in-out infinite;
}

.chatbot-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast);
}
.chatbot-close:hover { background: rgba(255,255,255,0.25); }

/* ===== MESSAGES ===== */
.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  scroll-behavior: smooth;
}

.chatbot-messages::-webkit-scrollbar { width: 4px; }
.chatbot-messages::-webkit-scrollbar-track { background: transparent; }
.chatbot-messages::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 2px; }

.chatbot-msg {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.chatbot-msg--user {
  flex-direction: row-reverse;
}

.chatbot-msg__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chatbot-msg__bubble {
  max-width: 82%;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  font-size: 0.875rem;
  line-height: 1.6;
}

.chatbot-msg--bot .chatbot-msg__bubble {
  background: var(--color-bg-alt);
  border-radius: 2px 14px 14px 14px;
  color: var(--color-text);
}

.chatbot-msg--user .chatbot-msg__bubble {
  background: var(--color-primary);
  color: white;
  border-radius: 14px 2px 14px 14px;
}

/* Typing indicator */
.chatbot-msg__bubble--typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0.875rem 1rem;
  min-width: 60px;
}

.chatbot-msg__bubble--typing span {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-text-muted);
  animation: typing-bounce 1.2s ease-in-out infinite;
}
.chatbot-msg__bubble--typing span:nth-child(1) { animation-delay: 0s; }
.chatbot-msg__bubble--typing span:nth-child(2) { animation-delay: 0.2s; }
.chatbot-msg__bubble--typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* ===== QUICK ACTIONS ===== */
.chatbot-quick {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
  flex-shrink: 0;
}

.chatbot-quick__label {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
}

.chatbot-quick__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.quick-chip {
  padding: 0.3rem 0.7rem;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}
.quick-chip:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* ===== INPUT ===== */
.chatbot-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  border-top: 1px solid var(--color-border);
  background: white;
  flex-shrink: 0;
}

.chatbot-input__field {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  color: var(--color-text);
  background: var(--color-bg);
  transition: border-color var(--transition-fast);
}
.chatbot-input__field:focus {
  border-color: var(--color-primary);
}
.chatbot-input__field::placeholder {
  color: var(--color-text-muted);
}

.chatbot-input__send {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}
.chatbot-input__send:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: scale(1.05);
}
.chatbot-input__send:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ===== TRANSITIONS ===== */
.chat-panel-enter-active,
.chat-panel-leave-active {
  transition: all 0.3s ease;
}
.chat-panel-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}
.chat-panel-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}

.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: all 0.2s ease;
}
.icon-swap-enter-from { opacity: 0; transform: scale(0.7) rotate(-30deg); }
.icon-swap-leave-to { opacity: 0; transform: scale(0.7) rotate(30deg); }

/* ===== RESPONSIVE ===== */
@media (max-width: 480px) {
  .chatbot-wrapper { bottom: 1rem; right: 1rem; }
  .chatbot-panel { width: calc(100vw - 2rem); }
}
</style>
