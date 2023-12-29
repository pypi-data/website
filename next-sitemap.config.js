/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://py-code.org',
  sitemapSize: 40000,
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const response = await fetch("https://data.py-code.org/data/pages.json")
    const packageList = await response.json();
    const packages = packageList.packages.toSorted((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    return packages.map((pkg) => ({
      loc: `https://py-code.org/projects/view?name=${pkg.toLowerCase()}`,
    }));
  },
}
