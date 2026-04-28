import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "DevVault — Developer Portfolio & Project Showcase",
  description: "The premier platform for developers to organize, showcase, and share their projects with the world.",
  keywords: ["developer portfolio", "project showcase", "DevVault", "developer tools"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("dark", spaceGrotesk.variable, inter.variable)}>
      <body className={cn(spaceGrotesk.className, "min-h-screen bg-background text-foreground antialiased")}>
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "oklch(0.15 0.018 265)",
              border: "1px solid oklch(1 0 0 / 10%)",
              color: "oklch(0.97 0.005 265)",
            },
          }}
        />
      </body>
    </html>
  )
}
