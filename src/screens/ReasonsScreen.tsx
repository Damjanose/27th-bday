import { useState } from "react"
import { content } from "../content.ts"

type ReasonsScreenProps = {
  onNext: () => void
  onBack: () => void
}

export function ReasonsScreen({ onNext, onBack }: ReasonsScreenProps) {
  const [index, setIndex] = useState(0)
  const last = index === content.reasons.length - 1

  function goNext() {
    if (last) {
      onNext()
      return
    }
    setIndex((current) => current + 1)
  }

  function goBack() {
    if (index === 0) {
      onBack()
      return
    }
    setIndex((current) => current - 1)
  }

  return (
    <section className="screen">
      <div className="screen-head">
        <button className="btn-ghost" type="button" onClick={goBack}>
          Back
        </button>
      </div>
      <div className="screen-body">
        <p className="beat">{content.reasons[index]}</p>
        <div className="dots" aria-hidden="true">
          {content.reasons.map((reason, i) => (
            <span
              className={i === index ? "dot is-on" : "dot"}
              key={reason}
            />
          ))}
        </div>
      </div>
      <div className="screen-foot">
        <button className="btn" type="button" onClick={goNext}>
          {last ? "Continue" : "Next"}
        </button>
      </div>
    </section>
  )
}
