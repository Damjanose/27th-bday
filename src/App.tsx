import { useCallback, useState } from "react"
import { PhoneShell } from "./components/PhoneShell.tsx"
import { CloseScreen } from "./screens/CloseScreen.tsx"
import { LetterScreen } from "./screens/LetterScreen.tsx"
import { MemoriesScreen } from "./screens/MemoriesScreen.tsx"
import { ReasonsScreen } from "./screens/ReasonsScreen.tsx"
import { VideoScreen } from "./screens/VideoScreen.tsx"
import { WelcomeScreen } from "./screens/WelcomeScreen.tsx"

type Step = "welcome" | "letter" | "reasons" | "memories" | "video" | "close"

export default function App() {
  const [step, setStep] = useState<Step>("welcome")
  const goLetter = useCallback(() => setStep("letter"), [])
  const goReasons = useCallback(() => setStep("reasons"), [])
  const goWelcome = useCallback(() => setStep("welcome"), [])
  const goMemories = useCallback(() => setStep("memories"), [])
  const goVideo = useCallback(() => setStep("video"), [])
  const goClose = useCallback(() => setStep("close"), [])

  return (
    <PhoneShell>
      <div className="stage" key={step}>
        {step === "welcome" ? <WelcomeScreen onNext={goLetter} /> : null}
        {step === "letter" ? (
          <LetterScreen onNext={goReasons} onBack={goWelcome} />
        ) : null}
        {step === "reasons" ? (
          <ReasonsScreen onNext={goMemories} onBack={goLetter} />
        ) : null}
        {step === "memories" ? (
          <MemoriesScreen onNext={goVideo} onBack={goReasons} />
        ) : null}
        {step === "video" ? (
          <VideoScreen onNext={goClose} onBack={goMemories} />
        ) : null}
        {step === "close" ? <CloseScreen onReplay={goWelcome} /> : null}
      </div>
    </PhoneShell>
  )
}
