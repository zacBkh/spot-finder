import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"


// For Mongo Adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"


export const authOptions = {
    // Configure one or more authentication providers
    providers: [


        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // jwt: {
            //     maxAge: 10,
            // }
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),

        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),

        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "blabla@live.fr", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                console.log("credentials ", credentials)

                // Add logic here to look up the user from the credentials supplied
                if (credentials.email === "j@l.fr" && credentials.password === "test") {
                    console.log("CREDS OK <<<<")
                    return {
                        id: 2,
                        name: "John",
                        email: "johndoe@gmail.com"
                    }
                } else {
                    console.log("NOT GOOD")
                    return null
                } // if login failed
            }
        })
    ],


    session: {
        strategy: "jwt",
        // maxAge: 3000,
        // jwt: true,
    },

    callbacks: {
        // jwt: async ({ token, user }) => { if (user) { token.id = user.id } return token },
        //The session callback is called whenever a session is checked.
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            console.log("sess from here", session)
            session.accessToken = token.accessToken
            session.user.id = token.id
            return session
        }


        // secret: "test",
        // jwt: { encrytion: true },





    },



    adapter: MongoDBAdapter(clientPromise),
    // adapter: MongoDBAdapter(connectMongo),




}

export default NextAuth(authOptions)



// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// export default NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   ...
// })