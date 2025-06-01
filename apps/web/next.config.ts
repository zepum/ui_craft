import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'tsx'],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
