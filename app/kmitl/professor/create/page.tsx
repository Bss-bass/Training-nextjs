import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createProfessor(formData: FormData) {
    'use server';

    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const faculty_id = parseInt(formData.get('faculty_id') as string);

    const professor = await prisma.professor.create({
        data: {
            first_name,
            last_name,
            faculty: { connect: { id: faculty_id } },
        }
    });

    console.log('Created professor:', professor);
    redirect('/kmitl');
}

export default function Page() {
    const facultyOptions = async () => {
        const faculties = await prisma.faculty.findMany();
        return faculties.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
                {faculty.name}
            </option>
        ));
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Create Professor Page</h1>
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={createProfessor}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                                First Name
                            </label>
                            <input
                                id="first_name"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="first_name"
                                placeholder="John"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="last_name"
                                placeholder="Doe"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="faculty_id">
                                Faculty ID
                            </label>
                            <select
                                id="faculty_id"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="faculty_id"
                            >
                                <option value="">Select Faculty</option>
                                {facultyOptions()}
                            </select>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Create Professor
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}