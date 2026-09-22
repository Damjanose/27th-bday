import { content } from "../content.ts"

type LetterScreenProps = {
  onNext: () => void
  onBack: () => void
}

export function LetterScreen({ onNext, onBack }: LetterScreenProps) {
  return (
    <section className="screen">
      <div className="screen-head">
        <button className="btn-ghost" type="button" onClick={onBack}>
          {content.ui.back}
        </button>
      </div>
      <div className="screen-body">
        {content.letter.map((paragraph) => (
          <p className="letter" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="screen-foot">
        <button className="btn" type="button" onClick={onNext}>
          {content.ui.continue}
        </button>
      </div>
    </section>
  )
}
