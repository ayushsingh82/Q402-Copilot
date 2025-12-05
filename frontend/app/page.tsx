import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <Landing />
    </main>
  );
}
