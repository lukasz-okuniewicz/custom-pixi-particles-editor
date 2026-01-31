import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  webpack: (config) => {
    // Force a single Pixi.js instance so the editor and custom-pixi-particles share
    // TextureCache (spritesheet frame names resolve instead of 404).
    config.resolve.alias = {
      ...config.resolve.alias,
      "pixi.js": path.resolve(__dirname, "node_modules/pixi.js"),
    };
    return config;
  },
};

export default nextConfig;
