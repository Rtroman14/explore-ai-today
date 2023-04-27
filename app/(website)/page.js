import HomePage from "./home";
import {
    getFeaturedPosts,
    getRecentPosts,
    getNumPosts
} from "@/lib/sanity/client";

export default async function IndexPage() {
    const featuredPostsReq = getFeaturedPosts();
    const recentPostsReq = getRecentPosts();
    const numPostsReq = getNumPosts();

    const [featuredPosts, recentPosts, numPosts] = await Promise.all([
        featuredPostsReq,
        recentPostsReq,
        numPostsReq
    ]);

    return (
        <HomePage
            featuredPosts={featuredPosts}
            recentPosts={recentPosts}
            numPosts={numPosts}
        />
    );
}

// export const revalidate = 60;
