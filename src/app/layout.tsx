import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recueil - Moderne Rezeptsammlung",
  description: "Entdecke köstliche Rezepte in einer modernen, übersichtlichen Sammlung. Durchsuche nach Kategorien, finde neue Lieblingsgerichte und lass dich inspirieren.",
  keywords: ["Rezepte", "Kochen", "Backen", "Deutsch", "Rezeptsammlung"],
  authors: [{ name: "Recueil" }],
  openGraph: {
    title: "Recueil - Moderne Rezeptsammlung",
    description: "Entdecke köstliche Rezepte in einer modernen, übersichtlichen Sammlung.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
