import { useState } from 'react'
import { Play } from 'lucide-react'
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from '../../utils/youtubeUtils'

export default function YouTubeEmbed({ videoId, title }) {
  const [loaded, setLoaded] = useState(false)
  const [thumbSrc, setThumbSrc] = useState(() => getYouTubeThumbnail(videoId))

  if (!videoId) return null

  if (!loaded) {
    return (
      <button
        onClick={() => setLoaded(true)}
        className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer border-none p-0 group bg-black"
      >
        <img
          src={thumbSrc}
          alt={title || 'Video thumbnail'}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          loading="lazy"
          decoding="async"
          onError={() => {
            const fallback = getYouTubeThumbnail(videoId, 'default')
            if (thumbSrc !== fallback) setThumbSrc(fallback)
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </div>
        </div>
        {title && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <span className="text-white text-sm font-medium">{title}</span>
          </div>
        )}
      </button>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
      <iframe
        src={getYouTubeEmbedUrl(videoId) + '&autoplay=1'}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-none"
        loading="lazy"
      />
    </div>
  )
}
