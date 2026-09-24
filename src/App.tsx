import { useCallback, useEffect, useState } from "react"
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

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7860/ingest/2685b959-c7c3-49e7-97cf-98dd5bd2e467',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f29b5b'},body:JSON.stringify({sessionId:'f29b5b',runId:'post-fix',hypothesisId:'C',location:'App.tsx:stepEffect',message:'app step changed',data:{step},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, [step])

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
