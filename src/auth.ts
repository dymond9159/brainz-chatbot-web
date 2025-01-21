import { z } from 'zod';

import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import authModule from './modules/auth';

import { NextAuthOptions, User } from 'next-auth';
import { UserCreateParams } from './types';

export const authOptions: NextAuthOptions = {
  theme: {
    logo: '/public/logo.png',
  },
  session: {
    strategy: 'jwt', // Using JWT for stateless authentication
  },
  providers: [
    // Facebook Provider
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID || '',
      clientSecret: process.env.AUTH_FACEBOOK_SECRET || '',
    }),

    // Google Provider
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),

    // Credentials Provider
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Return null if credentials are missing
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Validate credentials using Zod
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(1),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = credentials as UserCreateParams;

          // Fetch user by email
          const user = await authModule.getUserByEmail(email);
          if (!user) {
            return null; // Return null if no user found
          }

          if (!password) {
            throw new Error('Invalid password');
          }

          // Compare password securely
          const passwordsMatch = await authModule.compare(
            user?.password ?? '',
            password
          );
          if (!passwordsMatch) {
            return null; // Return null if passwords don't match
          }

          // Return authenticated user object
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            // Add other necessary user details
          } as User;
        }

        // Throw an error if validation fails
        throw new Error('Invalid email or password');
      },
    }),
  ],
  secret: process.env.AUTH_SECRET, // Ensure secret is set for JWT
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) {
        return false;
      }

      if (user && account?.provider !== 'credentials') {
        // Handle new user registration on sign in
        if (await authModule.isNewUser(user.email)) {
          const userData: UserCreateParams = {
            email: user.email,
            name: user.name ?? 'Anonymous',
            emailVerified: true,
            image: user?.picture ?? null,
            provider: account?.provider ?? 'credentials',
          };

          // Attempt to create user in your database
          const response = await authModule.createUser(userData);
          if (!response) {
            return false; // Registration failed
          }
        }
      }
      return true; // Allow sign in for existing users
    },

    async session({ session, token }) {
      // Attach token data to the session object
      session.user = token.user;
      return session;
    },

    async jwt({ token, user }) {
      // Attach user details to JWT token
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/register', // Handle user registration
    verifyRequest: '/auth/verify',
    error: '/auth/signin', // Handle error page
  },

  debug: process.env.NODE_ENV === 'development', // Enable debug in development mode only
};
