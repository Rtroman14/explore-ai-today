import { groq } from "next-sanity";

// Get all posts
export const postquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
}
`;

// Get n featured posts
export const fetchFeaturedPosts = groq`
*[_type == "post" && featured == true] | order(publishedAt desc, _createdAt desc)[0..5] {
    ...,
    author->,
    categories[]->,
    mainImage {
        ...,
        "blurDataURL":asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background,
    },
}
`;

// Get most recent n posts
export const mostRecentPosts = groq`
*[_type == "post" && featured == false] | order(publishedAt desc, _createdAt desc)[0..7] {
    _id,
    _createdAt,
    publishedAt,
    slug,
    title,
    excerpt,
    mainImage,
    author->,
    categories[]->,
    mainImage {
        ...,
        "blurDataURL":asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background,
    },
  }
`;

// fetch more posts
export const moreRecentPosts = groq`
*[_type == "post" && featured == false && (
    publishedAt < $lastPublishedAt
    || (publishedAt == $lastPublishedAt && _id > $lastID)
)] | order(publishedAt desc)[0..3] {
    _id,
    _createdAt,
    publishedAt,
    slug,
    title,
    excerpt,
    mainImage,
    author->,
    categories[]->,
    mainImage {
        ...,
        "blurDataURL":asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background,
    },
}
`;

// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
  categories[]->
}
`;
// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->
}
`;

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  ...,
}
`;

// Single Post
export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}
`;

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;
export const authorsquery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`;

// Sitemap
export const sitemapPost = groq`
*[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
}
`;
export const sitemapAuthor = groq`
*[_type == "category" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
}
`;

// Get Posts by Authors
export const postsbyauthorquery = groq`
*[_type == "post" && $slug match author->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get Posts by Category
export const postsbycatquery = groq`
*[_type == "post" && $slug in categories[]->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get top 5 categories
export const catquery = groq`*[_type == "category"] {
  ...,
  "count": count(*[_type == "post" && references(^._id)])
} | order(count desc) [0...5]`;

export const searchquery = groq`*[_type == "post" && _score > 0]
| score(title match $query || excerpt match $query || pt::text(body) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage,
  author->,
  categories[]->,
   title,
   slug
}`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author"] {
 ...,
 'slug': slug.current,
}
`;

export const numPosts = groq`
    count(*[_type == "post" && featured == false])
`;

// * Tools
// Get all tools
export const toolquery = groq`
*[_type == "tool"] | order(_createdAt desc) {
    title,
    categories[]->{title},
    image,
    website,
    description,
    pricing,
    startingPrice,
    slug,
    _createdAt
}
`;

// Get all Tool Categories
export const toolCategoryQuery = groq`
*[_type == "toolCategory"] | order(title asc) {
    title
}
`;

export const numTools = groq`
    count(*[_type == "tool"])
`;

// Get n tools
export const fetchSomeTools = groq`
*[_type == "tool"] | order(_createdAt desc)[0..15] {
    title,
    categories[]->{title},
    image,
    website,
    description,
    pricing,
    startingPrice,
    slug,
    _createdAt,
    _id}
`;

// fetch more posts
export const fetchMoreTools = groq`
*[_type == "tool" && (
    _createdAt < $lastCreatedAt
    || (_createdAt == $lastCreatedAt && _id > $lastID)
)] | order(_createdAt desc)[0..11] {
    title,
    categories[]->{title},
    image,
    website,
    description,
    pricing,
    startingPrice,
    slug,
    _createdAt,
    _id
}
`;

export const filterToolsByCategories = groq`
*[count((categories[]->title)[@ in $categories]) > 0] {
    title,
    categories[]->{title},
    image,
    website,
    description,
    pricing,
    startingPrice,
    slug,
    _createdAt,
    _id,
}
`;
