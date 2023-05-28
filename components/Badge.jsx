"use client";

import { useState } from "react";

export default function Badge({ title, categories, setCategories }) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);

        if (selected) {
            const newCategories = categories.filter(
                category => category !== title
            );

            setCategories(newCategories);
        } else {
            setCategories([...categories, title]);
        }
    };

    return (
        <span
            onClick={handleClick}
            className={`my-1 mr-2 inline-flex cursor-pointer items-center rounded-md border px-2 py-0.5 font-medium transition duration-100 hover:bg-gray-600 hover:text-white ${
                selected
                    ? "border-gray-300 bg-gray-600 text-white"
                    : "border-gray-500 bg-gray-800 text-gray-200"
            }`}>
            {title}
        </span>
    );
}
