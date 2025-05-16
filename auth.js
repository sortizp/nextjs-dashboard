import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { getUser } from '@/app/lib/data'; // Adjust the import path as necessary
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';


// Initialize the PostgreSQL connection - not needed for Vercel
//const customSql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

// Function to fetch a user by email


// Export NextAuth configuration
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {

        console.log('Credentials received:', credentials);

        // Validate credentials using Zod
        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log('User fetched:', user);

          if (!user) {
            console.log("No user found with this email.");
            return null;
          }

          // Verify the password using bcrypt
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log('Passwords match:', passwordsMatch);
          if (passwordsMatch) {
            // Return the user object if authentication is successful
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        }
      
        // Return null if credentials are invalid
        console.log("Invalid credentials:", parsedCredentials.error);
        return null;
      }
    }),
  ],
});