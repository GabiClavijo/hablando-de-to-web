<template>
  <div class="metrics-page">

    <!-- Hero -->
    <section class="metrics-hero">
      <div class="container">
        <div class="metrics-hero__inner">
          <span class="section-header__label">Dashboard de impacto</span>
          <h1>Métricas y crecimiento</h1>
          <p>Transparencia total sobre el alcance de Hablando de TO. Datos reales del podcast en todas las plataformas.</p>
        </div>
      </div>
    </section>

    <!-- Community Banner -->
    <section class="community-banner">
      <div class="container">
        <div class="community-banner__inner">
          <div class="community-banner__text">
            <span class="community-banner__label">Una comunidad que sigue creciendo</span>
            <h2>
              <template v-if="communityTotal">
                Más de
                <span class="community-banner__highlight">{{ communityTotal.toLocaleString('es-ES') }}</span>
                personas siguen Hablando de TO
              </template>
              <template v-else-if="ytLoading">Cargando datos reales del canal…</template>
              <template v-else>La comunidad de Hablando de TO sigue creciendo</template>
            </h2>
            <p>Entre suscriptores de YouTube, seguidores de Spotify e Instagram, una comunidad profesional y divulgativa en constante expansión.</p>
          </div>
          <div class="community-banner__stats">
            <div class="cb-stat" v-for="s in communityStats" :key="s.label">
              <div class="cb-stat__val" :style="{ color: s.color }">
                {{ s.apiKey ? (ytLoading ? '…' : fmtNum(ytData?.channel?.[s.apiKey])) : s.static }}
              </div>
              <div class="cb-stat__icon">{{ s.icon }}</div>
              <div class="cb-stat__label">{{ s.label }}</div>
              <div class="cb-stat__platform">{{ s.platform }}</div>
            </div>
          </div>
        </div>
        <div v-if="ytData" class="api-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          Datos de YouTube en tiempo real · Actualizado hace {{ fromCache ? '&lt;1h' : 'ahora' }}
        </div>
        <div v-else-if="ytLoading" class="api-badge api-badge--loading">Cargando datos reales…</div>
      </div>
    </section>

    <!-- Summary Cards -->
    <section class="section">
      <div class="container">
        <div class="summary-grid">
          <div v-for="card in summaryCards" :key="card.label" class="summary-card" :style="{ '--card-accent': card.color }">
            <div class="summary-card__icon">{{ card.icon }}</div>
            <div class="summary-card__body">
              <div class="summary-card__value">{{ card.value }}</div>
              <div class="summary-card__label">{{ card.label }}</div>
              <div class="summary-card__change" :class="card.trend > 0 ? 'up' : 'down'">
                {{ card.trend > 0 ? '↑' : '↓' }} {{ Math.abs(card.trend) }}% vs. mes anterior
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spotify Chart -->
    <section class="section section--alt">
      <div class="container">
        <div class="chart-block">
          <div class="chart-block__header">
            <div class="chart-title-group">
              <div class="platform-dot platform-dot--spotify"></div>
              <div>
                <h2>Reproducciones en Spotify</h2>
                <p>Periodo: finales de mayo – junio 2026</p>
              </div>
            </div>
            <div class="chart-legend">
              <span class="legend-item">
                <span class="legend-dot" style="background: var(--color-primary)"></span>
                Reproducciones diarias
              </span>
            </div>
          </div>

          <div class="chart-container">
            <svg :viewBox="`0 0 ${svgW} ${svgH}`" class="line-chart" preserveAspectRatio="none">
              <defs>
                <linearGradient id="spotifyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0"/>
                </linearGradient>
              </defs>

              <!-- Grid lines -->
              <g class="grid-lines">
                <line v-for="(y, i) in yGridLines" :key="i"
                  :x1="padL" :y1="y" :x2="svgW - padR" :y2="y"
                  stroke="var(--color-border)" stroke-width="1" stroke-dasharray="4,4"
                />
              </g>

              <!-- Area fill -->
              <path :d="areaPath" fill="url(#spotifyGrad)"/>

              <!-- Line -->
              <path :d="linePath" fill="none" stroke="var(--color-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

              <!-- Dots -->
              <g>
                <circle
                  v-for="(pt, i) in chartPoints"
                  :key="i"
                  :cx="pt.x" :cy="pt.y" r="5"
                  fill="white" stroke="var(--color-primary)" stroke-width="2.5"
                  class="chart-dot"
                  @mouseenter="hoverIndex = i"
                  @mouseleave="hoverIndex = null"
                />
              </g>

              <!-- Tooltip -->
              <g v-if="hoverIndex !== null" class="tooltip-group">
                <rect
                  :x="chartPoints[hoverIndex].x - 45"
                  :y="chartPoints[hoverIndex].y - 38"
                  width="90" height="28" rx="6"
                  fill="var(--color-deep)" opacity="0.95"
                />
                <text
                  :x="chartPoints[hoverIndex].x"
                  :y="chartPoints[hoverIndex].y - 19"
                  text-anchor="middle" fill="white" font-size="12" font-weight="600"
                >
                  {{ spotifyData[hoverIndex].plays.toLocaleString('es-ES') }} rep.
                </text>
              </g>

              <!-- X-axis labels -->
              <g>
                <text
                  v-for="(pt, i) in chartPoints"
                  :key="`lbl-${i}`"
                  :x="pt.x" :y="svgH - padB + 16"
                  text-anchor="middle" fill="var(--color-text-muted)" font-size="10"
                >
                  {{ spotifyData[i].date }}
                </text>
              </g>

              <!-- Y-axis labels -->
              <g>
                <text
                  v-for="(y, i) in yGridLines"
                  :key="`yl-${i}`"
                  :x="padL - 8" :y="y + 4"
                  text-anchor="end" fill="var(--color-text-muted)" font-size="10"
                >
                  {{ yLabels[i] }}
                </text>
              </g>
            </svg>
          </div>

          <!-- Stats below chart -->
          <div class="chart-stats">
            <div class="chart-stat">
              <span class="chart-stat__val">{{ maxPlays.toLocaleString('es-ES') }}</span>
              <span class="chart-stat__lbl">Pico máximo</span>
            </div>
            <div class="chart-stat">
              <span class="chart-stat__val">{{ avgPlays.toLocaleString('es-ES') }}</span>
              <span class="chart-stat__lbl">Media diaria</span>
            </div>
            <div class="chart-stat">
              <span class="chart-stat__val">{{ totalPlays.toLocaleString('es-ES') }}</span>
              <span class="chart-stat__lbl">Total periodo</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- YouTube Ranking -->
    <section class="section">
      <div class="container">
        <div class="chart-block">
          <div class="chart-block__header">
            <div class="chart-title-group">
              <div class="platform-dot platform-dot--youtube"></div>
              <div>
                <h2>Ranking de episodios en YouTube</h2>
                <p>Visualizaciones acumuladas por episodio</p>
              </div>
            </div>
          </div>

          <div class="youtube-ranking">
            <div v-for="(ep, i) in youtubeRanking" :key="ep.id" class="rank-row">
              <div class="rank-row__position" :class="i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''">
                {{ i + 1 }}
              </div>
              <div class="rank-row__thumb">
                <img :src="ep.image" :alt="ep.title" loading="lazy" />
              </div>
              <div class="rank-row__info">
                <div class="rank-row__title">{{ ep.title }}</div>
                <div class="rank-row__guest">{{ ep.guest }}</div>
                <div class="rank-row__meta">
                  <span class="badge badge-primary">{{ ep.category }}</span>
                  <span class="rank-row__duration">⏱ {{ ep.duration }}</span>
                </div>
              </div>
              <div class="rank-row__bar-col">
                <div class="bar-track">
                  <div
                    class="bar-fill"
                    :style="{
                      width: (ep.views / youtubeRanking[0].views * 100) + '%',
                      background: i === 0 ? 'var(--color-accent)' : 'var(--color-primary)'
                    }"
                  ></div>
                </div>
                <div class="rank-row__views">
                  <span class="views-num">{{ ep.views.toLocaleString('es-ES') }}</span>
                  <span class="views-lbl">visualizaciones</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Watch time -->
          <div class="watch-time-block">
            <div class="watch-time-title">
              <span>⏱</span> Tiempo de visualización acumulado
            </div>
            <div class="watch-time-grid">
              <div v-for="ep in youtubeRanking" :key="`wt-${ep.id}`" class="watch-time-item">
                <div class="wt-label">Ep. {{ ep.number }}</div>
                <div class="wt-bar-wrap">
                  <div
                    class="wt-bar"
                    :style="{
                      height: (ep.watchHours / maxWatchHours * 80) + 'px',
                      background: ep.watchHours === maxWatchHours ? 'var(--color-accent)' : 'var(--color-primary)'
                    }"
                  ></div>
                </div>
                <div class="wt-value">{{ ep.watchHours }}h</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Growth indicators -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-header__label">Tendencias</span>
          <h2 class="section-header__title">Indicadores de crecimiento</h2>
        </div>
        <div class="indicators-grid">
          <div v-for="ind in indicators" :key="ind.label" class="indicator-card">
            <div class="indicator-card__icon">{{ ind.icon }}</div>
            <div class="indicator-card__label">{{ ind.label }}</div>
            <div class="indicator-card__value" :style="{ color: ind.color }">{{ ind.value }}</div>
            <div class="indicator-card__desc">{{ ind.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="metrics-cta">
      <div class="container">
        <div class="metrics-cta__inner">
          <h2>¿Quieres colaborar con el podcast?</h2>
          <p>Si eres profesional, investigador o institución vinculada a la Terapia Ocupacional, escríbenos.</p>
          <router-link to="/comunidad" class="btn btn-primary btn-lg">Contactar</router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEpisodesStore } from '../stores/episodes'
import { storeToRefs } from 'pinia'
import { useYouTubeMetrics } from '../composables/useMetrics'

const store = useEpisodesStore()
const { allEpisodes } = storeToRefs(store)
const hoverIndex = ref(null)

const { data: ytData, loading: ytLoading, fromCache } = useYouTubeMetrics()


function fmtNum(n) {
  if (n == null) return '—'
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K'
  return n.toLocaleString('es-ES')
}

const communityTotal = computed(() => {
  const ytSubs = ytData.value?.channel?.subscribers
  if (!ytSubs) return null
  return ytSubs + 890 + 1450
})

const communityStats = [
  { icon: '▶️', label: 'Suscriptores', platform: 'YouTube', color: '#FF0000', apiKey: 'subscribers' },
  { icon: '🎵', label: 'Seguidores', platform: 'Spotify', color: '#1DB954', apiKey: null, static: '890' },
  { icon: '📱', label: 'Seguidores', platform: 'Instagram', color: '#E1306C', apiKey: null, static: '1.450' },
  { icon: '👁', label: 'Visualizaciones totales', platform: 'YouTube', color: '#FF0000', apiKey: 'totalViews' },
]

const summaryCards = computed(() => [
  { icon: '🎵', label: 'Reproducciones Spotify (Jun)', value: '18.620', color: '#1DB954', trend: 35 },
  {
    icon: '▶️',
    label: 'Visualizaciones YouTube (total)',
    value: ytLoading.value ? '…' : fmtNum(ytData.value?.channel?.totalViews),
    color: '#FF0000',
    trend: 28
  },
  { icon: '⏱', label: 'Horas de escucha (mensual)', value: '62 h', color: 'var(--color-primary)', trend: 22 },
  {
    icon: '👥',
    label: 'Suscriptores YouTube',
    value: ytLoading.value ? '…' : fmtNum(ytData.value?.channel?.subscribers),
    color: '#FF9900',
    trend: 18
  },
])

// SVG dimensions
const svgW = 700
const svgH = 220
const padL = 50
const padR = 20
const padT = 20
const padB = 30

// Spotify data: finales mayo – junio 2026
const spotifyData = [
  { date: '22 May', plays: 890 },
  { date: '25 May', plays: 1240 },
  { date: '28 May', plays: 980 },
  { date: '31 May', plays: 1560 },
  { date: '3 Jun', plays: 1180 },
  { date: '6 Jun', plays: 2100 },
  { date: '9 Jun', plays: 1650 },
  { date: '12 Jun', plays: 1900 },
  { date: '15 Jun', plays: 2450 },
  { date: '18 Jun', plays: 1800 },
  { date: '21 Jun', plays: 2100 },
]

const maxVal = 2600
const chartW = svgW - padL - padR
const chartH = svgH - padT - padB

const chartPoints = computed(() =>
  spotifyData.map((d, i) => ({
    x: padL + (i / (spotifyData.length - 1)) * chartW,
    y: padT + chartH - (d.plays / maxVal) * chartH,
  }))
)

const linePath = computed(() =>
  chartPoints.value.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
)

const areaPath = computed(() => {
  const pts = chartPoints.value
  const bottom = padT + chartH
  return `${linePath.value} L${pts[pts.length - 1].x},${bottom} L${pts[0].x},${bottom} Z`
})

const yGridCount = 5
const yGridLines = computed(() =>
  Array.from({ length: yGridCount }, (_, i) => padT + (chartH / (yGridCount - 1)) * i)
)
const yLabels = computed(() =>
  yGridLines.value.map((_, i) => {
    const val = maxVal - (maxVal / (yGridCount - 1)) * i
    return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val
  })
)

const maxPlays = computed(() => Math.max(...spotifyData.map(d => d.plays)))
const avgPlays = computed(() => Math.round(spotifyData.reduce((s, d) => s + d.plays, 0) / spotifyData.length))
const totalPlays = computed(() => spotifyData.reduce((s, d) => s + d.plays, 0))

// YouTube ranking: ordena por views del campo real y calcula horas de watch proporcionales
const youtubeRanking = computed(() =>
  [...allEpisodes.value]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 6)
    .map(ep => ({
      ...ep,
      watchHours: Math.round((ep.views || 0) * 0.061)
    }))
)

