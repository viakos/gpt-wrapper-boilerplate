import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Import from `src/lib/auth.ts`


export default NextAuth(authOptions);
