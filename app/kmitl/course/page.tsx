'use client';

import Link from "next/link";
import SearchBar from "@/app/component/others/SearchBar";
import Table from "@/app/component/others/Table";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

type Course = {
    id: number;
    course_code: string;
    course_name: string;
    credits: number;
};

export default function CoursePage() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q") || "";
    const filter = searchParams.get("filter") || "Name";

    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        async function fetchCourses() {
            const response = await fetch(`/api/search/course`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ searchTerm: q, filter }),
            });
            const data = await response.json();
            setCourses(data);
        }
        fetchCourses();
    }, [q, filter]);

    const filters = ['Name'];

    // Course code, Name, Credits
    const columns = [
        { key: "course_code", label: "Course Code" },
        { key: "course_name", label: "Course Name" },
        { key: "credits", label: "Credits" },
    ];

    return (
        <>
            <div className="mb-6 text-gray-800 flex sm:flex-row flex-col gap-4 justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-orange-500">Course Dashboard</h1>
                        <p className="text-gray-500">
                            Total <span className="font-medium text-blue-500">{courses.length}</span> Course{courses.length !== 1 ? "s" : ""}
                        </p>
                        <div className="flex space-x-3">
                            <Link href="/kmitl/course/create" className="px-3 py-1.5 w-fit rounded-lg bg-orange-500 text-white hover:bg-orange-600">Create Course</Link>
                            <Link href="/kmitl/create-section" className="px-3 py-1.5 w-fit rounded-lg bg-orange-500 text-white hover:bg-orange-600">Create Section</Link>
                        </div>
                    </div>
                </div>
                <SearchBar filters={filters} searchParams={{ q, filter }} />
            </div>
            <Table columns={columns} data={courses}></Table>
        </>
    );
}