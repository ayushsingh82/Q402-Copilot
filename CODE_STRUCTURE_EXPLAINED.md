# Code Structure Explanation

## Why Examples/Demo Folders Are NOT Pushed to GitHub

When you clone this repository and push to your own repo, the `examples/` folder will **NOT** be included. Here's why:

### The Answer: `.gitignore` Configuration

Looking at the `.gitignore` file (line 76), you'll find:

```
examples/
```

This tells Git to **ignore** (not track) the entire `examples/` directory. This means:

1. ❌ **When you clone**: The `examples/` folder won't be in the repository
2. ❌ **When you push**: Even if you have `examples/` locally, Git won't upload it
3. ✅ **Locally only**: The examples exist only on your local machine for learning/testing

### Why Are Examples Ignored?

Common reasons:
- **Not production code**: Examples are for learning, not deployment
- **Reduces repo size**: Keeps the repository smaller and cleaner
- **User-specific configs**: Examples often contain environment variables and test keys
- **Documentation purpose**: Examples demonstrate usage but aren't part of the core library

### How to Include Examples in Your Own Repo

If you want to push examples to your own repository:

1. **Remove from `.gitignore`**:
   ```bash
   # Edit .gitignore and remove or comment out:
   # examples/
   ```

2. **Force add the folder**:
   ```bash
   git add -f examples/
   git commit -m "Add examples folder"
   git push
   ```

---

## Complete Code Structure Overview

```
Q402/
├── packages/                    # 📦 Main source code (MONOREPO)
│   ├── core/                   # 🔧 Core SDK - The foundation
│   ├── facilitator/            # ⚙️ Facilitator service
│   ├── middleware-express/     # 🌐 Express.js middleware
│   └── middleware-hono/        # 🌐 Hono framework middleware
│
├── examples/                   # 📚 Examples (NOT in Git!)
│   └── bsc-testnet/           # Example implementations
│
├── docs/                      # 📖 Documentation
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT_READINESS.md
│   └── ...
│
├── specs/                     # 📋 Protocol specifications
│   ├── core-protocol.md
│   └── api/
│
├── .gitignore                 # 🚫 Git ignore rules
├── package.json              # 📦 Root package config
├── pnpm-workspace.yaml       # 🔗 Monorepo workspace config
└── README.md                 # 📄 Main documentation
```

---

## Step-by-Step: What Each Component Does

### 1. **Core SDK** (`packages/core/`) - The Foundation

**Purpose**: Provides all the building blocks for creating and verifying payments.

#### Key Files:

**Client Functions** (`src/client/`):
- `prepareWitness.ts` - Creates an EIP-712 message (payment details)
- `signWitness.ts` - Signs the payment message with user's private key
- `prepareAuthorization.ts` - Creates EIP-7702 authorization tuple
- `signAuthorization.ts` - Signs the authorization tuple
- `createPaymentHeader.ts` - Combines everything into X-PAYMENT header
- `selectPaymentDetails.ts` - Chooses payment method from 402 response

**Facilitator Functions** (`src/facilitator/`):
- `verify.ts` - Verifies payment signatures are valid
- `settle.ts` - Creates and submits blockchain transaction

**Types** (`src/types/`):
- Defines all TypeScript types (Payment, Network, etc.)

**Utilities** (`src/utils/`):
- Error handling, encoding, validation, nonce generation

**What it does**:
1. ✅ User creates payment signature (offline, no gas)
2. ✅ Server verifies the signature
3. ✅ Facilitator submits transaction (pays gas)

---

### 2. **Facilitator Service** (`packages/facilitator/`) - The Payment Processor

**Purpose**: Standalone service that verifies payments and submits them to blockchain.

#### API Endpoints:
- `POST /verify` - "Is this payment valid?"
- `POST /settle` - "Submit this payment to blockchain"
- `GET /supported` - "What networks do you support?"
- `GET /health` - "Is the service running?"

**What it does**:
1. Receives payment signature from server
2. Verifies the signature is valid
3. Submits transaction to blockchain (pays gas fees)
4. Returns transaction hash

