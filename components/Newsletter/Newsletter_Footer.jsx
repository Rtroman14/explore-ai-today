"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const btnClass =
    "w-full mt-2 sm:bg-transparent bg-white hover:bg-white hover:text-black text-black sm:text-white font-light py-2 px-4 border border-white hover:border-transparent rounded transition duration-200";
const loadingBtnClass =
    "w-full mt-2 bg-transparent text-white font-light py-2 px-4 border border-white rounded cursor-not-allowed";

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
        <div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={submit ? "0" : "1"}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    {!submit ? (
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6">
                            <div>
                                <label className="sr-only">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    className="block w-full rounded-md border border-gray-400 bg-gray-800 p-3 text-sm text-white caret-blue-600 focus:border-white focus:outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className={
                                    loading
                                        ? loadingBtnClass
                                        : btnClass
                                }>
                                Subscribe
                            </button>
                            {error && (
                                <div className="mt-2">
                                    <h2 className="font-semibold text-red-500">
                                        There was an error. Try again.
                                    </h2>
                                </div>
                            )}
                        </form>
                    ) : (
                        <div className="mt-6">
                            <p className="font-semibold text-green-500">
                                You have successfully subscribed!
                            </p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
