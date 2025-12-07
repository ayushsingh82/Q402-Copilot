export default function Landing() {
  return (
    <div className="min-h-screen text-white font-sans relative overflow-hidden">
      {/* Full page background image */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://img.freepik.com/free-vector/hand-painted-blue-sky-background-with-fluffy-white-clouds_1048-18892.jpg?semt=ais_se_enriched&w=740&q=80)',
          zIndex: 0
        }}
      />
      
      {/* Content with higher z-index */}
      <div className="relative" style={{ zIndex: 10 }}>
      {/* Floating Images */}
      <div className="fixed top-32 left-10 floating-animation" style={{ zIndex: 15 }}>
        <img 
          src="https://docs.chaingpt.org/~gitbook/image?url=https%3A%2F%2F2865549669-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F02IMVe3hN17zPTDRhn1f%252Flogo%252FomegBsRg6CibklqFfqbR%252FCGPT%2520Favicon%2520256x256.png%3Falt%3Dmedia%26token%3Dfe70270c-c79d-4780-8d41-2e5f5d80eb0d&width=260&dpr=2&quality=100&sign=59eb50c8&sv=2"
          alt="ChainGPT"
          className="w-24 h-24 opacity-100 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div className="fixed top-32 right-10 floating-animation-delay" style={{ zIndex: 15 }}>
        <img 
          src="https://moralis.com/wp-content/uploads/web3wiki/682-bnb-chain/637aee18389f7a5e72f04b51_ItmEr7gxAND6VQG4SnWLs2DeKys3Mq9YhOeL7d6Sugc-300x300.png"
          alt="BNB Chain"
          className="w-32 h-32 opacity-100 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20" style={{ zIndex: 20 }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'cursive', color: '#000000', WebkitTextFillColor: '#000000', background: 'none' }}>
            Welcome to Q402-copilot
          </h1>
          <p className="text-xl mb-12 font-semibold" style={{ color: '#000000' }}>
            Your Web3 Copilot for BNB Chain. Research, generate, and execute
            all in one gas-sponsored, policy-protected signature.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-12" style={{ zIndex: 20 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Feature Box 1 */}
          <div className="aspect-square feature-box feature-box-red p-6 flex flex-col justify-center items-center text-center frame-border relative" style={{ zIndex: 50 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'cursive', color: '#000000', WebkitTextFillColor: '#000000' }}>
              Research & Explain
            </h3>
            <p style={{ color: '#000000' }}>
              Get instant insights about tokens and protocols using ChainGPT
              LLM. Understand what you're interacting with before you execute.
            </p>
          </div>

          {/* Feature Box 2 */}
          <div className="aspect-square feature-box feature-box-purple p-6 flex flex-col justify-center items-center text-center frame-border relative" style={{ zIndex: 50 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'cursive', color: '#000000', WebkitTextFillColor: '#000000' }}>
              Generate & Audit
            </h3>
            <p style={{ color: '#000000' }}>
              Create Solidity contracts or audit existing ones with AI-powered
              tools. Ensure security and best practices before deployment.
            </p>
          </div>

          {/* Feature Box 3 */}
          <div className="aspect-square feature-box feature-box-yellow p-6 flex flex-col justify-center items-center text-center frame-border relative" style={{ zIndex: 50 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'cursive', color: '#000000' }}>
              Execute Transactions
            </h3>
            <p style={{ color: '#000000' }}>
              Execute swaps, stakes, transfers, or contract deployments all in
              one signature. Gas-sponsored and policy-protected.
            </p>
          </div>

          {/* Feature Box 4 */}
          <div className="aspect-square feature-box feature-box-blue p-6 flex flex-col justify-center items-center text-center frame-border relative" style={{ zIndex: 50 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'cursive', color: '#000000' }}>
              Spend Caps
            </h3>
            <p style={{ color: '#000000' }}>
              Set maximum spending limits to protect your assets. Control how
              much can be spent per transaction or per day.
            </p>
          </div>

          {/* Feature Box 5 */}
          <div className="aspect-square feature-box feature-box-red p-6 flex flex-col justify-center items-center text-center frame-border relative" style={{ zIndex: 50 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'cursive', color: '#000000' }}>
              Allow/Deny Lists
            </h3>
            <p style={{ color: '#000000' }}>
              Whitelist trusted addresses and block suspicious ones. Maintain
              full control over who can receive your transactions.
            </p>
          </div>

          {/* Feature Box 6 */}
          <div className="aspect-square feature-box feature-box-purple p-6 flex flex-col justify-center items-center text-center frame-border relative" style={{ zIndex: 50 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'cursive', color: '#000000' }}>
              Risk Warnings
            </h3>
            <p style={{ color: '#000000' }}>
              Get clear, human-readable transaction previews with risk
              assessments before signing. Know exactly what you're approving.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-12" style={{ zIndex: 20 }}>
        <div className="max-w-3xl mx-auto">
          <div className="frame-border p-8 relative" style={{ zIndex: 50 }}>
            <div className="corner-top-left"></div>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            <div className="corner-bottom-right"></div>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'cursive', color: '#000000', WebkitTextFillColor: '#000000', background: 'none' }}>
              About q402-copilot
            </h2>
            <p className="mb-4" style={{ color: '#000000' }}>
              q402-copilot is a chat-based Web3 Copilot built on BNB Chain that combines
              the power of ChainGPT AI with the gasless payment protocol of
              x402. Built for the Quack × ChainGPT Super Web3 Agent Hackathon.
            </p>
            <p className="mb-4" style={{ color: '#000000' }}>
              With q402-copilot, you can research tokens and protocols, generate or
              audit smart contracts, and execute complex transactions—all through
              a simple chat interface. Everything is secured with spend caps,
              allow/deny lists, and comprehensive risk warnings.
            </p>
            <p style={{ color: '#000000' }}>
              Experience the future of Web3 interaction where AI meets
              gas-sponsored, policy-protected transactions.
            </p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

