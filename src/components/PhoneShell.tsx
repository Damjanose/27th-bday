import type { ReactNode } from "react"

type PhoneShellProps = {
  children: ReactNode
}

export function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div className="room">
      <div className="phone">{children}</div>
    </div>
  )
}
