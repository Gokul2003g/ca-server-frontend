import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
  GitHub, Google
]


export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
  providers,
  pages: {
    signIn: "/signin",
  },
})

