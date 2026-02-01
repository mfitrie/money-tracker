import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Username and password required");
                }

                try {
                    // Call your Go API
                    const BASE_URL = process.env.API_URL;
                    const res = await fetch(`${BASE_URL}/backend-api/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: credentials.username,
                            password: credentials.password,
                        }),
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(data.error || "Invalid credentials");
                    }

                    // Return user object with token
                    return {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        username: data.user.username,
                        accessToken: data.access_token,
                    };
                } catch (error) {
                    console.error("Login error:", error);
                    throw new Error("Authentication failed");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Initial sign in
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            session.user.id = token.id as string;
            session.user.username = token.username as string;
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};