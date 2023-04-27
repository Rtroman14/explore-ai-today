import { getSettings } from "@/lib/sanity/client";
import Contact from "./contact";

export const metadata = {
    title: "Contact"
};

export default async function ContactPage() {
    const settings = await getSettings();

    return <Contact settings={settings} />;
}

// export const revalidate = 60;
