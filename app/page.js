"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import signOutUser from "@/firebase/auth/signout";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/login");
  }, [user, router]);
  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push("/login");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <main>
      {user && (
        <div className="flex items-center justify-around">
          <h1>Welcome home</h1>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </main>
  );
}
