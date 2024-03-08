// Importing NextAuth and the authentication configuration
import { auth } from "@/auth";

// Exporting the authentication middleware using NextAuth and the provided configuration
export default auth;

// Additional configuration for the middleware
export const config = {
    // Defining a matcher to specify routes where the middleware should be applied
    matcher: ["/onboard", "/chat", "/dashboard", "/explore", "/home", "/test"],
};
// "/((?!api|_next/static|_next/image|.*\\.png$).*)"
