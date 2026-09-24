import { useEffect, useRef, useState } from "react"
import { content } from "../content.ts"
import videoSrc from "../../assets/video.mp4"

type VideoPlayerProps = {
  title: string
  onEnded: () => void
}

export function VideoPlayer({ title, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const endedRef = useRef(false)
  const [failed, setFailed] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)

  function finish() {
    if (endedRef.current) return
    endedRef.current = true
    setNeedsTap(false)
    onEnded()
  }

  async function startLoud() {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    try {
      await video.play()
      setNeedsTap(false)
    } catch {
      setNeedsTap(true)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    endedRef.current = false
    let cancelled = false

    async function tryAutoplay() {
      if (!video || cancelled) return
      video.muted = true
      try {
        await video.play()
        if (cancelled) return
        video.muted = false
        setNeedsTap(false)
      } catch {
        if (!cancelled) setNeedsTap(true)
      }
    }

    void tryAutoplay()

    return () => {
      cancelled = true
      video.pause()
    }
  }, [onEnded])

  if (failed) {
    return (
      <div className="video-player">
        <p className="video-fallback-text">{content.ui.videoFailed}</p>
      </div>
    )
  }

  return (
    <div className="video-player">
      <div className="video-frame-wrap">
        <video
          ref={videoRef}
          className="video-frame"
          src={videoSrc}
          title={title}
          playsInline
          preload="auto"
          controls={false}
          onEnded={finish}
          onPlaying={() => setNeedsTap(false)}
          onError={() => setFailed(true)}
        />
        {needsTap ? (
          <button className="video-play" type="button" onClick={() => void startLoud()}>
            {content.ui.play}
          </button>
        ) : null}
      </div>
    </div>
  )
}
