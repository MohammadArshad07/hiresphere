import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
  trustHost: true,

  providers: [

    GoogleProvider({

      clientId:
        process.env.GOOGLE_CLIENT_ID || "",

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "",

    }),

  ],


  secret:
    process.env.NEXTAUTH_SECRET,


  pages: {

    signIn: "/login",

  },


  callbacks: {

    async jwt({

      token,

      account,

      profile,

      user

    }) {

      if (user) {

        token.role =
          (user as any).role ||
          "jobseeker";
      }


      if (account && profile) {

        token.name = profile.name;

        token.email = profile.email;

        token.picture =
          (profile as any).picture;

        token.role = "jobseeker";
      }


      return token;
    },


    async session({

      session,

      token

    }) {

      if (session.user) {

        session.user.name =
          token.name as string;

        session.user.email =
          token.email as string;

        session.user.image =
          token.picture as string;

        (session.user as any).role =
          token.role;
      }


      return session;
    },


    async redirect({
      url,
      baseUrl
    }) {
      // Keep redirects on the current app origin in production/proxy deployments.
      if (url.startsWith("/")) {
        return url;
      }

      if (url.startsWith(baseUrl)) {
        return url;
      }

      return "/dashboard/seeker";
    },

  },


  session: {

    strategy: "jwt",

  },

});


export {

  handler as GET,

  handler as POST

};