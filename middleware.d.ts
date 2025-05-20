declare module '@clerk/nextjs/server' {
  export interface SessionClaims {
    firstName?: string;
    lastName?: string;
    email?: string;
    picture?: string;
  }

  export interface AuthObject {
    sessionClaims: SessionClaims;
    userId: string;
  }
}

declare module '@clerk/nextjs/dist/types/server' {
  interface ClerkConfiguration {
    /** The frontend API key */
    publishableKey?: string;
    /** The backend/server API key */
    secretKey?: string;
    /** After sign in redirect */
    afterSignInUrl?: string;
    /** After sign up redirect */
    afterSignUpUrl?: string;
  }
}
