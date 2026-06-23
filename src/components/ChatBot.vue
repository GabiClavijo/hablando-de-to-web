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
import { ref, nextTick, onMounted } from 'vue'

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
  { label: '📊 Métricas del podcast', query: 'métricas' },
  { label: '📍 ¿Dónde escuchar?', query: 'dónde puedo escuchar el podcast' },
  { label: '👤 Sobre Jorge Clavijo', query: 'quién es jorge clavijo' },
]

const knowledgeBase = [
  {
    patterns: ['qué es este podcast', 'hablando de to', 'de qué trata', 'qué es'],
    response: `<strong>Hablando de TO</strong> es un podcast de referencia en Terapia Ocupacional creado y conducido por <strong>Jorge Clavijo</strong>.<br><br>
               🎙️ Ofrece <strong>entrevistas en profundidad</strong> con profesionales, investigadores, instituciones y personas con experiencia vivida.<br><br>
               📚 Su objetivo es divulgar, visibilizar y fortalecer la identidad profesional de la TO en el ámbito hispanohablante.<br><br>
               ¿Quieres que te recomiende por dónde empezar?`
  },
  {
    patterns: ['qué es la terapia ocupacional', 'terapia ocupacional', 'terapeuta ocupacional', 'to es', 'qué hace un to'],
    response: `La <strong>Terapia Ocupacional (TO)</strong> es una profesión sanitaria que ayuda a las personas a participar en las actividades que son significativas para ellas.<br><br>
               🏠 <strong>Actividades de la vida diaria</strong>: vestirse, cocinar, trabajar, estudiar...<br>
               🧠 Trabaja con personas con <strong>dificultades físicas, cognitivas, mentales o sociales</strong>.<br>
               🌍 Su objetivo es mejorar la <strong>calidad de vida y la autonomía</strong> de las personas.<br><br>
               En Hablando de TO exploramos todos estos aspectos en profundidad. 🎙️`
  },
  {
    patterns: ['recomiéndame episodios', 'recomiendas', 'por dónde empezar', 'mejor episodio', 'primer episodio'],
    response: `¡Aquí van mis recomendaciones según tu perfil! 🎯<br><br>
               🏆 <strong>El más visto:</strong> Ep. 4 — TO en Pediatría (+11.000 views en YouTube)<br>
               🧠 <strong>Neurología:</strong> Ep. 1 — TO en Daño Cerebral Adquirido<br>
               🚗 <strong>Geriatría:</strong> Ep. 2 — Conducción y Envejecimiento<br>
               💚 <strong>Salud mental:</strong> Ep. 3 — Salud Mental y Ocupación<br>
               🔬 <strong>Investigación:</strong> Ep. 5 — Investigación en TO<br><br>
               Puedes escucharlos en <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB" target="_blank" style="color: #1DB954; font-weight: 600;">Spotify</a> o verlos en <a href="https://www.youtube.com/@Hablandode_to" target="_blank" style="color: #FF0000; font-weight: 600;">YouTube</a> 🎧`
  },
  {
    patterns: ['spotify', 'escuchar', 'audio', 'dónde puedo escuchar', 'plataformas'],
    response: `Puedes escuchar <strong>Hablando de TO</strong> en múltiples plataformas 🎧:<br><br>
               🟢 <a href="https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB?si=6416d9d4e80d4824" target="_blank" style="color: #1DB954; font-weight: 600;">Spotify</a><br>
               🔴 <a href="https://www.youtube.com/@Hablandode_to" target="_blank" style="color: #FF0000; font-weight: 600;">YouTube</a><br>
               🔴 Apple Podcasts<br>
               🟠 iVoox<br>
               🟡 Amazon Music<br><br>
               ¡El contenido es 100% gratuito! Sin suscripción ni barreras.`
  },
  {
    patterns: ['youtube', 'vídeo', 'video', 'ver', 'canal'],
    response: `¡Nuestro canal de YouTube es <a href="https://www.youtube.com/@Hablandode_to" target="_blank" style="color: #FF0000; font-weight: 600;">@Hablandode_to</a>! 📺<br><br>
               Allí encontrarás todos los episodios en formato vídeo.<br><br>
               📊 <strong>Datos del canal:</strong><br>
               • +48.000 visualizaciones totales<br>
               • Episodio más visto: +11.000 views (TO en Pediatría)<br>
               • 67% de retención media<br><br>
               ¡Suscríbete para no perderte los próximos episodios! 🔔`
  },
  {
    patterns: ['jorge', 'clavijo', 'quién es', 'conductor', 'presentador', 'creador', 'sobre'],
    response: `<strong>Jorge Clavijo</strong> es el creador y conductor de Hablando de TO 🎙️.<br><br>
               👨‍⚕️ <strong>Terapeuta Ocupacional</strong> e investigador<br>
               🔬 Formación académica en Ciencias de la Salud<br>
               📢 Vocación por la <strong>divulgación científica</strong><br>
               🌍 Comprometido con la <strong>identidad profesional de la TO</strong> en español<br><br>
               Puedes conocer más sobre él en la sección <a href="/sobre" style="color: var(--color-primary); font-weight: 600;">Sobre el proyecto</a>.`
  },
  {
    patterns: ['métricas', 'datos', 'estadísticas', 'alcance', 'impacto', 'reproducciones'],
    response: `📊 <strong>Métricas de Hablando de TO</strong> (Junio 2026):<br><br>
               🟢 <strong>Spotify:</strong> +2.400 reprod/día en pico máximo<br>
               🔴 <strong>YouTube:</strong> +48.000 visualizaciones totales<br>
               📈 <strong>Crecimiento:</strong> +35% mensual (May→Jun)<br>
               ⭐ <strong>Valoración:</strong> 4.9/5 en Spotify<br>
               🌍 <strong>Audiencia:</strong> 12+ países hispanohablantes<br><br>
               Puedes ver el dashboard completo en <a href="/metricas" style="color: var(--color-primary); font-weight: 600;">Métricas</a>.`
  },
  {
    patterns: ['contacto', 'contactar', 'escribir', 'participar', 'invitado', 'entrevista'],
    response: `¿Te gustaría participar o colaborar con el podcast? 🤝<br><br>
               Si eres <strong>profesional, investigador o institución</strong> vinculada a la Terapia Ocupacional, nos encantaría escucharte.<br><br>
               📩 Visita la sección <a href="/comunidad" style="color: var(--color-primary); font-weight: 600;">Comunidad</a> para ponerte en contacto con el equipo.`
  },
  {
    patterns: ['comunidad', 'unirme', 'newsletter', 'suscribirme'],
    response: `¡Únete a la comunidad de <strong>Hablando de TO</strong>! 🤝<br><br>
               📧 <strong>Newsletter:</strong> Recibe los nuevos episodios, recursos y novedades de TO<br>
               💬 <strong>Participa:</strong> Propón temas, invitados o debates<br>
               🔔 <strong>Suscríbete</strong> en YouTube y Spotify para no perderte nada<br><br>
               Visita la sección <a href="/comunidad" style="color: var(--color-primary); font-weight: 600;">Comunidad</a> para más información.`
  },
  {
    patterns: ['salud mental', 'neurología', 'pediatría', 'geriatría', 'investigación', 'daño cerebral'],
    response: `En Hablando de TO abordamos múltiples especialidades 🏥:<br><br>
               🧠 <strong>Neurorrehabilitación y DCA</strong> — Ep. 1<br>
               🚗 <strong>Geriatría y conducción</strong> — Ep. 2<br>
               💚 <strong>Salud mental</strong> — Ep. 3<br>
               👶 <strong>Pediatría y neurodesarrollo</strong> — Ep. 4<br>
               🔬 <strong>Investigación</strong> — Ep. 5<br>
               👵 <strong>Envejecimiento activo</strong> — Ep. 6<br><br>
               ¿Cuál te interesa más? Te puedo dar más detalles de cualquier episodio.`
  },
  {
    patterns: ['hola', 'buenos días', 'buenas', 'hey', 'saludos', 'buenas tardes'],
    response: `¡Hola! 👋 Encantado de saludarte.<br><br>
               Soy el asistente de <strong>Hablando de TO</strong>, el podcast de referencia en Terapia Ocupacional en español.<br><br>
               ¿En qué puedo ayudarte hoy? Puedo recomendarte episodios, explicarte qué es la TO o ayudarte a navegar por la web.`
  },
  {
    patterns: ['gracias', 'muchas gracias', 'perfecto', 'genial', 'excelente'],
    response: `¡De nada! 😊 Es un placer ayudarte.<br><br>
               Si tienes cualquier otra duda sobre <strong>Hablando de TO</strong> o sobre la Terapia Ocupacional, aquí estaré.<br><br>
               🎧 ¡Que disfrutes el podcast!`
  },
]

