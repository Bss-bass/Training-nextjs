'use client';

import Link from "next/link";
import SearchBar from "@/app/component/others/SearchBar";
// import ProfessorTable from "@/app/component/ProfessorTable";
import Table from "@/app/component/others/Table";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

type Professor = {
    id: number;
    first_name: string;
    last_name: string;
    faculty?: {
        name: string;
    } | null;
};

export default function ProfessorPage() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q") || "";
    const filter = searchParams.get("filter") || "Full Name";

    const [professors, setProfessors] = useState<Professor[]>([]);

    useEffect(() => {
        async function fetchProfessors() {
            const response = await fetch(`/api/search/professor`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ searchTerm: q, filter }),
            });
            const data = await response.json();
            setProfessors(data);
        }
        fetchProfessors();
    }, [q, filter]);

    const filters = ['Full Name', 'Faculty'];

    const columns = [
        { key: "id", label: "ID" },
        {
            key: "full_name",
            label: "Full Name",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (p: any) => `${p.first_name} ${p.last_name}`,
        },
        {
            key: "faculty",
            label: "Faculty",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (p: any) => p.faculty?.name || "-",
        },
    ];
    return (
        <>
            <div className="mb-6 text-gray-800 flex sm:flex-row flex-col gap-4 justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-orange-500">Professor Dashboard</h1>
                        <p className="text-gray-500">
                            Total <span className="font-medium text-blue-500">{professors.length}</span> Professor{professors.length !== 1 ? "s" : ""}
                        </p>
                        <Link href="/kmitl/professor/create" className="px-3 py-1.5 w-fit rounded-lg bg-orange-500 text-white hover:bg-orange-600">Create Professor</Link>
                    </div>
                </div>
                <SearchBar filters={filters} searchParams={{ q, filter }} />
            </div>
            {/* <ProfessorTable professors={professors} /> */}
            <Table columns={columns} data={professors}></Table>
        </>
    );
}