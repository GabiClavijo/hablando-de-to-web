import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Hablando de TO — Podcast y plataforma de Terapia Ocupacional' }
  },
  {
    path: '/podcast',
    name: 'Podcast',
    component: () => import('../views/PodcastView.vue'),
    meta: { title: 'Podcast — Hablando de TO' }
  },
  {
    path: '/podcast/:id',
    name: 'Episode',
    component: () => import('../views/EpisodeView.vue'),
    meta: { title: 'Episodio — Hablando de TO' }
  },
  {
    path: '/invitados',
    name: 'Guests',
    component: () => import('../views/GuestsView.vue'),
    meta: { title: 'Invitados — Hablando de TO' }
  },
  {
    path: '/evidencia',
    name: 'Evidence',
    component: () => import('../views/EvidenceView.vue'),
    meta: { title: 'Evidencia Científica — Hablando de TO' }
  },
  {
    path: '/comunidad',
    name: 'Community',
    component: () => import('../views/CommunityView.vue'),
    meta: { title: 'Comunidad — Hablando de TO' }
  },
  {
    path: '/formacion',
    name: 'Training',
    component: () => import('../views/TrainingView.vue'),
    meta: { title: 'Formación — Hablando de TO' }
  },
  {
    path: '/recursos',
    name: 'Resources',
    component: () => import('../views/ResourcesView.vue'),
    meta: { title: 'Recursos — Hablando de TO' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Hablando de TO'
})

export default router
