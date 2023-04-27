import SearchInput from "@/components/ui/search";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import Label from "@/components/ui/label";
import DateTime from "@/components/ui/time";
import Newsletter from "@/components/Newsletter/Newsletter_Footer";

export default function Sidebar(props) {
    return (
        <div className="mt-5">
            {/* <Searchbar /> */}

            <div className="hidden md:block">
                <h3 className="text-2xl font-bold dark:text-white">
                    Subscribe To Newsletter
                </h3>
                <p>
                    Don't miss out on the best tools and latest news
                    about artificial intelligence! Sign up today to
                    stay up-to-date and ahead of the curve.
                </p>

                <Newsletter />
            </div>

            {props.related && (
                <RelatedPosts related={props.related} />
            )}
            {props.categories && (
                <Categories categories={props.categories} />
            )}
        </div>
    );
}

// function Searchbar() {
//     return (
//         <div>
//             <h3 className="text-2xl font-bold dark:text-white">
//                 Search Posts
//             </h3>
//             <form action="/search" method="GET" className="mt-4">
//                 <SearchInput placeholder="Search" />
//             </form>
//         </div>
//     );
// }

function RelatedPosts({ related }) {
    return (
        <div className="mt-10">
            <h3 className="text-2xl font-bold dark:text-white">
                Related
            </h3>
            <div className="mt-6 grid gap-6">
                {related.slice(0, 3).map((item, index) => {
                    const imageProps = item?.image
                        ? urlForImage(item?.image)
                        : null;
                    return (
                        <Link
                            key={index}
                            href={`/post/${item.slug.current}`}>
                            <div className="flex gap-5">
                                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md">
                                    <Image
                                        src={imageProps.src}
                                        loader={imageProps.loader}
                                        alt={
                                            item.title || "Thumbnail"
                                        }
                                        fill
                                        sizes="100vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium dark:text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        <DateTime date={item.date} />
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

function Categories({ categories }) {
    return (
        <div className="mt-10">
            <h3 className="text-2xl font-bold dark:text-white">
                Categories
            </h3>
            <ul className="mt-4 grid">
                {categories.map((item, index) => (
                    <li key={item._id}>
                        <Link
                            href={`/category/${item.slug.current}`}
                            className="flex items-center justify-between py-2">
                            <h4 className="text-gray-800 dark:text-gray-400">
                                {item.title}
                            </h4>
                            <Label pill={true} color={item.color}>
                                {item.count}
                            </Label>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