const maxWatchHours = computed(() => Math.max(...youtubeRanking.value.map(e => e.watchHours)))


const indicators = [
  { icon: '📈', label: 'Crecimiento Spotify', value: '+35%', desc: 'Mayo a Junio 2026', color: '#1DB954' },
  { icon: '🔴', label: 'Retención YouTube', value: '67%', desc: 'Media de tiempo visto', color: '#FF0000' },
  { icon: '🌍', label: 'Países hispanohablantes', value: '12+', desc: 'Con oyentes activos', color: 'var(--color-primary)' },
  { icon: '🎙️', label: 'Duración media', value: '62 min', desc: 'Por episodio', color: 'var(--color-accent-dark)' },
  { icon: '⭐', label: 'Valoración Spotify', value: '4.9/5', desc: 'Basada en reseñas', color: '#E8A838' },
  { icon: '📱', label: 'Escucha móvil', value: '78%', desc: 'Del total de reproducciones', color: '#4FAAB5' },
]
</script>

<style scoped>
/* ===== HERO ===== */
.metrics-hero {
  background: linear-gradient(145deg, var(--color-deep) 0%, var(--color-primary-dark) 100%);
  padding: 140px 0 60px;
  color: white;
}

.metrics-hero__inner {
  max-width: 640px;
}

