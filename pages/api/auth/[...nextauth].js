import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

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
        })
    ],

    adapter: MongoDBAdapter(clientPromise),
    // adapter: MongoDBAdapter(connectMongo),


    // callbacks: {
    //     async session({ session, token, user }) {
    //         // Send properties to the client, like an access_token and user id from a provider.
    //         session.accessToken = token.accessToken
    //         session.user.id = token.id

    //         return session
    //     }
    // }




}

export default NextAuth(authOptions)



// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// export default NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   ...
// })