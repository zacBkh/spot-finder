import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../models/user";

// For Mongo Adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

import connectMongo from "../../../utils/connectMongo";

import { compare } from "bcryptjs";
import sendWelcomeEmail from "../../../utils/Mailers/sendWelcomeEmail";
import isUserVerified from "../../../utils/Auth/isUserVerified";
import { whichEnv } from "../../../utils/env-helper";

const currEnv = whichEnv();
// Authentication logic
// Added id because : https://stackoverflow.com/questions/69424685/custom-sign-in-page-not-redirecting-correctly-in-next-auth#:~:text=I%20found%20the%20solution%2C%20but%20I%20think%20the%20documentation%20is%20misleading.
const cred = CredentialsProvider({
  id: "credentials",
  name: "credentials",
  credentials: {
    email: {
      label: "Email",
      type: "text",
      placeholder: "blabla@live.fr",
      type: "email",
    },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials, req) {
    await connectMongo();

    try {
      console.log("credentials --->", credentials);
      // Attempting to find the user
      const userExist = await User.findOne({
        email: credentials.email,
      });
      console.log("userExist !!", userExist);

      if (!userExist) {
        // if user does not exist

        return null;
      } else {
        // if user exists

        const checkPassword = await compare(
          credentials.password,
          userExist.password
        );

        if (credentials.email === userExist.email && checkPassword) {
          // if email and hashed password match --> authenticate
          console.log("11111111");
          return userExist;
        } else {
          // throw new Error('Invalid credentials [password incorrect]');
          console.log("22222222222222");
          return null;
        }
      }
    } catch (error) {
      console.log("Error due to -->", error.message);
    }
  },
});

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    currEnv === "preview" ? cred : cred,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // jwt: {
      //     maxAge: 10,
      // }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 3000,
    // jwt: true,
  },

  // Callbacks replace default next auth parameters
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("AVANT token from JWT", token);
      console.log("AVANT account from JWT", account);
      console.log("AVANT profile from JWT", profile);

      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        // token.accessToken = account.access_token
        // token.id = profile.id
        token.provider = account.provider;
      }
      console.log("token from JWT", token);
      console.log("account from JWT", account);
      console.log("profile from JWT", profile);

      return token;
    },

    //The session callback is called whenever a session is checked.
    async session({ session, token, user }) {
      const isCurrentUserVerified = await isUserVerified(token.sub);

      // Send properties to the client, like an access_token and user id from a provider.
      // Loading session with custom values
      session.accessToken = token.accessToken; // XX
      session.userID = token.sub;
      session.user.provider = token.provider;
      session.user.emailVerified = isCurrentUserVerified.result;
      // session.user.emailVerified = user.emailVerified
      // session.user.id = token.id
      console.log("sess from SESSION", session);
      console.log("token from SESSION", token);
      console.log("user from SESSION", user);

      // When user log in with oAuth, always mark email as verified  + adding provider + adding date
      // + send welcome Email
      if (session.user.provider !== "credentials") {
        await User.findByIdAndUpdate(session.userID, {
          emailVerified: true,
          provider: session.user.provider,
          createdAt: new Date().toISOString(),
        });
      }
      return session;
    },
  },

  // Events allow to perform side effect upon events
  events: {
    signIn: ({ user, account, profile, isNewUser }) => {
      console.log("This function get triggers everytime someone signs in");
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      console.log("isNewUser", isNewUser);
    },

    // Only works when created with oAuth, not creds
    createUser: async ({ user }) => {
      // Sends welcome email to user using oAuth
      const sender = await sendWelcomeEmail(
        "zachariedupain@hotmail.fr",
        user.name
      );
      console.log("sender", sender);
    },
  },

  // Custom login page
  pages: {
    signIn: "/auth/SignIn",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in QS
    // verifyRequest: '/auth/verify-request', // (used for check email message when doing email verification)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// export default NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   ...
// })
