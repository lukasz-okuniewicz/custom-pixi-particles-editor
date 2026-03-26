import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path for webpack; Turbopack does not resolve absolute `resolveAlias` values correctly. */
const pixiAliasWebpack = path.resolve(__dirname, "node_modules/pixi.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  // Next.js 16 runs `next dev` with Turbopack by default; mirror webpack `resolve.alias`
  // so dev and build both force a single Pixi instance (shared TextureCache).
  // Use a project-relative path — absolute paths get broken into `./Users/...` imports.
  turbopack: {
    resolveAlias: {
      "pixi.js": "./node_modules/pixi.js",
    },
  },
  webpack: (config) => {
    // Force a single Pixi.js instance so the editor and custom-pixi-particles share
    // TextureCache (spritesheet frame names resolve instead of 404).
    config.resolve.alias = {
      ...config.resolve.alias,
      "pixi.js": pixiAliasWebpack,
    };
    return config;
  },
};

export default nextConfig;
