import { useState } from "react"
import { PhoneShell } from "./components/PhoneShell.tsx"
import { CloseScreen } from "./screens/CloseScreen.tsx"
import { LetterScreen } from "./screens/LetterScreen.tsx"
import { ReasonsScreen } from "./screens/ReasonsScreen.tsx"
import { VideoScreen } from "./screens/VideoScreen.tsx"
import { WelcomeScreen } from "./screens/WelcomeScreen.tsx"

type Step = "welcome" | "letter" | "reasons" | "video" | "close"

export default function App() {
  const [step, setStep] = useState<Step>("welcome")

  return (
    <PhoneShell>
      <div className="stage" key={step}>
        {step === "welcome" ? (
          <WelcomeScreen onNext={() => setStep("letter")} />
        ) : null}
        {step === "letter" ? (
          <LetterScreen
            onNext={() => setStep("reasons")}
            onBack={() => setStep("welcome")}
          />
        ) : null}
        {step === "reasons" ? (
          <ReasonsScreen
            onNext={() => setStep("video")}
            onBack={() => setStep("letter")}
          />
        ) : null}
        {step === "video" ? (
          <VideoScreen
            onNext={() => setStep("close")}
            onBack={() => setStep("reasons")}
          />
        ) : null}
        {step === "close" ? (
          <CloseScreen onReplay={() => setStep("welcome")} />
        ) : null}
      </div>
    </PhoneShell>
  )
}
