export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'cursive' }}>
            Welcome to q402
          </h1>
          <p className="text-xl text-zinc-300 mb-12">
            Your Web3 Copilot for BNB Chain. Research, generate, and execute
            all in one gas-sponsored, policy-protected signature.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Box 1 */}
          <div className="aspect-square border border-zinc-400 p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'cursive' }}>
              Research & Explain
            </h3>
            <p className="text-zinc-300">
              Get instant insights about tokens and protocols using ChainGPT
              LLM. Understand what you're interacting with before you execute.
            </p>
          </div>

          {/* Feature Box 2 */}
          <div className="aspect-square border border-zinc-400 p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'cursive' }}>
              Generate & Audit
            </h3>
            <p className="text-zinc-300">
              Create Solidity contracts or audit existing ones with AI-powered
              tools. Ensure security and best practices before deployment.
            </p>
          </div>

          {/* Feature Box 3 */}
          <div className="aspect-square border border-zinc-400 p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'cursive' }}>
              Execute Transactions
            </h3>
            <p className="text-zinc-300">
              Execute swaps, stakes, transfers, or contract deployments all in
              one signature. Gas-sponsored and policy-protected.
            </p>
          </div>

          {/* Feature Box 4 */}
          <div className="aspect-square border border-zinc-400 p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'cursive' }}>
              Spend Caps
            </h3>
            <p className="text-zinc-300">
              Set maximum spending limits to protect your assets. Control how
              much can be spent per transaction or per day.
            </p>
          </div>

          {/* Feature Box 5 */}
          <div className="aspect-square border border-zinc-400 p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'cursive' }}>
              Allow/Deny Lists
            </h3>
            <p className="text-zinc-300">
              Whitelist trusted addresses and block suspicious ones. Maintain
              full control over who can receive your transactions.
            </p>
          </div>

          {/* Feature Box 6 */}
          <div className="aspect-square border border-zinc-400 p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'cursive' }}>
              Risk Warnings
            </h3>
            <p className="text-zinc-300">
              Get clear, human-readable transaction previews with risk
              assessments before signing. Know exactly what you're approving.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="border border-zinc-400 p-8">
            <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'cursive' }}>
              About q402
            </h2>
            <p className="text-zinc-300 mb-4">
              q402 is a chat-based Web3 Copilot built on BNB Chain that combines
              the power of ChainGPT AI with the gasless payment protocol of
              x402. Built for the Quack × ChainGPT Super Web3 Agent Hackathon.
            </p>
            <p className="text-zinc-300 mb-4">
              With q402, you can research tokens and protocols, generate or
              audit smart contracts, and execute complex transactions—all through
              a simple chat interface. Everything is secured with spend caps,
              allow/deny lists, and comprehensive risk warnings.
            </p>
            <p className="text-zinc-300">
              Experience the future of Web3 interaction where AI meets
              gas-sponsored, policy-protected transactions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="border border-zinc-400 p-12">
            <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'cursive' }}>
              Ready to Get Started?
            </h2>
            <p className="text-zinc-300 mb-8">
              Connect your wallet and start chatting with your Web3 copilot.
              Experience seamless transactions powered by x402 payment protocol.
            </p>
            <button className="px-8 py-3 border border-zinc-400 text-white hover:bg-zinc-900 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

