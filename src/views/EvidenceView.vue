<template>
  <div class="coming-soon-view">
    <div class="coming-soon__inner">
      <div class="coming-soon__icon">🔬</div>
      <span class="coming-soon__label">Próximamente</span>
      <h1>Evidencia Científica</h1>
      <p>Estamos trabajando en esta sección. Pronto encontrarás resúmenes accesibles de investigación científica en Terapia Ocupacional con aplicación clínica práctica.</p>
      <router-link to="/" class="btn btn-primary">Volver al inicio</router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.coming-soon-view {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}
.coming-soon__inner {
  text-align: center;
  max-width: 520px;
  padding: 2rem;
}
.coming-soon__icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.coming-soon__label {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-dark);
  margin-bottom: 0.75rem;
}
h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--color-deep);
  margin-bottom: 1rem;
}
p {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}
</style>
