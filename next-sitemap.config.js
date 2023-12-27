/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://py-code.org',
  sitemapSize: 40000,
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const response = await fetch("https://data.py-code.org/data/pages.json")
    const packageList = await response.json();

    return packageList.packages.map((pkg) => ({
      loc: `https://py-code.org/projects/view?name=${pkg.toLowerCase()}`,
      changefreq: 'weekly',
      priority: 0.7,
    }));
  },
}
