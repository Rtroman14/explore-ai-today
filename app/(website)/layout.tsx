import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
// import Navbar from "@/components/navbar";
import NavbarAlt from "@/components/navbaralt";

export async function sharedMetaData(params) {
    const settings = await getSettings();

    return {
        metadataBase: new URL(settings.url),
        title: {
            default: settings?.title || "Explore AI Today",
            template: "%s | Explore AI Today"
        },
        description:
            settings?.description ||
            "Pro version of Stablo, popular open-source next.js and sanity blog template",
        keywords: ["Next.js", "Sanity", "Tailwind CSS"],
        authors: [{ name: "Ryan" }],
        // icons: {
        //     icon: "/favicon.ico"
        // },
        canonical: settings?.url,
        openGraph: {
            images: [
                {
                    url:
                        urlForImage(settings?.openGraphImage)?.src ||
                        "/img/opengraph.jpg",
                    width: 800,
                    height: 600
                }
            ]
        },
        twitter: {
            title: settings?.title || "Explore AI Today",
            card: "summary_large_image"
        },
        robots: {
            index: true,
            follow: true
        }
    };
}

export async function generateMetadata({ params }) {
    return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
    const settings = await getSettings();

    return (
        <>
            {/* <Navbar {...settings} /> */}
            <NavbarAlt {...settings} />

            <div>{children}</div>

            <Footer {...settings} />
        </>
    );
}
