"use client"
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <Button onClick={() => signIn("google", { callbackUrl: "/" })} >
        SignIn with Google
      </Button>
      <Button onClick={() => signIn("github", { callbackUrl: "/" })}>
        SignIn with Github
      </Button>
    </div >
  )
}
