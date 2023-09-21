"use client";
import data from "../../data";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import signOutUser from "@/firebase/auth/signout";
import Link from "next/link";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageGallery from "@/components/ImageGallery";
export default function Page({ params }) {
  const { user } = useAuthContext();
  const tag = params.tag;
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
    <DndProvider backend={HTML5Backend}>
      <section className="py-[2rem] bg-main h-[100vh]">
        <div className="container-custom grid gap-6">
          <nav className="flex items-center justify-between">
            <Link href="/">Go Back Home</Link>
            <button onClick={handleSignOut}>Sign out</button>
          </nav>
          <ImageGallery tag={tag} />
        </div>
      </section>
    </DndProvider>
  );
}
