import Navbar from "../component/pokedex/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="h-screen w-full flex flex-col bg-linear-to-b from-sky-50 to-white">
                <Navbar />
                <main className="p-6 max-w-8xl mx-20 mt-10">{children}</main>
            </div>
        </>
    );
}