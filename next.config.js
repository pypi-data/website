const { join } = require("path");
const { symlink, access, mkdir } = require("fs/promises");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PATH;

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  basePath,
  assetPrefix,
  // experimental: {
  //   mdxRs: true,
  // },
  output: "export",
  webpack: (config, { isServer, dev }) => {
    config.experiments = Object.assign(config.experiments || {}, {
      asyncWebAssembly: true,
      layers: true,
    });
    if (!dev && isServer) {
      config.output.webassemblyModuleFilename = "chunks/[id].wasm";
      config.plugins.push(new WasmChunksFixPlugin());
    }
    return config;
  },
};
module.exports = nextConfig;

class WasmChunksFixPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("WasmChunksFixPlugin", (compilation) => {
      compilation.hooks.processAssets.tap({ name: "WasmChunksFixPlugin" }, (assets) =>
        Object.entries(assets).forEach(([pathname, source]) => {
          if (!pathname.match(/\.wasm$/)) return;
          compilation.deleteAsset(pathname);

          const name = pathname.split("/")[1];
          const info = compilation.assetsInfo.get(pathname);
          compilation.emitAsset(name, source, info);
        }),
      );
    });
  }
}
