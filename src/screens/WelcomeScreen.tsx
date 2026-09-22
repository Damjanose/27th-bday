import { useEffect, useState } from "react"
import { content } from "../content.ts"

type WelcomeScreenProps = {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  const [opening, setOpening] = useState(false)

  useEffect(() => {
    if (!opening) return

    const timer = window.setTimeout(onNext, 520)
    return () => window.clearTimeout(timer)
  }, [opening, onNext])

  function openEnvelope() {
    if (opening) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (reduceMotion) {
      onNext()
      return
    }

    setOpening(true)
  }

  return (
    <section className="screen">
      <div className="screen-head" />
      <div className="screen-body">
        <button
          className={opening ? "envelope is-open" : "envelope"}
          type="button"
          onClick={openEnvelope}
          aria-label={`Open this, for ${content.herName}`}
        >
          <span className="envelope-flap" aria-hidden="true" />
          <span className="envelope-face">
            <p className="kicker">For</p>
            <p className="display-name">{content.herName}</p>
            <span className="seal" aria-hidden="true">
              27
            </span>
            <span className="open-hint">Open this</span>
          </span>
        </button>
      </div>
    </section>
  )
}
