import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCourse(formData: FormData) {
    'use server';

    const course_name = formData.get('course_name') as string;
    const course_code = formData.get('course_code') as string;
    const credits = parseInt(formData.get('credits') as string);

    console.log(course_name, course_code, credits);

    const course = await prisma.course.create({
        data: {
            course_name,
            course_code,
            credits,
        }
    });

    console.log('Created course:', course);
    redirect('/kmitl');
}


export default function Page() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Create Course Page</h1>
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={createCourse}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_name">
                                Course Name
                            </label>
                            <input
                                id="course_name"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="course_name"
                                placeholder="Introduction to Programming"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_code">
                                Course Code
                            </label>
                            <input
                                id="course_code"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="course_code"
                                placeholder="CS101"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="credits">
                                Credits
                            </label>
                            <input
                                id="credits"
                                type="number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="credits"
                                placeholder="3"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Create Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    ); 
}