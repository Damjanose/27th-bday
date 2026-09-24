type StepPhotoProps = {
  src: string
  alt: string
}

export function StepPhoto({ src, alt }: StepPhotoProps) {
  return (
    <div className="step-photo">
      <img className="step-photo-img" key={src} src={src} alt={alt} />
    </div>
  )
}
