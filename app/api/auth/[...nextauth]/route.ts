import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// ADD export in front of const when running locally.
// having export in front of const when building doesnt work.
const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

// ADD export in front of const when running locally.
// having export in front of const when building doesnt work.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
