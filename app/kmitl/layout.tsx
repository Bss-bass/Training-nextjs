import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* create navbar Professor, Student, Faculty, Course */}
            <nav className="flex justify-between p-4 bg-blue-500 text-white px-10">
                <div className="flex space-x-6 items-center">
                    <div className="text-3xl">
                        <Link href="/kmitl">KMITL</Link>
                    </div>
                    <div>
                        <Link href="/kmitl/faculty" className="hover:underline">
                            Faculty
                        </Link>
                    </div>
                    <div>
                        <Link href="/kmitl/professor" className="hover:underline">
                            Professor
                        </Link>
                    </div>
                    <div>
                        <Link href="/kmitl/course" className="hover:underline">
                            Course
                        </Link>
                    </div>
                    <div>
                        <Link href="/kmitl/student" className="hover:underline">
                            Student
                        </Link>
                    </div>
                </div>
                <div className="flex items-center">
                    <p>Welcome Admin!</p>
                </div>
            </nav>
            <main className="p-6 max-w-8xl mx-20">{children}</main>
        </>
    );
}