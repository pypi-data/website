/** @type {import('next').NextConfig} */
// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
//   options: {
//     // If you use remark-gfm, you'll need to use next.config.mjs
//     // as the package is ESM only
//     // https://github.com/remarkjs/remark-gfm#install
//     remarkPlugins: [],
//     rehypePlugins: [],
//     // If you use `MDXProvider`, uncomment the following line.
//     // providerImportSource: "@mdx-js/react",
//   },
// })
const base_path = process.env.BASE_PATH;

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  basePath: base_path,
  // experimental: {
  //   mdxRs: true,
  // },
  output: 'export',
}
const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
