import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "CodeFolio | Professional Developer Portfolio",
    template: "%s | CodeFolio",
  },
  description: "A modern, professional portfolio builder for developers to showcase their projects, skills, and experience.",
  keywords: ["developer", "portfolio", "showcase", "next.js", "software engineer"],
  authors: [{ name: "CodeFolio" }],
  creator: "CodeFolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codefolio.uzzair.online",
    title: "CodeFolio",
    description: "Professional Developer Portfolio Builder",
    siteName: "CodeFolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeFolio",
    description: "Professional Developer Portfolio Builder",
    creator: "@codefolio",
  },
  metadataBase: new URL("https://codefolio.uzzair.online"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="text-foreground font-sans antialiased">
        <AuthProvider>
          <div>
            <div className="min-h-screen">
              {children}
              <footer className="border-t border-border/50 py-8">
                <Footer />
              </footer>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
