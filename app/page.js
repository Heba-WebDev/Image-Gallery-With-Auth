"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import signOutUser from "@/firebase/auth/signout";
import ImageGallery from "@/components/ImageGallery";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const tags = [
  "Tech",
  "IoT",
  "Apps Development",
  "Robotics",
  "Virtual Reality",
  "Network",
];
export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [tag, setTag] = useState("");
  const [tagNotFound, setTagNotFound] = useState(false);

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
  const handleChange = (event) => {
    setTag(event.target.value);
  };
  const handlSubmit = (event) => {
    event.preventDefault();
    if (tag) {
      const lowercaseTag = tag.toLowerCase();
      if (tags.some((tagItem) => tagItem.toLowerCase() === lowercaseTag)) {
        setTagNotFound(false);
        router.push(`/${tag}`);
      } else {
        setTagNotFound(true);
      }
    } else {
      setTagNotFound(true);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="py-[2rem] bg-main h-[100vh]">
        <div className="container-custom">
          {user && (
            <div className="grid">
              <div className="flex items-center justify-between">
                <h1>Welcome Home</h1>
                <button onClick={handleSignOut}>Sign out</button>
              </div>
              <form
                onSubmit={handlSubmit}
                className="pt-8 justify-self-center flex gap-2"
              >
                <div className="relative flex gap-1">
                  <label htmlFor="tag" className="self-center">
                    Search by Tags
                  </label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={tag}
                    onChange={handleChange}
                    className="border py-1 bg-gray-50 px-1 rounded text-blue-800"
                  />
                  {tagNotFound && (
                    <span className="text-sm text-red-600 absolute top-9 right-2">
                      Please enter a valid tag
                    </span>
                  )}
                </div>
              </form>
              <div>
                <ImageGallery />
              </div>
            </div>
          )}
        </div>
      </main>
    </DndProvider>
  );
}
