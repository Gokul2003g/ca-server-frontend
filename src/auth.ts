import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
  GitHub, Google
]


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.idToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Include access token in the session object
      session.idToken = token.idToken;
      return session;
    },
    async authorized({ auth }) {
      // Authorize based on whether auth exists
      return !!auth;
    }
  }
})


