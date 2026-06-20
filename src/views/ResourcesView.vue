<template>
  <div class="resources-view">
    <div class="page-hero">
      <div class="container">
        <span class="section-header__label">Biblioteca de recursos</span>
        <h1>Recursos</h1>
        <p>Guías, infografías, plantillas y material para profesionales y estudiantes de Terapia Ocupacional.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Type filters -->
        <div class="resources-filters">
          <span
            v-for="type in resourceTypes"
            :key="type"
            class="tag"
            :class="{ active: activeType === type }"
            @click="activeType = type"
          >{{ type }}</span>
        </div>

        <div class="resources-grid">
          <div
            v-for="resource in filteredResources"
            :key="resource.id"
            class="resource-card card"
          >
            <div class="resource-card__icon">
              <span>{{ typeIcon(resource.type) }}</span>
            </div>
            <div class="resource-card__body">
              <div class="resource-card__meta">
                <span class="badge badge-accent">{{ resource.type }}</span>
                <span class="resource-format">{{ resource.format }}</span>
              </div>
              <h3>{{ resource.title }}</h3>
              <p>{{ resource.description }}</p>
              <div class="resource-card__tags">
                <span v-for="tag in resource.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <button class="btn btn-primary btn-sm resource-download" @click="requestDownload(resource)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Descargar {{ resource.format }}
              </button>
            </div>
          </div>
        </div>

        <!-- Contribute -->
        <div class="resources-contribute">
          <h3>¿Tienes un recurso que compartir?</h3>
          <p>La comunidad de Hablando de TO crece con las aportaciones de todos. Si tienes guías, infografías o material útil para profesionales, contáctanos.</p>
          <router-link to="/comunidad" class="btn btn-outline">Contribuir a la biblioteca</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { resourceLibrary } from '../data/resources'

const resourceTypes = ['Todos', 'Guía', 'Infografía', 'Plantilla', 'Bibliografía']
const activeType = ref('Todos')

const filteredResources = computed(() =>
  activeType.value === 'Todos'
    ? resourceLibrary
    : resourceLibrary.filter(r => r.type === activeType.value)
)

function typeIcon(type) {
  const icons = { 'Guía': '📋', 'Infografía': '🖼️', 'Plantilla': '📝', 'Bibliografía': '📚' }
  return icons[type] || '📄'
}

function requestDownload(resource) {
  alert(`Recurso "${resource.title}" disponible próximamente.`)
}
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, #744210, #C05621);
  padding: 120px 0 60px;
  color: white;
}
.page-hero h1 { font-size: clamp(2rem, 5vw, 3rem); color: white; margin: var(--spacing-sm) 0; }
.page-hero p { color: rgba(255,255,255,0.75); font-size: 1.1rem; }
.page-hero .section-header__label { color: #FBD38D; }

.resources-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-2xl);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-3xl);
}

.resource-card {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  align-items: flex-start;
}

.resource-card__icon {
  width: 56px;
  height: 56px;
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
}

.resource-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.resource-card__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.resource-format {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.resource-card__body h3 {
  font-size: 1rem;
  color: var(--color-primary-dark);
  line-height: 1.35;
}

.resource-card__body p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.resource-card__tags { display: flex; gap: 6px; flex-wrap: wrap; }
.resource-download { margin-top: var(--spacing-sm); align-self: flex-start; }

.resources-contribute {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  text-align: center;
}
.resources-contribute h3 { color: var(--color-primary-dark); margin-bottom: 8px; }
.resources-contribute p { color: var(--color-text-secondary); margin-bottom: var(--spacing-xl); line-height: 1.6; }

@media (max-width: 768px) {
  .resources-grid { grid-template-columns: 1fr; }
}
</style>
