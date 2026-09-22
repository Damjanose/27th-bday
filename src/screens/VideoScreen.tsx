import { content } from "../content.ts"
import { TikTokPlayer } from "../components/TikTokPlayer.tsx"

type VideoScreenProps = {
  onNext: () => void
  onBack: () => void
}

export function VideoScreen({ onNext, onBack }: VideoScreenProps) {
  return (
    <section className="screen">
      <div className="screen-head">
        <button className="btn-ghost" type="button" onClick={onBack}>
          Back
        </button>
      </div>
      <div className="screen-body is-fill">
        <TikTokPlayer
          id={content.tiktok.id}
          title={content.tiktok.title}
          onEnded={onNext}
        />
      </div>
    </section>
  )
}
