import { ref, onMounted } from 'vue'

const CACHE_KEY = 'hablando_to_all_videos'
const CACHE_TTL = 2 * 60 * 60 * 1000 // 2 hours

export function useAllVideos() {
  const videos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const fromApi = ref(false)

  async function load() {
    loading.value = true
    error.value = null

    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < CACHE_TTL && parsed.videos?.length) {
          videos.value = parsed.videos
          fromApi.value = true
          loading.value = false
          return
        }
      }
    } catch { /* ignore */ }

    try {
      const res = await fetch('/api/youtube-videos')
      const json = await res.json()

      if (!json.fallback && json.videos?.length) {
        videos.value = json.videos
        fromApi.value = true
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ videos: json.videos, timestamp: Date.now() }))
        } catch { /* quota */ }
      } else {
        error.value = json.error || 'API_NOT_CONFIGURED'
        fromApi.value = false
      }
    } catch (err) {
      error.value = err.message
      fromApi.value = false
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { videos, loading, error, fromApi, refresh: load }
}
