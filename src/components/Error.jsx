import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();

    return (
        <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-blue-100 to-purple-200 flex items-center justify-center p-4">
            <div className="backdrop-blur-md bg-white/70 border border-white/40 shadow-xl rounded-3xl p-8 max-w-lg w-full text-center">
                <h1 className="text-5xl font-extrabold text-purple-700 mb-3">💥 Error</h1>
                <p className="text-lg text-gray-800 mb-2 font-medium">
                    Something broke... but not your spirit!
                </p>
                <p className="text-sm text-gray-600 mb-6">
                    Don't worry, we'll help you get back on track.
                </p>

                <div className="text-left bg-white/60 rounded-xl p-4 border border-purple-100 mb-6">
                    {error?.message && (
                        <p className="text-sm text-red-700">
                            <span className="font-semibold">Message:</span> {error.message}
                        </p>
                    )}
                    {error?.status && (
                        <p className="text-sm text-red-700 mt-2">
                            <span className="font-semibold">Status:</span> {error.status} - {error.statusText}
                        </p>
                    )}
                </div>

                <a
                    href="/"
                    className="inline-block px-6 py-2 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:scale-105 hover:shadow-lg transition transform duration-300 ease-in-out"
                >
                    🚀 Back to Home
                </a>
            </div>
        </div>
    );
}
