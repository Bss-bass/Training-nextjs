'use client';

import Link from "next/link";
import SearchBar from "@/app/component/SearchBar";
import Table from "@/app/component/Table";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

type Student = {
    id: number;
    first_name: string;
    last_name: string;
    profile?: {
        email?: string;
        phone_number?: string;
    } | null;
    faculty?: {
        name: string;
    } | null;
    enrolled_sections: {
        id: number;
        section_number: string;
        day_of_week: string;
        start_time: string;
        end_time: string;
        semester: string;
        course: {
            course_code: string;
            course_name: string;
        };
    }[];
};

export default function StudentPage() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q") || "";
    const filter = searchParams.get("filter") || "Full Name";

    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        async function fetchStudents() {
            const response = await fetch(`/api/search/student`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ searchTerm: q, filter }),
            });
            const data = await response.json();
            setStudents(data);
        }
        fetchStudents();
    }, [q, filter]);

    console.log(students);

    const filters = ['Full Name', 'Email', 'Faculty'];

    // student ID, Full Name, Email, Phone Number, Faculty, Registration Section, Actions(edit btn)
    const columns = [
        { key: "student_id", label: "Student ID" },
        {
            key: "full_name",
            label: "Full Name",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (s: any) => `${s.first_name} ${s.last_name}`,
        },
        {
            key: "email", label: "Email",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (s: any) => s.profile?.email || "-",
        },
        {
            key: "phone_number", label: "Phone Number",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any  
            render: (s: any) => s.profile?.phone_number || "-",
        },
        {
            key: "faculty",
            label: "Faculty",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (s: any) => s.faculty?.name || "-",
        },
        {
            key: "registration_section", label: "Registration Section",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (s: any) =>
                s.enrolled_sections.length > 0
                    ? (
                        <div className="flex flex-col gap-1">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {s.enrolled_sections.map((section: any) => (
                                <div key={section.id}>
                                    {`${section.course.course_code} - ${section.course.course_name} | Sec ${section.section_number} | ${section.day_of_week} ${new Date(section.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(section.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | ${section.semester}`}
                                </div>
                            ))}
                        </div>
                    )
                    : "-"

        },
        { key: "actions", label: "Actions",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (s: any) => (
                <Link href={`/kmitl/student/${s.id}`} className="px-4 py-2 w-fit rounded-lg bg-orange-500 text-white hover:bg-orange-600">
                    Edit
                </Link>
            )
        },
    ]

    // const columns = [
    //     { key: "id", label: "ID" },
    //     {
    //         key: "full_name",
    //         label: "Full Name",
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         render: (p: any) => `${p.first_name} ${p.last_name}`,
    //     },
    //     {
    //         key: "faculty",
    //         label: "Faculty",
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         render: (p: any) => p.faculty?.name || "-",
    //     },
    // ];
    return (
        <>
            <div className="mb-6 text-gray-800 flex sm:flex-row flex-col gap-4 justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-orange-500">Student Dashboard</h1>
                        <p className="text-gray-500">
                            Total <span className="font-medium text-blue-500">{students.length}</span> Student{students.length !== 1 ? "s" : ""}
                        </p>
                        <Link href="/kmitl/student/create" className="px-3 py-1.5 w-fit rounded-lg bg-orange-500 text-white hover:bg-orange-600">Create Student</Link>
                    </div>
                </div>
                <SearchBar filters={filters} searchParams={{ q, filter }} />
            </div>
            <Table columns={columns} data={students}></Table>
        </>
    );
}