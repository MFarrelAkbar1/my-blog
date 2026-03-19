import type { Metadata } from "next"
import { Sora, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Muhammad Farrel Akbar — Developer & Security Analyst",
    template: "%s | Muhammad Farrel Akbar",
  },
  description:
    "Personal website and blog of Muhammad Farrel Akbar — TypeScript Developer, PHP Web Developer, and Security Analyst.",
  keywords: [
    "Muhammad Farrel Akbar",
    "TypeScript",
    "Next.js",
    "PHP",
    "Security Analyst",
    "Web Developer",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${sora.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
