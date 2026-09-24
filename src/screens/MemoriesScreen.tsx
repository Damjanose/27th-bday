import { useState } from "react"
import { content } from "../content.ts"

type MemoriesScreenProps = {
  onNext: () => void
  onBack: () => void
}

export function MemoriesScreen({ onNext, onBack }: MemoriesScreenProps) {
  const [index, setIndex] = useState(0)
  const last = index === content.memories.length - 1
  const memory = content.memories[index]

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
    <section className="screen screen-photo">
      <div className="screen-head">
        <button className="btn-ghost" type="button" onClick={goBack}>
          {content.ui.back}
        </button>
      </div>
      <div className="screen-body is-fill">
        <div className="step-photo">
          <img
            className="step-photo-img"
            key={memory.src}
            src={memory.src}
            alt={memory.caption || content.ui.memoriesTitle}
          />
        </div>
        <div className="step-panel">
          <p className="kicker">{content.ui.memoriesTitle}</p>
          {memory.caption ? (
            <p className="memory-caption">{memory.caption}</p>
          ) : null}
          <div className="dots" aria-hidden="true">
            {content.memories.map((item) => (
              <span
                className={item.src === memory.src ? "dot is-on" : "dot"}
                key={item.src}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="screen-foot">
        <button className="btn" type="button" onClick={goNext}>
          {last ? content.ui.continue : content.ui.next}
        </button>
      </div>
    </section>
  )
}
