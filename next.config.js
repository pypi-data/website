
const { join } = require("path");
const { symlink, access, mkdir } = require("fs/promises");
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
  webpack: (config, { isServer }) => {
    config.experiments = Object.assign(config.experiments || {}, {
      asyncWebAssembly: true,
    });
    return config;
  },

}
module.exports = nextConfig
