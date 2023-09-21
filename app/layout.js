import "./globals.css";
import { DM_Mono, DM_Sans, Inter, Poppins, Sansita } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";

const mono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata = {
  title: "Image Gallery",
  description: "Drag and drop your images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mono.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
