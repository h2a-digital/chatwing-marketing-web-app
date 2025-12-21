/** @type {import('next-sitemap').IConfig} */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingman.h2adigital.com';

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true, // creates robots.txt
  sitemapSize: 5000, // splits large sitemaps automatically
  exclude: ['/email/unsubscribe'], // Exclude unsubscribe page from sitemap
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
