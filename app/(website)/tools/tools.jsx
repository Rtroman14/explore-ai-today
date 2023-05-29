"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";
import ToolList from "@/components/ToolList";
import LoadingButton from "@/components/LoadingButton";
import Badge from "@/components/Badge";

import {
    getMoreTools,
    getToolsByCategories
} from "@/lib/sanity/client";

export default function Tools({
    recentTools,
    toolCategories,
    numTools
}) {
    const [isLoading, setLoading] = useState(false);
    const [tools, setTools] = useState(recentTools);
    const [categories, setCategories] = useState([]);

    const loadMoreTools = async () => {
        setLoading(true);

        const lastTool = tools[tools.length - 1];

        const lastToolObj = {
            lastCreatedAt: lastTool._createdAt,
            lastID: lastTool._id
        };

        const { lastCreatedAt, lastID } = lastToolObj;

        try {
            const moreTools = await getMoreTools(
                lastCreatedAt,
                lastID
            );

            setTools([...tools, ...moreTools]);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        // declare the data fetching function
        const fetchToolsByCategories = async categories => {
            try {
                const toolsByCategories = await getToolsByCategories(
                    categories
                );

                return toolsByCategories;
            } catch (error) {
                console.error(error);
                return false;
            }
        };

        if (categories.length) {
            console.log("categories.length");

            fetchToolsByCategories(categories)
                .then(toolsByCategories =>
                    setTools(toolsByCategories)
                )
                // make sure to catch any error
                .catch(console.error);
        }

        setLoading(false);
    }, [categories]);

    return (
        <Container large>
            <div className="my-20 w-full">
                <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
                        Explore AI
                    </span>{" "}
                    Tools Today
                </h1>
                <p className="text-center text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
                    Explore, search, and unlock powerful AI tools for
                    your projects.
                </p>
            </div>

            <div className="w-full">
                {toolCategories.map(category => (
                    <div
                        key={category.title}
                        className="inline-block">
                        <Badge
                            title={category.title}
                            categories={categories}
                            setCategories={setCategories}
                        />
                    </div>
                ))}
            </div>

            <div className="my-12 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-4">
                {tools.map(tool => (
                    <ToolList key={tool._id} tool={tool} />
                ))}
            </div>

            {numTools !== tools.length && !categories.length && (
                <div className="flex justify-center py-3">
                    <LoadingButton
                        title="Load More"
                        loading={isLoading}
                        loadMorePosts={loadMoreTools}
                    />
                </div>
            )}
        </Container>
    );
}