**Key Files**:
- `src/api/routes/verify.ts` - Verification endpoint
- `src/api/routes/settle.ts` - Settlement endpoint
- `src/services/verification.ts` - Verification logic
- `src/services/settlement.ts` - Transaction submission

---

### 3. **Express Middleware** (`packages/middleware-express/`) - Server Integration

**Purpose**: Easy integration with Express.js servers to protect routes.

**What it does**:
1. Intercepts HTTP requests
2. Checks if payment header exists
3. If no payment → Returns 402 "Payment Required"
4. If payment exists → Verifies it
5. If valid → Allows request to continue

**Example Usage**:
```typescript
app.use(createX402BnbMiddleware({
  endpoints: [
    { path: "/api/premium", amount: "1000000", token: "0x..." }
  ]
}))
```

---

### 4. **Hono Middleware** (`packages/middleware-hono/`) - Alternative Framework

**Purpose**: Same as Express middleware but for Hono framework.

Same functionality, different framework compatibility.

---

### 5. **Examples** (`examples/bsc-testnet/`) - Learning Examples

**Purpose**: Show how to use the libraries in real scenarios.

#### Client Examples (`examples/bsc-testnet/client/`):

**`simple-payment.ts`**:
1. User wants to access premium content
2. Server responds with 402 "Payment Required" + payment details
3. Client creates payment signature
4. Client sends payment header with request
5. Server verifies and grants access

**`batch-payment.ts`**:
- Same as simple payment, but pays multiple recipients at once

#### Server Examples (`examples/bsc-testnet/server/`):

**`express-server.ts`**:
1. Sets up Express server
2. Configures payment middleware
3. Defines protected routes (e.g., `/api/premium-data`)
4. Returns 402 if no payment, or resource if payment valid

**`hono-server.ts`**:
- Same as Express server but using Hono framework

---

## Complete Payment Flow: Step-by-Step

### Phase 1: User Requests Resource

```
User → Server: GET /api/premium-data
Server → User: 402 Payment Required
          {
            "scheme": "evm/eip7702-delegated-payment",
            "token": "0xUSDT...",
            "amount": "1000000",  // 1 USDT
            "to": "0xServerWallet...",
            ...
          }
```

### Phase 2: User Creates Payment Signature

```typescript
// Client-side code (simple-payment.ts)

1. selectPaymentDetails() 
   → Chooses payment method from 402 response

2. prepareWitness()
   → Creates EIP-712 message:
      {
        owner: "0xUser...",
        token: "0xUSDT...",
        amount: "1000000",
        to: "0xServer...",
        deadline: timestamp + 15min,
        paymentId: unique_id,
        nonce: 123
      }

3. signWitness()
   → Signs message with user's private key
   → Result: witnessSignature

4. prepareAuthorization()
   → Creates EIP-7702 authorization:
      {
        chainId: 97,
        address: "0xImplementationContract...",
        nonce: 42
      }

5. signAuthorization()
   → Signs authorization with user's private key
   → Result: authorizationSignature

6. createPaymentHeader()
   → Combines witness + authorization
   → Base64 encodes everything
   → Result: "X-PAYMENT: eyJ3aXRuZXNzIjoi..."
```

### Phase 3: User Sends Payment

```
User → Server: GET /api/premium-data
              Headers: {
                "X-PAYMENT": "eyJ3aXRuZXNzIjoi..."
              }
```

### Phase 4: Server Verifies Payment

```typescript
// Server-side (middleware)

1. Extract X-PAYMENT header
   → Decode Base64

2. Send to Facilitator: POST /verify
   → Facilitator checks:
      ✅ Signature is valid
      ✅ Nonce not used before
      ✅ Deadline not expired
      ✅ Implementation contract whitelisted

3. If valid → Continue to route handler
   If invalid → Return 402 again
```

### Phase 5: Settlement (Optional)

