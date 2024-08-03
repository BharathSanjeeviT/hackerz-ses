"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { useSession } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { token } = useSession()
  const router = useRouter()

  useEffect( () => {
    if(!token){
      router.push('/login')
    }
  }, [token, router])

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
