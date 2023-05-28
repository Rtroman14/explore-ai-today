import Tool from "./Tool";

// export async function generateStaticParams() {
//     return await getAllPostsSlugs();
// }

// export async function generateMetadata({ params }) {
//     const post = await getPostBySlug(params.slug);
//     return { title: post.title };
// }

export default async function ToolPage({ params }) {
    // const post = await getPostBySlug(params.slug);

    const tool = params;

    return <Tool tool={tool} />;
}

// export const revalidate = 60;
// export const revalidate = 3600;
