import { getServerSideSitemap } from "next-sitemap";
import { getPostSitemap } from "@/lib/sanity/client";

export async function GET(request) {
    let postSitemap = await getPostSitemap();

    postSitemap = postSitemap.map(post => ({
        loc: `https://www.exploreaitoday.com/post/${post.slug}`,
        lastmod: new Date(post._updatedAt).toISOString(),
        changefreq: "daily",
        priority: "0.7"
    }));

    return getServerSideSitemap(postSitemap);
}
