import Script from "next/script";
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
            className={`${montserrat.variable} ${oxanium.variable}`}>
            {/* className={cx(montserrat.variable, oxanium.variable)}> */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-VTZ9P3XX5C"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-VTZ9P3XX5C');
                    `}
            </Script>

            <body className="bg-black font-body text-gray-400 antialiased">
                <Providers>{children}</Providers>
                <Analytics />
            </body>
        </html>
    );
}
