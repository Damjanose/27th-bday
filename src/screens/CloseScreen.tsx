import { content } from "../content.ts"

type CloseScreenProps = {
  onReplay: () => void
}

export function CloseScreen({ onReplay }: CloseScreenProps) {
  return (
    <section className="screen">
      <div className="screen-head" />
      <div className="screen-body">
        {content.closeLines.map((line) => (
          <p className="close-line" key={line}>
            {line}
          </p>
        ))}
      </div>
      <div className="screen-foot">
        <button className="btn" type="button" onClick={onReplay}>
          {content.ui.replay}
        </button>
      </div>
    </section>
  )
}
