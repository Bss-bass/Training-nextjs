'use client';

import Link from "next/link";

export default function Error({ error }: { error: Error & { digest?: string } }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
            <p className="text-lg mb-2">{error.message}</p>
            {error.digest && (
                <p className="text-sm text-gray-500">Error Code: {error.digest}</p>
            )}
            <Link href="/todos" className="p-2 bg-blue-500 text-white rounded mt-3">Back to Todos</Link>
        </div>
    );
}