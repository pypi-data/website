
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PATH;

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  basePath,
  assetPrefix,
  // experimental: {
  //   mdxRs: true,
  // },
  output: 'export',
}
module.exports = nextConfig
