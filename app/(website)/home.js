"use client";

import { useState } from "react";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import LoadingButton from "@/components/LoadingButton";

import { getMoreRecentPosts } from "@/lib/sanity/client";

export default function HomePage({
    featuredPosts,
    recentPosts,
    numPosts
}) {
    const [isLoading, setLoading] = useState(false);
    const [posts, setPosts] = useState(recentPosts);

    const loadMorePosts = async () => {
        setLoading(true);

        const lastPost = posts[posts.length - 1];

        const lastPostObj = {
            lastPublishedAt: lastPost.publishedAt,
            lastID: lastPost._id
        };

        const { lastPublishedAt, lastID } = lastPostObj;

        try {
            const moreRecentPosts = await getMoreRecentPosts(
                lastPublishedAt,
                lastID
            );

            setPosts([...posts, ...moreRecentPosts]);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <>
            {featuredPosts && featuredPosts.length && (
                <Featured
                    post={featuredPosts[0]}
                    pathPrefix="lifestyle"
                />
            )}

            <Container large>
                {featuredPosts.length > 4 && (
                    <>
                        <div className="mt-10 flex items-center justify-center">
                            <h2 className="text-2xl">
                                <strong>Featured</strong> Posts
                            </h2>
                        </div>
                        <div className="mb-20 mt-10 grid gap-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-10 ">
                            {featuredPosts.slice(1, 2).map(post => (
                                <div
                                    className="md:col-span-2 md:row-span-2"
                                    key={post._id}>
                                    <PostList
                                        post={post}
                                        preloadImage={true}
                                        pathPrefix="lifestyle"
                                        fontSize="large"
                                        aspect="custom"
                                        fontWeight="normal"
                                    />
                                </div>
                            ))}
                            {featuredPosts.slice(2, 6).map(post => (
                                <PostList
                                    key={post._id}
                                    post={post}
                                    aspect="landscape"
                                    pathPrefix="lifestyle"
                                    fontWeight="normal"
                                    preloadImage={true}
                                />
                            ))}
                        </div>
                    </>
                )}

                <div className="mt-4 flex items-center justify-center">
                    <h3 className="text-2xl">
                        <strong>Our</strong> Latest
                    </h3>
                </div>
                <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-4 ">
                    {posts.map(post => (
                        <PostList
                            key={post._id}
                            post={post}
                            fontWeight="normal"
                            pathPrefix="lifestyle"
                            aspect="square"
                        />
                    ))}
                </div>
            </Container>

            {numPosts !== posts.length && (
                <div className="flex justify-center py-3">
                    <LoadingButton
                        title="Load More"
                        loading={isLoading}
                        loadMorePosts={loadMorePosts}
                    />
                </div>
            )}
        </>
    );
}
