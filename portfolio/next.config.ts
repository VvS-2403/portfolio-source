import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['gray-matter', '@xenova/transformers', 'onnxruntime-node', 'sharp'],
};

export default nextConfig;
