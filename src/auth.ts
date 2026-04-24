import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getSupabase } from "@/lib/supabase/admin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;
        const s = getSupabase();
        const { data: user, error } = await s
          .from("User")
          .select("id,email,passwordHash,name")
          .eq("email", String(email))
          .maybeSingle();
        if (error || !user) return null;
        const ok = await compare(String(password), (user as { passwordHash: string }).passwordHash);
        if (!ok) return null;
        const u = user as { id: string; email: string; name: string | null };
        return {
          id: u.id,
          email: u.email,
          name: u.name ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
