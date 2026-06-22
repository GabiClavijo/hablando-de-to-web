export default async function handler(req, res) {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const CHANNEL_ID = 'UCjsmsHfseAN5IEVPi-Yg_fA'

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'public, s-maxage=7200, stale-while-revalidate=86400')

  if (!API_KEY) {
    return res.status(200).json({ error: 'API_KEY_MISSING', fallback: true, videos: [] })
  }

  try {
    // Get uploads playlist ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
    )
    const channelData = await channelRes.json()
    if (!channelData.items?.length) {
      return res.status(200).json({ error: 'CHANNEL_NOT_FOUND', fallback: true, videos: [] })
    }

    const uploadsId = channelData.items[0].contentDetails.relatedPlaylists.uploads
    let allItems = []
    let pageToken = ''

    // Paginate through all uploads (50 per page)
    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=50&key=${API_KEY}${pageToken ? '&pageToken=' + pageToken : ''}`
      const pageRes = await fetch(url)
      const pageData = await pageRes.json()

      const ids = (pageData.items || [])
        .filter(i => i.snippet.resourceId.kind === 'youtube#video')
        .map(i => i.snippet.resourceId.videoId)

      // Fetch video details in batch
      if (ids.length) {
        const detailRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${ids.join(',')}&key=${API_KEY}`
        )
        const detailData = await detailRes.json()
        allItems = [...allItems, ...(detailData.items || [])]
      }

      pageToken = pageData.nextPageToken || ''
    } while (pageToken)

    const videos = allItems
      .map(v => ({
        id: v.id,
        title: v.snippet.title,
        thumbnail:
          v.snippet.thumbnails.maxres?.url ||
          v.snippet.thumbnails.high?.url ||
          v.snippet.thumbnails.medium?.url,
        publishedAt: v.snippet.publishedAt,
        publishedLabel: new Date(v.snippet.publishedAt).toLocaleDateString('es-ES', {
          year: 'numeric', month: 'long', day: 'numeric'
        }),
        views: parseInt(v.statistics.viewCount || 0),
        viewsLabel: parseInt(v.statistics.viewCount || 0).toLocaleString('es-ES'),
        likes: parseInt(v.statistics.likeCount || 0),
        duration: parseDuration(v.contentDetails?.duration || ''),
        url: `https://www.youtube.com/watch?v=${v.id}`
      }))
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

    return res.json({ videos, total: videos.length, updatedAt: new Date().toISOString() })
  } catch (err) {
    return res.status(200).json({ error: err.message, fallback: true, videos: [] })
  }
}

function parseDuration(iso) {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return ''
  const h = parseInt(m[1] || 0)
  const min = parseInt(m[2] || 0)
  const s = parseInt(m[3] || 0)
  return h
    ? `${h}:${String(min).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${min}:${String(s).padStart(2, '0')}`
}
