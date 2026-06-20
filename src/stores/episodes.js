import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { episodes, categories, formats } from '../data/episodes'

export const useEpisodesStore = defineStore('episodes', () => {
  const allEpisodes = ref(episodes)
  const activeCategory = ref('Todos')
  const activeFormat = ref('Todos')
  const searchQuery = ref('')

  const filteredEpisodes = computed(() => {
    return allEpisodes.value.filter(ep => {
      const matchesCategory = activeCategory.value === 'Todos' || ep.category === activeCategory.value
      const matchesFormat = activeFormat.value === 'Todos' || ep.format === activeFormat.value
      const matchesSearch = !searchQuery.value ||
        ep.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        ep.guest.toLowerCase().includes(searchQuery.value.toLowerCase())
      return matchesCategory && matchesFormat && matchesSearch
    })
  })

  const featuredEpisodes = computed(() => allEpisodes.value.filter(ep => ep.featured))
  const latestEpisode = computed(() => allEpisodes.value[allEpisodes.value.length - 1])

  function getEpisodeById(id) {
    return allEpisodes.value.find(ep => ep.id === Number(id))
  }

  return {
    allEpisodes, activeCategory, activeFormat, searchQuery,
    filteredEpisodes, featuredEpisodes, latestEpisode,
    getEpisodeById, categories, formats
  }
})
