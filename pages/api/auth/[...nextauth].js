import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"

import User from "../../../models/user";

// For Mongo Adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

import connectMongo from "../../../utils/connectMongo";


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

        // Added id because : https://stackoverflow.com/questions/69424685/custom-sign-in-page-not-redirecting-correctly-in-next-auth#:~:text=I%20found%20the%20solution%2C%20but%20I%20think%20the%20documentation%20is%20misleading.
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "blabla@live.fr", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                await connectMongo()
                console.log("credentials ", credentials)

                try {

                    // Attempting to find the user
                    const userExist = await User.findOne({ email: credentials.email })

                    if (!userExist) { // if user does not exist
                        throw new Error('No user found with the email');


                    } else { // if user exists
                        console.log("AAAAAAA", credentials)
                        if (credentials.email === userExist.email && credentials.password === userExist.password) {
                            return userExist

                        } else {
                            throw new Error('Invalid Credentials');
                        }
                    }


                } catch (error) {
                    console.log("Error due to -->", error.message)
                }
            }
        })
    ],


    session: {
        strategy: "jwt",
        maxAge: 3000,
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