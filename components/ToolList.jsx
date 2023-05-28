import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
// import { Tooltip } from "flowbite-react";

export default function ToolList({ tool }) {
    const imageProps = tool?.image ? urlForImage(tool.image) : null;

    return (
        <div className="relative max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition duration-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-400">
            <Link
                className="relative block aspect-[6/4]"
                // href={`/tools/${tool.slug.current}`}>
                href="#">
                {imageProps ? (
                    <Image
                        src={imageProps.src}
                        alt=""
                        className="object-cover transition-all"
                        fill
                        sizes="(max-width: 768px) 30vw, 33vw"
                    />
                ) : (
                    <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                        <PhotoIcon />
                    </span>
                )}
            </Link>
            <div className="p-3">
                <div>
                    <div>
                        {tool.categories.map(category => (
                            <span
                                key={category.title}
                                className="my-1 mr-2 inline-flex cursor-pointer items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-black ring-1 ring-inset ring-blue-700/10 transition duration-200 hover:scale-110">
                                {category.title}
                            </span>
                        ))}
                    </div>
                    <div>
                        {/* <Link href={`/tools/${tool.slug.current}`}> */}
                        <Link href="#">
                            <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 transition duration-200 hover:text-blue-500 dark:text-white hover:dark:text-blue-500">
                                {tool.title}
                            </h5>
                        </Link>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {tool.description.length > 110
                                ? `${tool.description.slice(
                                      0,
                                      110
                                  )}...`
                                : tool.description}
                        </p>
                    </div>
                </div>

                {/* <Tooltip content="Visit Website" style="dark"> */}
                <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-[10px] right-[10px] rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                    {/* className="rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"> */}
                    <div className="h-5 w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                        </svg>
                    </div>
                </a>
                {/* </Tooltip> */}
            </div>
        </div>
    );
}
