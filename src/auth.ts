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
    // TODO: Rename token variable names 
    async jwt({ token, account, user }) {
      if (account) {
        // @ts-ignore
        token.idToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      // Include access token in the session object
      // @ts-ignore
      session.idToken = token.idToken;
      // @ts-ignore
      session.provider = token.provider;
      return session;
    },
    async authorized({ auth }) {
      // Authorize based on whether auth exists
      return !!auth;
    }
  }
})

