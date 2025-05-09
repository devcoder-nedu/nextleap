import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {AUTHOR_BY_GITHUB_ID_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";

// @ts-ignore
export const {handlers, signIn, signOut, auth,} = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({
                         user,
                         profile,
                     }) {
            try {
                if (!profile) return false;

                const existingUser = await client
                    .withConfig({useCdn: false})
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                        id: profile.id,
                    });

                if (!existingUser) {
                    await writeClient.create({
                        _type: "author",
                        id: profile.id,
                        name: user.name,
                        username: profile.login,
                        email: user.email,
                        image: user.image,
                        bio: profile.bio || "",
                    });
                }

                return true;
            } catch (err) {
                console.error("signIn error:", err);
                return false;
            }
        },

        async jwt(context) {
            const {token, account, profile} = context
            try {
                if (account && profile) {
                    const user = await client.withConfig({useCdn: false}).fetch(
                        AUTHOR_BY_GITHUB_ID_QUERY,
                        {id: profile.id}
                    );

                    if (user) {
                        token.id = user._id;
                    }
                }
                return token;
            } catch (err) {
                console.error("JWT error:", err);
                return token;
            }
        },

        async session({token, session}) {
            if (token?.id) {
                session.id = token.id;
            }
            return session;
        },
    },
});