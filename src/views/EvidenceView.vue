<template>
  <div class="evidence-view">
    <div class="page-hero">
      <div class="container">
        <span class="section-header__label">TO Basada en Evidencia</span>
        <h1>Evidencia Científica</h1>
        <p>Resúmenes accesibles de investigación científica en Terapia Ocupacional con aplicación clínica práctica.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Category filters -->
        <div class="evidence-filters">
          <span
            v-for="cat in evidenceCategories"
            :key="cat"
            class="tag"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >{{ cat }}</span>
        </div>

        <!-- Grid -->
        <div class="evidence-grid">
          <div
            v-for="article in filteredArticles"
            :key="article.id"
            class="evidence-card card"
          >
            <div class="evidence-card__img">
              <img :src="article.image" :alt="article.title" />
              <span class="evidence-card__cat badge badge-primary">{{ article.category }}</span>
            </div>
            <div class="evidence-card__body">
              <h3>{{ article.title }}</h3>
              <p class="evidence-card__ref">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                {{ article.reference }}
              </p>
              <p class="evidence-card__summary">{{ article.summary }}</p>

              <div class="evidence-card__application">
                <h4>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Aplicación clínica
                </h4>
                <p>{{ article.clinicalApplication }}</p>
              </div>

              <div class="evidence-card__footer">
                <div class="ev-tags">
                  <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <div v-if="article.relatedEpisodes.length" class="ev-episodes">
                  <span class="ev-label">Episodios:</span>
                  <router-link
                    v-for="epId in article.relatedEpisodes"
                    :key="epId"
                    :to="`/podcast/${epId}`"
                    class="btn btn-ghost btn-sm"
                  >Ep. {{ epId }}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="evidence-cta section--alt section">
      <div class="container--narrow" style="text-align:center">
        <h2>¿Conoces un artículo relevante?</h2>
        <p>Ayúdanos a ampliar nuestra base de evidencia científica. Comparte referencias que puedan ser útiles para la comunidad.</p>
        <router-link to="/comunidad" class="btn btn-primary btn-lg" style="margin-top:var(--spacing-xl)">
          Sugerir referencia
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { evidenceArticles } from '../data/resources'

const evidenceCategories = ['Todos', 'Daño cerebral adquirido', 'Envejecimiento', 'Salud mental', 'Pediatría', 'Discapacidad', 'Investigación']
const activeCategory = ref('Todos')

const filteredArticles = computed(() =>
  activeCategory.value === 'Todos'
    ? evidenceArticles
    : evidenceArticles.filter(a => a.category === activeCategory.value)
)
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, #1A365D, #0A3D62);
  padding: 120px 0 60px;
  color: white;
}
.page-hero h1 { font-size: clamp(2rem, 5vw, 3rem); color: white; margin: var(--spacing-sm) 0; }
.page-hero p { color: rgba(255,255,255,0.75); font-size: 1.1rem; max-width: 600px; }
.page-hero .section-header__label { color: var(--color-accent-light); }

.evidence-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-2xl);
}

.evidence-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
}

.evidence-card__img {
  position: relative;
  aspect-ratio: 16/7;
  overflow: hidden;
}
.evidence-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.evidence-card__cat {
  position: absolute;
  top: 12px;
  left: 12px;
}

.evidence-card__body {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.evidence-card__body h3 {
  font-size: 1.1rem;
  color: var(--color-primary-dark);
  line-height: 1.35;
}

.evidence-card__ref {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  font-style: italic;
  line-height: 1.5;
}

.evidence-card__summary {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.evidence-card__application {
  background: rgba(56,161,105,0.08);
  border-left: 3px solid var(--color-success);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: var(--spacing-md);
}

.evidence-card__application h4 {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--color-success);
  margin-bottom: 6px;
  font-weight: 700;
}

.evidence-card__application p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.evidence-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.ev-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.ev-episodes { display: flex; align-items: center; gap: 4px; }
.ev-label { font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; }

.evidence-cta { text-align: center; }
.evidence-cta h2 { color: var(--color-primary-dark); margin-bottom: var(--spacing-md); }
.evidence-cta p { color: var(--color-text-secondary); line-height: 1.7; }

@media (max-width: 768px) {
  .evidence-grid { grid-template-columns: 1fr; }
}
</style>
