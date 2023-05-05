/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://www.exploreaitoday.com",
    generateRobotsTxt: true,
    exclude: ["/server-sitemap.xml", "/post/*"], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            "https://www.exploreaitoday.com/server-sitemap.xml" // <==== Add here
        ]
    }
};

// https://www.npmjs.com/package/next-sitemap#generating-dynamicserver-side-sitemaps
