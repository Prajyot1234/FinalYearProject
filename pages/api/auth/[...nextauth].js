import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirebaseAdapter } from "../../../dependency/firebase-adapter"

import { db } from "../../../firebase"
import * as firestoreFunctions from 'firebase/firestore';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: FirebaseAdapter({
      db: db,
      ...firestoreFunctions,
    }),
})