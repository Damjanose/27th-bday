import { content } from "../content.ts"

type CloseScreenProps = {
  onReplay: () => void
}

export function CloseScreen({ onReplay }: CloseScreenProps) {
  return (
    <section className="screen">
      <div className="screen-head" />
      <div className="screen-body">
        <p className="close-line">{content.closeLine}</p>
        <p className="close-line">
          {content.closeWish} {content.herName}.
        </p>
      </div>
      <div className="screen-foot">
        <button className="btn" type="button" onClick={onReplay}>
          Replay
        </button>
      </div>
    </section>
  )
}
