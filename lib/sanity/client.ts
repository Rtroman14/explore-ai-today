import { apiVersion, dataset, projectId, useCdn } from "./config";
import {
    postquery,
    limitquery,
    paginatedquery,
    configQuery,
    singlequery,
    pathquery,
    allauthorsquery,
    authorsquery,
    postsbyauthorquery,
    postsbycatquery,
    catpathquery,
    catquery,
    searchquery,
    fetchFeaturedPosts,
    mostRecentPosts,
    moreRecentPosts,
    numPosts,
    sitemapPost,
    sitemapAuthor,
    toolquery,
    toolCategoryQuery,
    numTools,
    fetchMoreTools,
    fetchSomeTools,
    filterToolsByCategories
} from "./groq";
import { createClient } from "next-sanity";

if (!projectId) {
    console.error(
        "The Sanity Project ID is not set. Check your environment variables."
    );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn })
    : null;

export const fetcher = async ([query, params]) => {
    return client ? client.fetch(query, params) : [];
};

export async function getAllPosts() {
    if (client) {
        return (await client.fetch(postquery)) || [];
    }
    return [];
}

export async function getFeaturedPosts() {
    if (client) {
        return (await client.fetch(fetchFeaturedPosts)) || [];
    }
    return [];
}

export async function getRecentPosts() {
    if (client) {
        return (await client.fetch(mostRecentPosts)) || [];
    }
    return [];
}

export async function getMoreRecentPosts(lastPublishedAt, lastID) {
    if (client) {
        return (
            (await client.fetch(moreRecentPosts, {
                lastPublishedAt,
                lastID
            })) || []
        );
    }
    return [];
}

export async function getNumPosts() {
    if (client) {
        return (await client.fetch(numPosts)) || [];
    }
    return [];
}

export async function getSettings() {
    if (client) {
        return (await client.fetch(configQuery)) || [];
    }
    return [];
}

export async function getPostBySlug(slug) {
    if (client) {
        return (await client.fetch(singlequery, { slug })) || {};
    }
    return {};
}

export async function getAllPostsSlugs() {
    if (client) {
        const slugs = (await client.fetch(pathquery)) || [];
        return slugs.map(slug => ({ slug }));
    }
    return [];
}
// Author
export async function getAllAuthorsSlugs() {
    if (client) {
        const slugs = (await client.fetch(authorsquery)) || [];
        return slugs.map(slug => ({ slug }));
    }
    return [];
}

export async function getAuthorPostsBySlug(slug) {
    if (client) {
        return (
            (await client.fetch(postsbyauthorquery, { slug })) || {}
        );
    }
    return {};
}

export async function getAllAuthors() {
    if (client) {
        return (await client.fetch(allauthorsquery)) || [];
    }
    return [];
}

// Sitemap
export async function getAuthorSitemap() {
    if (client) {
        return (await client.fetch(sitemapAuthor)) || [];
    }
    return {};
}

export async function getPostSitemap() {
    if (client) {
        return (await client.fetch(sitemapPost)) || [];
    }
    return {};
}

// Category

export async function getAllCategories() {
    if (client) {
        const slugs = (await client.fetch(catpathquery)) || [];
        return slugs.map(slug => ({ slug }));
    }
    return [];
}

export async function getPostsByCategory(slug) {
    if (client) {
        return (await client.fetch(postsbycatquery, { slug })) || {};
    }
    return {};
}

export async function getTopCategories() {
    if (client) {
        return (await client.fetch(catquery)) || [];
    }
    return [];
}

export async function getPaginatedPosts(limit) {
    if (client) {
        return (
            (await client.fetch(paginatedquery, {
                pageIndex: 0,
                limit: limit
            })) || {}
        );
    }
    return {};
}

// * tools
export async function getAllTools() {
    if (client) {
        return (await client.fetch(toolquery)) || [];
    }
    return [];
}
export async function getAllToolCategories() {
    if (client) {
        return (await client.fetch(toolCategoryQuery)) || [];
    }
    return [];
}

export async function getNumTools() {
    if (client) {
        return (await client.fetch(numTools)) || [];
    }
    return [];
}

export async function getSomeTools() {
    if (client) {
        return (await client.fetch(fetchSomeTools)) || [];
    }
    return [];
}

export async function getMoreTools(lastCreatedAt, lastID) {
    if (client) {
        return (
            (await client.fetch(fetchMoreTools, {
                lastCreatedAt,
                lastID
            })) || []
        );
    }
    return [];
}

export async function getToolsByCategories(categories) {
    if (client) {
        return (
            (await client.fetch(filterToolsByCategories, {
                categories
            })) || {}
        );
    }
    return {};
}
