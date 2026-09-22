import { useEffect, useRef, useState } from "react"
import { content } from "../content.ts"

type TikTokPlayerProps = {
  id: string
  title: string
  onEnded: () => void
}

type PlayerMessage = {
  "x-tiktok-player"?: boolean
  type?: string
  value?: unknown
}

const PLAYER_PARAMS = [
  "autoplay=1",
  "loop=0",
  "controls=0",
  "play_button=0",
  "progress_bar=0",
  "volume_control=0",
  "fullscreen_button=0",
  "timestamp=0",
  "music_info=0",
  "description=0",
].join("&")

function sendToPlayer(
  frame: HTMLIFrameElement | null,
  type: string,
  value?: unknown,
) {
  frame?.contentWindow?.postMessage(
    { type, value, "x-tiktok-player": true },
    "*",
  )
}

export function TikTokPlayer({ id, title, onEnded }: TikTokPlayerProps) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const endedRef = useRef(false)
  const [failed, setFailed] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)
  const src = `https://www.tiktok.com/player/v1/${id}?${PLAYER_PARAMS}`

  useEffect(() => {
    const autoplayWait = window.setTimeout(() => {
      if (!endedRef.current) setNeedsTap(true)
    }, 2500)

    function finish() {
      if (endedRef.current) return
      endedRef.current = true
      onEnded()
    }

    function onMessage(event: MessageEvent<PlayerMessage>) {
      const data = event.data
      if (!data || typeof data !== "object") return
      if (!data["x-tiktok-player"]) return

      if (data.type === "onPlayerError") {
        const code = Number(data.value)
        if (code >= 1100 && code < 1200) {
          setNeedsTap(true)
          return
        }
        setFailed(true)
        return
      }

      const time = Number(data.value)
      const isTime =
        data.type === "onTimeUpdate" ||
        data.type === "currentTime" ||
        data.type === "timeupdate" ||
        data.type === "onCurrentTime"

      if (isTime && Number.isFinite(time) && time > 0.2) {
        window.clearTimeout(autoplayWait)
        setNeedsTap(false)
      }

      if (isTime && Number.isFinite(time) && time >= 16.5) {
        finish()
      }

      if (
        data.type === "ended" ||
        data.type === "onEnded" ||
        (data.type === "onStateChange" && data.value === "ended")
      ) {
        finish()
      }
    }

    window.addEventListener("message", onMessage)
    return () => {
      window.clearTimeout(autoplayWait)
      window.removeEventListener("message", onMessage)
    }
  }, [onEnded])

  function playNow() {
    sendToPlayer(frameRef.current, "play")
    sendToPlayer(frameRef.current, "unMute")
    setNeedsTap(false)
  }

  if (failed) {
    return (
      <div className="tiktok">
        <p className="tiktok-fallback-text">{content.ui.videoFailed}</p>
      </div>
    )
  }

  return (
    <div className="tiktok">
      <div className="tiktok-frame-wrap">
        <iframe
          ref={frameRef}
          className="tiktok-frame"
          src={src}
          allow="autoplay; fullscreen"
          title={title}
          onLoad={() => {
            sendToPlayer(frameRef.current, "play")
            sendToPlayer(frameRef.current, "unMute")
          }}
        />
        {needsTap ? (
          <button className="tiktok-play" type="button" onClick={playNow}>
            {content.ui.play}
          </button>
        ) : null}
      </div>
    </div>
  )
}
