import { useCallback, useState } from "react"
import { BackgroundMusic } from "./components/BackgroundMusic.tsx"
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
  const [musicUnlocked, setMusicUnlocked] = useState(false)
  const [onLastMemory, setOnLastMemory] = useState(false)

  const goLetter = useCallback(() => setStep("letter"), [])
  const goReasons = useCallback(() => setStep("reasons"), [])
  const goMemories = useCallback(() => {
    setOnLastMemory(false)
    setStep("memories")
  }, [])
  const goVideo = useCallback(() => setStep("video"), [])
  const goClose = useCallback(() => setStep("close"), [])
  const goWelcome = useCallback(() => {
    setMusicUnlocked(false)
    setOnLastMemory(false)
    setStep("welcome")
  }, [])
  const unlockMusic = useCallback(() => setMusicUnlocked(true), [])

  // Middle of the gift only: after Hape through letter/reasons/memories,
  // stopped on the last memory photo (and off for video/close).
  const musicActive =
    musicUnlocked &&
    step !== "video" &&
    step !== "close" &&
    !onLastMemory

  return (
    <>
      <BackgroundMusic active={musicActive} unlocked={musicUnlocked} />
      <PhoneShell>
        <div className="stage" key={step}>
          {step === "welcome" ? (
            <WelcomeScreen onNext={goLetter} onUnlockMusic={unlockMusic} />
          ) : null}
          {step === "letter" ? (
            <LetterScreen onNext={goReasons} onBack={goWelcome} />
          ) : null}
          {step === "reasons" ? (
            <ReasonsScreen onNext={goMemories} onBack={goLetter} />
          ) : null}
          {step === "memories" ? (
            <MemoriesScreen
              onNext={goVideo}
              onBack={goReasons}
              onLastImageChange={setOnLastMemory}
            />
          ) : null}
          {step === "video" ? (
            <VideoScreen onNext={goClose} onBack={goMemories} />
          ) : null}
          {step === "close" ? <CloseScreen onReplay={goWelcome} /> : null}
        </div>
      </PhoneShell>
    </>
  )
}
