import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

import User from '../../../models/user'

// For Mongo Adapter
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'

import connectMongo from '../../../utils/connect-to-mongo'

import { compare } from 'bcryptjs'
import sendWelcomeEmail from '../../../services/emailers-srv/welcome-email'
import sessionDataLoader from '../../../services/data-loader-session'
import { whichEnv } from '../../../utils/env-helper'

const currEnv = whichEnv()
// Authentication logic
// Added id because : https://stackoverflow.com/questions/69424685/custom-sign-in-page-not-redirecting-correctly-in-next-auth#:~:text=I%20found%20the%20solution%2C%20but%20I%20think%20the%20documentation%20is%20misleading.
const cred = CredentialsProvider({
    id: 'credentials',
    name: 'credentials',
    credentials: {
        email: {
            label: 'Email',
            type: 'text',
            type: 'email',
        },
        password: { label: 'Password', type: 'password' },
    },

    async authorize(credentials, req) {
        await connectMongo()

        try {
            // Attempting to find the user
            const userExist = await User.findOne({
                email: credentials.email,
            })

            if (!userExist) {
                // if user does not exist
                return null
            } else {
                // if user exists
                const checkPassword = await compare(
                    credentials.password,
                    userExist.password,
                )

                if (
                    credentials.email.toLowerCase() === userExist.email &&
                    checkPassword
                ) {
                    // if email and hashed password match --> authenticate
                    return userExist
                } else {
                    // throw new Error('Invalid credentials [password incorrect]');
                    return null
                }
            }
        } catch (error) {
            console.log('Error due to -->', error.message)
        }
    },
})

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        currEnv === 'preview' ? cred : cred,
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
    ],

    session: {
        strategy: 'jwt',
        maxAge: 3000,
    },

    // Callbacks replace default next auth parameters
    callbacks: {
        async jwt({ token, account, profile, isNewUser }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                // need to do this since otherwise, as jwt is called multiple times, second attempt will erase
                token.provider = account.provider
                token.isNewUser = isNewUser
            }
            return token
        },

        //The session callback is called whenever a session is checked.
        async session({ session, token, user }) {
            const dataLoader = await sessionDataLoader(token.sub)

            // Send properties to the client, like an access_token and user id from a provider.
            // Loading session with custom values
            session.user.emailVerified = dataLoader.result.emailVerified
            session.user.image = dataLoader.result.profilePic

            session.userID = token.sub
            session.user.provider = token.provider
            session.isNewUser = token.isNewUser
            // session.user.emailVerified = user.emailVerified
            // session.user.id = token.id
            console.log('Session loaded -->', session)
            return session
        },
    },

    // Events allow to perform side effect upon events
    // Only works when created with oAuth, not creds
    events: {
        // Adding provider info in database for oAuth clients
        signIn: async ({ user, account, isNewUser }) => {
            if (!isNewUser) {
                return
            }

            const { provider } = account
            const addProviderInfo = await User.findByIdAndUpdate(
                user.id,
                {
                    emailVerified: true,
                    createdAtOAuth: new Date().toISOString(),
                    spotsOwned: [],
                    profilePic: { isCustom: true, link: user.image },
                    provider: 'oAuth',
                    providerName: provider,
                },
                { new: true },
            )

            const sender = await sendWelcomeEmail(user.email, user.name)
        },

        // createUser: async ({ user }) => {}, // for action only on usercreation
    },

    // Custom login page
    pages: {
        signIn: '/auth/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in QS
        // verifyRequest: '/auth/verify-request', // (used for check email message when doing email verification)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },

    adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions)

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// export default NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   ...
// })
