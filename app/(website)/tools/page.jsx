import Tools from "./tools";

import {
    getSomeTools,
    getAllToolCategories,
    getNumTools
} from "@/lib/sanity/client";

export default async function ToolsPage() {
    const toolsReq = getSomeTools();
    const toolCategoriesReq = getAllToolCategories();
    const numToolsReq = getNumTools();

    const [tools, toolCategories, numTools] = await Promise.all([
        toolsReq,
        toolCategoriesReq,
        numToolsReq
    ]);

    return (
        <Tools
            recentTools={tools}
            toolCategories={toolCategories}
            numTools={numTools}
        />
    );
}
