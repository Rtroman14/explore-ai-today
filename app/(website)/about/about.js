import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
// import Newsletter from "@/components/Newsletter/Newsletter_Section";

export default function About({ authors, settings }) {
    return (
        <Container>
            <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
                About
            </h1>
            <div className="text-center">
                <p className="text-lg">
                    We are a small passionate team.
                </p>
            </div>

            <div className="mb-16 mt-6 grid grid-cols-3 gap-5 md:mb-32 md:mt-16 md:gap-16">
                {authors.slice(0, 3).map(author => {
                    const imageProps =
                        urlForImage(author?.image) || null;
                    return (
                        <div
                            key={author._id}
                            className="relative aspect-square overflow-hidden rounded-md odd:translate-y-10 odd:md:translate-y-16">
                            <Link href={`/author/${author.slug}`}>
                                <Image
                                    src={imageProps.src}
                                    alt={author.name || " "}
                                    fill
                                    sizes="(max-width: 320px) 100vw, 320px"
                                    className="object-cover"
                                />
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div className="prose mx-auto mt-14 text-center dark:prose-invert">
                <p>
                    Welcome to Explore AI Today, your daily dose of
                    all things artificial intelligence! Our mission is
                    to empower you with the latest insights, trends,
                    and breakthroughs in the ever-evolving world of
                    AI. We strive to deliver valuable and actionable
                    content, meticulously curated to help you stay at
                    the forefront of this rapidly advancing
                    technology. With a focus on AI applications,
                    tools, and real-world solutions, our blog is
                    dedicated to inspiring and informing readers like
                    you.
                </p>
                <p>
                    Our passionate team of AI enthusiasts and experts
                    works tirelessly to bring you a diverse range of
                    topics, ensuring that you are always in the know.
                    Join us on this exciting journey as we explore the
                    infinite potential of AI together, and stay ahead
                    of the curve with Explore AI Today!
                </p>
                <p>
                    <Link href="/contact">Get in touch</Link>
                </p>
            </div>

            {/* <Newsletter /> */}
        </Container>
    );
}
