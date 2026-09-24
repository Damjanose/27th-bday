import { StepPhoto } from "../components/StepPhoto.tsx"
import { content } from "../content.ts"

type CloseScreenProps = {
  onReplay: () => void
}

export function CloseScreen({ onReplay }: CloseScreenProps) {
  return (
    <section className="screen screen-photo">
      <div className="screen-head" />
      <div className="screen-body is-fill">
        <StepPhoto src={content.stepPhotos.close} alt={content.herName} />
        <div className="step-panel">
          {content.closeLines.map((line) => (
            <p className="close-line" key={line}>
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className="screen-foot">
        <button className="btn" type="button" onClick={onReplay}>
          {content.ui.replay}
        </button>
      </div>
    </section>
  )
}
