import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createFaculty(data: FormData) {
    'use server';

    const name = data.get('name') as string;
    const code = data.get('code') as string;

    const faculty = await prisma.faculty.create({
        data: {
            name,
            code,
        }
    });

    console.log('Created faculty:', faculty);
    redirect('/kmitl');
}

export default function Page() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Create Faculty Page</h1>
                {/* form */}
                <form className="flex flex-col w-1/3" action={createFaculty}>
                    <label className="mb-2 font-semibold">Faculty Name</label>
                    <input type="text" name="name" className="border border-gray-300 p-2 mb-4 rounded"  />
                    <label className="mb-2 font-semibold">Faculty Code</label>
                    <input type="text" name="code" className="border border-gray-300 p-2 mb-4 rounded" />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Faculty</button>
                </form>
            </div>
        </>
    );
}