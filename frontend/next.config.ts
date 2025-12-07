import type { NextConfig } from "next";

// Simple inline loader to ignore files
const ignoreLoader = function (this: any) {
  this.cacheable && this.cacheable();
  return 'module.exports = {};';
};

const nextConfig: NextConfig = {
  transpilePackages: ["@q402/core"],
  // Add empty turbopack config to silence warning when using webpack
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Ignore test files and other non-essential files from node_modules
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // Ignore test directories completely
    config.module.rules.push({
      test: /node_modules\/thread-stream\/test/,
      use: ignoreLoader,
    });
    
    // Ignore test files, benchmarks, and other non-code files
    config.module.rules.push({
      test: /\.(test|spec|bench)\.(js|ts|mjs)$/,
      include: /node_modules/,
      use: ignoreLoader,
    });
    
    // Ignore markdown, text, zip, shell scripts, LICENSE files
    config.module.rules.push({
      test: /\.(md|txt|zip|sh)$/,
      include: /node_modules/,
      use: ignoreLoader,
    });
    
    // Ignore LICENSE files specifically
    config.module.rules.push({
      test: /LICENSE$/,
      include: /node_modules/,
      use: ignoreLoader,
    });
    
    // Ignore bench.js files
    config.module.rules.push({
      test: /bench\.js$/,
      include: /node_modules/,
      use: ignoreLoader,
    });

    // Ignore optional dependencies that may not be installed
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback['@react-native-async-storage/async-storage'] = false;
    config.resolve.fallback['pino-pretty'] = false;
    config.resolve.fallback['tap'] = false;
    config.resolve.fallback['tape'] = false;
    config.resolve.fallback['desm'] = false;
    config.resolve.fallback['fastbench'] = false;
    config.resolve.fallback['pino-elasticsearch'] = false;
    config.resolve.fallback['why-is-node-running'] = false;

    // Make ChainGPT SDK modules external (optional dependencies)
    if (isServer) {
      config.externals = config.externals || [];
      if (typeof config.externals === 'function') {
        const originalExternals = config.externals;
        config.externals = [
          originalExternals,
          '@chaingpt/smartcontractgenerator',
          '@chaingpt/smartcontractauditor',
          '@chaingpt/nft',
        ];
      } else if (Array.isArray(config.externals)) {
        config.externals.push(
          '@chaingpt/smartcontractgenerator',
          '@chaingpt/smartcontractauditor',
          '@chaingpt/nft'
        );
      }
    }

    return config;
  },
};

export default nextConfig;
