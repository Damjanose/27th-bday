import { useEffect, useState } from "react"
import { content } from "../content.ts"

type WelcomeScreenProps = {
  onNext: () => void
  onUnlockMusic: () => void
}

export function WelcomeScreen({ onNext, onUnlockMusic }: WelcomeScreenProps) {
  const [opening, setOpening] = useState(false)

  useEffect(() => {
    if (!opening) return

    const timer = window.setTimeout(onNext, 520)
    return () => window.clearTimeout(timer)
  }, [opening, onNext])

  function openEnvelope() {
    if (opening) return

    onUnlockMusic()

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
          aria-label={`Hape këtë, për ${content.herName}`}
        >
          <span className="envelope-flap" aria-hidden="true" />
          <span className="envelope-face">
            <p className="kicker">{content.ui.for}</p>
            <p className="display-name">{content.herName}</p>
            <span className="seal" aria-hidden="true">
              27
            </span>
            <span className="open-hint">{content.ui.openThis}</span>
          </span>
        </button>
      </div>
    </section>
  )
}