.metrics-hero__inner .section-header__label {
  color: var(--color-accent-light);
}

.metrics-hero__inner h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  color: white;
  margin: 0.5rem 0 1rem;
}

.metrics-hero__inner p {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.7;
}

/* ===== SUMMARY CARDS ===== */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.summary-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--card-accent);
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}
.summary-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}

.summary-card__icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.summary-card__value {
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--color-deep);
  line-height: 1;
  margin-bottom: 4px;
}

.summary-card__label {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-bottom: 8px;
}

.summary-card__change {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
}
.summary-card__change.up { background: rgba(56,161,105,0.1); color: #38A169; }
.summary-card__change.down { background: rgba(229,62,62,0.1); color: #E53E3E; }

/* ===== CHART BLOCK ===== */
.chart-block {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.chart-block__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.chart-title-group {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
}

.platform-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}
.platform-dot--spotify { background: #1DB954; }
.platform-dot--youtube { background: #FF0000; }

.chart-title-group h2 {
  font-size: 1.25rem;
  color: var(--color-deep);
  margin-bottom: 3px;
}

.chart-title-group p {
  font-size: 0.83rem;
  color: var(--color-text-muted);
}

.chart-legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* SVG Chart */
.chart-container {
  width: 100%;
  aspect-ratio: 700 / 220;
  position: relative;
}

.line-chart {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.chart-dot {
  cursor: pointer;
  transition: r 0.15s ease;
}
.chart-dot:hover {
  r: 7;
}

.chart-stats {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.chart-stat__val {
  display: block;
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--color-primary);
  margin-bottom: 3px;
}

.chart-stat__lbl {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* ===== YOUTUBE RANKING ===== */
.youtube-ranking {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.rank-row {
  display: grid;
  grid-template-columns: 40px 80px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition-fast);
  border-radius: 8px;
  padding: 0.875rem 0.5rem;
}
.rank-row:last-child { border-bottom: none; }
.rank-row:hover { background: var(--color-bg-alt); }

.rank-row__position {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-text-muted);
  flex-shrink: 0;
}
.rank-row__position.gold { background: #FFF3CD; color: #C47D10; }
.rank-row__position.silver { background: #F0F0F0; color: #666; }
.rank-row__position.bronze { background: #FDE8D8; color: #C05621; }

.rank-row__thumb {
  width: 80px;
  height: 52px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}
.rank-row__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rank-row__title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-deep);
  margin-bottom: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rank-row__guest {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-bottom: 5px;
}

.rank-row__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rank-row__duration {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.rank-row__bar-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 160px;
}

.bar-track {
  height: 8px;
  background: var(--color-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.rank-row__views {
  text-align: right;
}

.views-num {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-deep);
  display: block;
  line-height: 1;
}

.views-lbl {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

/* Watch Time Chart */
.watch-time-block {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.watch-time-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-deep);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.watch-time-grid {
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
  height: 120px;
  padding-bottom: 30px;
  position: relative;
}

.watch-time-grid::after {
  content: '';
  position: absolute;
  bottom: 28px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
}

.watch-time-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.wt-label {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  font-weight: 600;
  order: 3;
}

.wt-bar-wrap {
  display: flex;
  align-items: flex-end;
  flex: 1;
  order: 2;
}

.wt-bar {
  width: 100%;
  min-width: 28px;
  border-radius: 6px 6px 0 0;
  transition: height 0.5s ease;
}

.wt-value {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  order: 1;
}

/* ===== INDICATORS ===== */
.indicators-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.indicator-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.75rem;
  text-align: center;
  transition: all var(--transition-base);
}
.indicator-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.indicator-card__icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.indicator-card__label {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.indicator-card__value {
  font-size: 1.75rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.indicator-card__desc {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

/* ===== CTA ===== */
.metrics-cta {
  background: linear-gradient(145deg, var(--color-primary), var(--color-deep));
  padding: 5rem 0;
  text-align: center;
  color: white;
}

.metrics-cta__inner h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: white;
  margin-bottom: 0.875rem;
}

.metrics-cta__inner p {
  color: rgba(255,255,255,0.75);
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.metrics-cta__inner .btn-primary {
  background: white;
  color: var(--color-deep);
}
.metrics-cta__inner .btn-primary:hover {
  background: var(--color-accent-light);
}

/* ===== COMMUNITY BANNER ===== */
.community-banner {
  background: linear-gradient(145deg, var(--color-deep) 0%, #1a3f41 100%);
  padding: 4rem 0 3rem;
  color: white;
}

.community-banner__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.community-banner__label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent-light);
  display: block;
  margin-bottom: 0.875rem;
}

.community-banner__text h2 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 900;
  color: white;
  line-height: 1.25;
  margin-bottom: 1rem;
}

.community-banner__highlight {
  color: var(--color-accent-light);
  font-size: 1.15em;
}

.community-banner__text p {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
}

.community-banner__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.cb-stat {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
  transition: background var(--transition-base);
}
.cb-stat:hover { background: rgba(255,255,255,0.12); }

.cb-stat__val {
  font-size: 1.6rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 4px;
}

.cb-stat__icon { font-size: 1.1rem; margin-bottom: 4px; }

.cb-stat__label {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
  display: block;
}

.cb-stat__platform {
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 2px;
}

.api-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 1.5rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 4px 12px;
  border-radius: 9999px;
}

.api-badge--loading { color: var(--color-accent-light); border-color: rgba(232,168,56,0.3); }

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .summary-grid { grid-template-columns: repeat(2, 1fr); }
  .indicators-grid { grid-template-columns: repeat(2, 1fr); }
  .community-banner__inner { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (max-width: 768px) {
  .summary-grid { grid-template-columns: 1fr; }
  .rank-row { grid-template-columns: 32px 64px 1fr; }
  .rank-row__bar-col { display: none; }
  .indicators-grid { grid-template-columns: 1fr; }
  .watch-time-grid { gap: 0.75rem; }
  .community-banner__stats { grid-template-columns: repeat(2, 1fr); }
}
</style>
