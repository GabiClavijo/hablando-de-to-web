import { ref, onMounted } from 'vue'

const CACHE_KEY = 'hablando_to_yt_metrics'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

export function useYouTubeMetrics() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const fromCache = ref(false)

  async function load() {
    loading.value = true
    error.value = null
    fromCache.value = false

    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          data.value = parsed.data
          fromCache.value = true
          loading.value = false
          return
        }
      }
    } catch { /* ignore */ }

    try {
      const res = await fetch('/api/youtube')
      const json = await res.json()

      if (json.fallback || json.error) {
        error.value = json.error || 'API_NOT_CONFIGURED'
        data.value = null
      } else {
        data.value = json
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: json, timestamp: Date.now() }))
        } catch { /* ignore quota */ }
      }
    } catch (err) {
      error.value = err.message
      data.value = null
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { data, loading, error, fromCache, refresh: load }
}