const defaultResponse = `No he encontrado información específica sobre eso, pero puedo ayudarte con:<br><br>
  🎙️ <strong>El podcast:</strong> qué es, formato y contenido<br>
  🦺 <strong>Terapia Ocupacional:</strong> qué es y cómo funciona<br>
  🎧 <strong>Episodios:</strong> recomendaciones por tema<br>
  📍 <strong>Plataformas:</strong> dónde escuchar y ver<br>
  👤 <strong>Jorge Clavijo:</strong> el conductor del podcast<br><br>
  ¿Sobre cuál de estos temas te puedo ayudar?`

function findResponse(text) {
  const lower = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  for (const entry of knowledgeBase) {
    if (entry.patterns.some(p => lower.includes(p.normalize('NFD').replace(/[̀-ͯ]/g, '')))) {
      return entry.response
    }
  }
  return defaultResponse
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

  let botText = null

  // Intentar llamada a Claude API
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.value })
    })
    if (res.ok) {
      const data = await res.json()
      if (data.text) botText = data.text
    }
  } catch { /* sin conexión o API no configurada — usar fallback */ }

  // Fallback a base de patrones local
  if (!botText) {
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400))
    botText = findResponse(text)
  }

  isTyping.value = false
  messages.value.push({ from: 'bot', text: botText })
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
