"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const btnClass =
    "py-3 px-5 w-full text-sm font-light rounded border border-white sm:rounded-none sm:rounded-r-lg text-black sm:text-white sm:bg-transparent bg-white hover:bg-white hover:text-black transition duration-200";
const loadingBtnClass =
    "py-3 px-5 w-full text-sm font-light rounded border border-white sm:rounded-none sm:rounded-r-lg text-white bg-transparent cursor-not-allowed";

export default function NewsletterSection() {
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        setError(false);
        setLoading(true);

        const data = {
            email: event.target.email.value
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(
            "/api/email/newsletter",
            options
        );

        const result = await response.json();

        if (result.success) {
            setSubmit(true);
        } else {
            setError(true);
        }

        setLoading(false);
    };

    return (
        <section className="my-14 bg-gray-800">
            <AnimatePresence mode="wait">
                <motion.div
                    key={submit ? "0" : "1"}
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                    {!submit ? (
                        <div className="mx-auto max-w-screen-md sm:text-center">
                            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Sign up for our newsletter
                            </h2>
                            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 dark:text-gray-400 sm:text-xl md:mb-12">
                                Don&apos;t miss out on the best tools
                                and latest news about artificial
                                intelligence! Sign up today to stay
                                up-to-date and ahead of the curve.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="mx-auto mb-3 max-w-screen-sm items-center space-y-4 sm:flex sm:space-y-0">
                                    <div className="relative w-full">
                                        <label className="mb-2 hidden text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Email address
                                        </label>
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg
                                                className="h-5 w-5 text-gray-200"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                            </svg>
                                        </div>
                                        <input
                                            className="block w-full rounded border border-gray-600 bg-gray-700 p-3 pl-10 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none sm:rounded-none sm:rounded-l-lg"
                                            placeholder="Enter your email"
                                            type="email"
                                            id="email"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className={
                                                loading
                                                    ? loadingBtnClass
                                                    : btnClass
                                            }>
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                                {error && (
                                    <div className="mx-auto max-w-screen-sm text-left text-sm text-red-500">
                                        There was an error. Try again.
                                    </div>
                                )}
                                {/* <div className="newsletter-form-footer mx-auto max-w-screen-sm text-left text-sm text-gray-500 dark:text-gray-300">
                                    We care about the protection of
                                    your data.{" "}
                                    <a
                                        href="#"
                                        className="font-medium underline">
                                        Read our Privacy Policy
                                    </a>
                                    .
                                </div> */}
                            </form>
                        </div>
                    ) : (
                        <ThankYou />
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}

const ThankYou = () => {
    return (
        <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Email Subscribed!
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 dark:text-gray-400 sm:text-xl md:mb-12">
                Your email has been successfully added to our list,
                and we&apos;re thrilled to have you join our community
                of AI enthusiasts. You can look forward to receiving
                the latest news, advancements, and tools in AI,
                delivered straight to your inbox. Please check your
                email for a confirmation message.
            </p>
        </div>
    );
};
