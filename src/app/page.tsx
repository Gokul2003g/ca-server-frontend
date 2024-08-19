import { SessionProvider, useSession } from "next-auth/react"
import MainContent from "./[main-content]/MainContent"

export default function Home() {

  return (
    <SessionProvider>
      <MainContent />
    </SessionProvider>
  )
}

