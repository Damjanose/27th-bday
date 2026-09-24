import { content } from "../content.ts"
import { VideoPlayer } from "../components/VideoPlayer.tsx"

type VideoScreenProps = {
  onNext: () => void
  onBack: () => void
}

export function VideoScreen({ onNext, onBack }: VideoScreenProps) {
  return (
    <section className="screen">
      <div className="screen-head">
        <button className="btn-ghost" type="button" onClick={onBack}>
          {content.ui.back}
        </button>
      </div>
      <div className="screen-body is-fill">
        <VideoPlayer title={content.video.title} onEnded={onNext} />
      </div>
    </section>
  )
}
