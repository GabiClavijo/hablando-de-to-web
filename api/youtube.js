export default async function handler(req, res) {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const CHANNEL_ID = 'UCjsmsHfseAN5IEVPi-Yg_fA'

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

  if (!API_KEY) {
    return res.status(200).json({ error: 'API_KEY_MISSING', fallback: true })
  }

  try {
    const [channelRes, searchRes] = await Promise.all([
      fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`),
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=viewCount&maxResults=12&key=${API_KEY}`)
    ])

    const [channelData, searchData] = await Promise.all([
      channelRes.json(),
      searchRes.json()
    ])

    if (!channelData.items?.length) {
      return res.status(200).json({ error: 'CHANNEL_NOT_FOUND', fallback: true })
    }

    const ch = channelData.items[0]
    const videoIds = (searchData.items || [])
      .map(i => i.id?.videoId)
      .filter(Boolean)
      .join(',')

    let topVideos = []
    if (videoIds) {
      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`
      )
      const videosData = await videosRes.json()
      topVideos = (videosData.items || [])
        .map(v => ({
          id: v.id,
          title: v.snippet.title,
          thumbnail: v.snippet.thumbnails.maxres?.url
            || v.snippet.thumbnails.high?.url
            || v.snippet.thumbnails.medium?.url,
          views: parseInt(v.statistics.viewCount || 0),
          likes: parseInt(v.statistics.likeCount || 0),
          publishedAt: v.snippet.publishedAt
        }))
        .sort((a, b) => b.views - a.views)
    }

    return res.json({
      channel: {
        name: ch.snippet.title,
        subscribers: parseInt(ch.statistics.subscriberCount || 0),
        totalViews: parseInt(ch.statistics.viewCount || 0),
        videoCount: parseInt(ch.statistics.videoCount || 0),
        thumbnail: ch.snippet.thumbnails?.high?.url
      },
      topVideos,
      updatedAt: new Date().toISOString()
    })
  } catch (err) {
    return res.status(200).json({ error: err.message, fallback: true })
  }
}
