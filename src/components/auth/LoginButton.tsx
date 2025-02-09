"use client"; // ✅ Force this component to be a Client Component

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return session ? (
    <div className="flex items-center space-x-4">
      <p className="text-lg font-semibold">Welcome, {session.user?.name}</p>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Sign Out
      </button>
    </div>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      Sign In with Google
    </button>
  );
}
