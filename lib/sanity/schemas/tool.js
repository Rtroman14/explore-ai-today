export default {
    name: "tool",
    title: "Tool",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96
            }
        },
        {
            name: "description",
            title: "Description",
            description: "Short description below image",
            type: "string",
            rows: 3,
            validation: Rule => Rule.max(200)
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true
            }
        },
        {
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "toolCategory" } }]
        },
        {
            name: "website",
            title: "Website",
            type: "url",
            validation: Rule =>
                Rule.uri({
                    scheme: ["http", "https"]
                })
        },
        {
            name: "pricing",
            title: "Pricing",
            type: "string",
            description:
                "Freemium is a business model in which a company offers basic or limited features to users at no cost and then charges a premium for supplemental or advanced features.",
            options: {
                list: [
                    { title: "Free", value: "free" },
                    { title: "Freemium", value: "freemium" },
                    { title: "Paid", value: "paid" }
                ]
            }
        },
        {
            name: "startingPrice",
            title: "Starting Price",
            description: "Lowest monthly price option.",
            type: "number"
        },
        {
            name: "videoUrl",
            title: "Video Url",
            type: "url",
            validation: Rule =>
                Rule.uri({
                    scheme: ["http", "https"]
                })
        }
    ]
};
