import { useEffect, useRef } from "react"
import { content } from "../content.ts"

type BackgroundMusicProps = {
  active: boolean
  unlocked: boolean
}

type YtPlayer = {
  playVideo: () => void
  pauseVideo: () => void
  destroy: () => void
}

type YtNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      height: string
      width: string
      videoId: string
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: (event: { target: YtPlayer }) => void
        onStateChange?: (event: { data: number; target: YtPlayer }) => void
      }
    },
  ) => YtPlayer
  PlayerState: { ENDED: number }
}

declare global {
  interface Window {
    YT?: YtNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

const SCRIPT_ID = "youtube-iframe-api"
const ENDED = 0

function loadYoutubeApi(): Promise<YtNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT)

  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      if (window.YT) resolve(window.YT)
    }

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script")
      script.id = SCRIPT_ID
      script.src = "https://www.youtube.com/iframe_api"
      document.head.appendChild(script)
    }
  })
}

export function BackgroundMusic({ active, unlocked }: BackgroundMusicProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YtPlayer | null>(null)
  const activeRef = useRef(active)
  const unlockedRef = useRef(unlocked)

  activeRef.current = active
  unlockedRef.current = unlocked

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let cancelled = false
    const mount = document.createElement("div")
    host.appendChild(mount)

    void loadYoutubeApi().then((YT) => {
      if (cancelled) return

      playerRef.current = new YT.Player(mount, {
        height: "1",
        width: "1",
        videoId: content.bgMusic.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          // Required for loop=1 to work on a single video.
          playlist: content.bgMusic.youtubeId,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return
            if (unlockedRef.current && activeRef.current) {
              event.target.playVideo()
            }
          },
          onStateChange: (event) => {
            if (event.data === ENDED && activeRef.current && unlockedRef.current) {
              event.target.playVideo()
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      playerRef.current?.destroy()
      playerRef.current = null
      mount.remove()
    }
  }, [])

  useEffect(() => {
    const player = playerRef.current
    if (!player) return

    if (unlocked && active) {
      player.playVideo()
    } else {
      player.pauseVideo()
    }
  }, [active, unlocked])

  return (
    <div
      ref={hostRef}
      className="bg-music"
      aria-hidden="true"
      title={content.bgMusic.title}
    />
  )
}
