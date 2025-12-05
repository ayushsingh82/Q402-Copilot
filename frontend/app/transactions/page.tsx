import Navbar from "@/components/Navbar";

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="border border-zinc-400 aspect-square p-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Transactions</h1>
            <p className="text-zinc-300">Transaction history coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

