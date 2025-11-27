import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Loading Todos...</h1>
            <Image src="/globe.svg" alt="Loading" width={50} height={50} className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin"/>
        </div>
    );
}