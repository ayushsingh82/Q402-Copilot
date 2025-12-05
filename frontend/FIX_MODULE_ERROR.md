# Fix Module Resolution Error

## Issue
`Module not found: Can't resolve '@q402/core'`

## Solution Applied

1. ✅ Updated `next.config.ts` to transpile the local package:
   ```typescript
   transpilePackages: ["@q402/core"],
   ```

2. ✅ Package is linked via `file:../packages/core` in package.json

3. ✅ Package is built and exports are correct

## Next Steps

1. **Stop the dev server** (Ctrl+C)

2. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   ```

3. **Restart the dev server**:
   ```bash
   npm run dev
   ```

## Verification

The package should be linked at:
- `node_modules/@q402/core` → symlink to `../packages/core`

The exports are available:
- `createPaymentHeaderWithWallet`
- `selectPaymentDetails`
- `SupportedNetworks`
- `PaymentRequiredResponse` (type)

If the error persists after restarting, try:
```bash
rm -rf node_modules/@q402
npm install
npm run dev
```


