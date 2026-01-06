import { auth } from "@/lib/auth";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Benefits } from "@/components/landing/Benefits";
import { CTA } from "@/components/landing/CTA";

export default async function Home() {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const username = session?.user?.username;

  return (
    <main>
      <Navbar isAuthenticated={isAuthenticated} username={username} />
      <Hero />
      <Features />
      <Benefits />
      <CTA />
    </main>
  );
}
