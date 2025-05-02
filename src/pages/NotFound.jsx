import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
            <div className="text-[6rem] mb-4">🚫</div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">404</h1>
            <p className="text-lg text-gray-600 mb-6">
                Oops! We couldn’t find the page you’re looking for.
            </p>
            <Link
                to="/"
                className="inline-block bg-gradient-to-r from-red-500 to-yellow-400 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
                Back to Safety
            </Link>
        </div>
    );
}
