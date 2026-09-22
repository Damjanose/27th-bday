import { useEffect, useState } from "react"

type TikTokPlayerProps = {
  id: string
  shortUrl: string
  title: string
}

type PlayerMessage = {
  "x-tiktok-player"?: boolean
  type?: string
}

export function TikTokPlayer({ id, shortUrl, title }: TikTokPlayerProps) {
  const [failed, setFailed] = useState(false)
  const src = `https://www.tiktok.com/player/v1/${id}?autoplay=0&loop=0&music_info=0&description=0`

  useEffect(() => {
    function onMessage(event: MessageEvent<PlayerMessage>) {
      const data = event.data
      if (!data || typeof data !== "object") return
      if (data["x-tiktok-player"] && data.type === "onPlayerError") {
        setFailed(true)
      }
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return (
    <div className="tiktok">
      <div className="tiktok-frame-wrap">
        {failed ? (
          <a
            className="tiktok-fallback"
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
          >
            The video could not load here.
            <span>Open on TikTok</span>
          </a>
        ) : (
          <iframe
            className="tiktok-frame"
            src={src}
            allow="fullscreen"
            title={title}
          />
        )}
      </div>
      <a
        className="tiktok-link"
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open on TikTok
      </a>
    </div>
  )
}
