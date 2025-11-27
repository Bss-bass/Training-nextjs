'use client';

import Link from "next/link";
import SearchBar from "@/app/component/SearchBar";
import Table from "@/app/component/Table";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

type Faculty = {
    id: number;
    name: string;
    _count?: {
        professors: number;
        students: number;
    };
};

export default function FacultyPage() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q") || "";
    const filter = searchParams.get("filter") || "Name";

    const [faculties, setFaculties] = useState<Faculty[]>([]);

    useEffect(() => {
        async function fetchFaculties() {
            const response = await fetch(`/api/search/faculty`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ searchTerm: q, filter }),
            });
            const data = await response.json();
            setFaculties(data);
        }
        fetchFaculties();
    }, [q, filter]);

    console.log(faculties);

    const filters = ['Name'];

    // ID, Name, Professour Count, Student Count
    const columns = [
        { key: "id", label: "ID" },
        {
            key: "name",
            label: "Name",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (f: any) => f.name,
        },
        {
            key: "professor_count",
            label: "Professor Count",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (f: any) => f._count?.professors || 0,
        },
        {
            key: "student_count",
            label: "Student Count",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (f: any) => f._count?.students || 0,
        },
    ];

    return (
        <>
            <div className="mb-6 text-gray-800 flex sm:flex-row flex-col gap-4 justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-orange-500">Faculty Dashboard</h1>
                        <p className="text-gray-500">
                            Total <span className="font-medium text-blue-500">{faculties.length}</span> Faculty{faculties.length !== 1 ? "ies" : ""}
                        </p>
                        <Link href="/kmitl/faculty/create" className="px-3 py-1.5 w-fit rounded-lg bg-orange-500 text-white hover:bg-orange-600">Create Faculty</Link>
                    </div>
                </div>
                <SearchBar filters={filters} searchParams={{ q, filter }} />
            </div>
            <Table columns={columns} data={faculties}></Table>
        </>
    );
}