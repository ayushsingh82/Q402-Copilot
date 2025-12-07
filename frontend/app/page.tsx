import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <main className="min-h-screen text-white font-sans relative">
      <div className="relative" style={{ zIndex: 15 }}>
        <Navbar />
      </div>
      <Landing />
    </main>
  );
}