```typescript
// If autoSettle enabled:

1. Send to Facilitator: POST /settle

2. Facilitator:
   → Encodes function call: executeTransfer(...)
   → Creates EIP-7702 transaction (type 0x04)
   → Sets authorizationList with user's signature
   → Submits transaction (Facilitator pays gas!)

3. Transaction executes on blockchain:
   → Temporarily delegates user's EOA to implementation contract
   → Contract executes transfer
   → Funds move from user to server
   → Delegation reverts

4. Facilitator returns transaction hash
```

### Phase 6: Resource Delivery

```
Server → User: 200 OK
          {
            "data": "Premium content...",
            "payment": {
              "txHash": "0x...",
              "blockNumber": 12345
            }
          }
          Headers: {
            "X-PAYMENT-RESPONSE": "..."
          }
```

---

## Key Concepts Explained

### What is EIP-7702?

**EIP-7702** = "Set EOA account code temporarily"

**Normal Flow** (requires approval):
```
User approves token → User transfers → User pays gas
```

**EIP-7702 Flow** (no approval needed):
```
User signs offline → Facilitator submits → User pays no gas!
```

**How it works**:
1. User signs an authorization that says: "Temporarily use this contract's code"
2. Facilitator submits transaction with type `0x04`
3. Blockchain temporarily pushes contract code to user's account
4. Contract executes (transfers tokens)
5. After execution, delegation is cleared automatically

### What is EIP-712?

**EIP-712** = Structured data signing standard

Instead of signing raw bytes, users sign structured JSON:
```json
{
  "domain": { "name": "x402 BNB", "version": "1", ... },
  "message": {
    "owner": "0x...",
    "token": "0x...",
    "amount": "1000000",
    ...
  }
}
```

**Why it matters**: Users see human-readable info in their wallet before signing.

### What is HTTP 402?

**HTTP 402** = "Payment Required" status code

Standard way to request payment before serving content:
```
Client: GET /api/premium
Server: 402 Payment Required
        { paymentDetails: {...} }
```

---

## Why This Architecture?

### Monorepo Structure

All packages in one repository because:
- ✅ Shared types between packages
- ✅ Easy to update multiple packages at once
- ✅ Single test suite
- ✅ Consistent versioning

### Separation of Concerns

- **Core SDK**: Pure functions, no framework dependencies
- **Middleware**: Framework-specific integration
- **Facilitator**: Standalone service (can run separately)
- **Examples**: Learning/training code

### Benefits

1. **Modular**: Use only what you need
2. **Framework-agnostic core**: Works with any framework
3. **Scalable**: Facilitator can run on separate server
4. **Testable**: Each component tested independently

---

## What Gets Pushed to GitHub?

### ✅ Included in Git:
- `packages/` - All source code
- `docs/` - Documentation
- `specs/` - Protocol specifications
- Configuration files (`.gitignore`, `package.json`, etc.)

### ❌ NOT Included (via `.gitignore`):
- `examples/` - Example code
- `node_modules/` - Dependencies
- `dist/` - Build output
- `.env` - Environment variables
- `*.log` - Log files

---

## How to Use This Codebase

### For Developers:

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Build packages**:
   ```bash
   pnpm build
   ```

3. **Run examples** (locally):
   ```bash
   cd examples/bsc-testnet
   pnpm install
   pnpm run client:simple
   ```

### For Integration:

1. **Install packages**:
   ```bash
   npm install @x402-bnb/core @x402-bnb/middleware-express
   ```

2. **Use in your code**:
   ```typescript
   import { createPaymentHeader } from "@x402-bnb/core";
   import { createX402BnbMiddleware } from "@x402-bnb/middleware-express";
   ```

---

## Summary

- **Examples not pushed**: Because `.gitignore` excludes them
- **Monorepo structure**: All packages together for easier development
- **Core SDK**: Foundation - creates/verifies payments
- **Middleware**: Easy server integration
- **Facilitator**: Standalone payment processor
- **Flow**: User signs → Server verifies → Facilitator settles

The codebase is ready for EIP-7702 when networks support it (expected Q2-Q3 2025).

