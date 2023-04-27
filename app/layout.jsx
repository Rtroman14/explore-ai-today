import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { cx } from "@/utils/all";
import { Montserrat, Oxanium } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--body-font"
});
const oxanium = Oxanium({
    subsets: ["latin"],
    variable: "--display-font"
});

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cx(montserrat.variable, oxanium.variable)}>
            <body className="bg-black font-body text-gray-400 antialiased">
                <Providers>{children}</Providers>
                <Analytics />
            </body>
        </html>
    );
}
