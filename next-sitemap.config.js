/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://lifecarechoice.com",
  generateRobotsTxt: true,
  exclude: ["/api/*", "/thank-you"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api", "/thank-you"] },
    ],
  },
  sitemapSize: 7000,
};

