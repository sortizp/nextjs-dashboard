// exports an authConfig object. This object will contain the configuration options for NextAuth.js. For now, it will only contain the pages option:
// This option allows you to specify the URLs for the sign-in and sign-out pages.
// The sign-in page will be the default page for authentication, and the sign-out page will be the default page for logging out.

//import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
        signOut: "/logout",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
        // to check behavior
        console.log('Auth object:', auth);
        console.log('Next URL:', nextUrl);

        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
        },
    },
    providers: [], // Add providers with an empty array for now
}