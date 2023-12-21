const fs = require('fs');
const zlib = require('zlib');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://py-code.org',
  sitemapSize: 1000,
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  // additionalPaths: async (config) => {
  //   const result = []
  //
  //     // public/data/pages.json
  //   const packageListData_raw = fs.readFileSync(process.argv[2], "utf8");
  //   const packageListData = zlib.unzipSync(packageListData_raw).toString();
  //   const packageList = JSON.parse(packageListData);
  //
  //   return packageList.packages.map((pkg) => {
  //
  //   });
  //
  //   // all possible values
  //   result.push({
  //     loc: '/additional-page-2',
  //     changefreq: 'yearly',
  //     priority: 0.7,
  //     lastmod: new Date().toISOString(),
  //
  //     // acts only on '/additional-page-2'
  //     alternateRefs: [
  //       {
  //         href: 'https://es.example.com',
  //         hreflang: 'es',
  //       },
  //       {
  //         href: 'https://fr.example.com',
  //         hreflang: 'fr',
  //       },
  //     ],
  //   })
  // },
}
