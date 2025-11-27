import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createStudent(formData: FormData) {
    'use server';
    const student_id = formData.get('student_id') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const faculty_id = parseInt(formData.get('faculty_id') as string);

    const student = await prisma.student.create({
        data: {
            student_id,
            first_name,
            last_name,
            faculty: { connect: { id: faculty_id } },
        }
    });

    const address = formData.get('address') as string;
    const email = formData.get('email') as string;
    const phone_number = formData.get('phone_number') as string;

    const studentProfile = await prisma.studentProfile.create({
        data: {
            address,
            email,
            phone_number,
            student: { connect: { id: student.id } },
        }
    });

    const section_ids = formData.getAll('section_ids').map(id => parseInt(id as string));

    const updatedStudent = await prisma.student.update({
        where: { id: student.id },
        data: {
            enrolled_sections: {
                connect: section_ids.map(id => ({ id })),
            }
        }
    });

    console.log('Created student:', updatedStudent, studentProfile);
    redirect('/kmitl');
}

export default async function Page() {
    const faculties = await prisma.faculty.findMany();
    const facultyOptions = faculties.map(faculty => (
        <option key={faculty.id} value={faculty.id}>
            {faculty.name}
        </option>
    ));

    const sections = await prisma.section.findMany({ include: { course: true } });
    const sectionOptions = sections.map(section => (
        <option key={section.id} value={section.id}>
            {section.course.course_code} - {section.course.course_name} | Sec {section.section_number} | {section.day_of_week} {new Date(section.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(section.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | {section.semester}
        </option>
    ));

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Create Student</h1>
                <form action={createStudent} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="student_id"
                        placeholder="Student ID"
                        className="border border-gray-300 rounded px-4 py-2"
                        required
                    />
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        className="border border-gray-300 rounded px-4 py-2"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        className="border border-gray-300 rounded px-4 py-2"
                        required
                    />
                    <select
                        name="faculty_id"
                        className="border border-gray-300 rounded px-4 py-2"
                        required
                    >
                        <option value="">Select Faculty</option>
                        {facultyOptions}
                    </select>
                    <textarea
                        name="address"
                        placeholder="Address"
                        className="border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        className="border border-gray-300 rounded px-4 py-2"
                    />
                    {/* select section can select multiple */}
                    <select
                        name="section_ids"
                        className="border border-gray-300 rounded px-4 py-2"
                        multiple
                    >
                        {sectionOptions}
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                    >
                        Create Student
                    </button>
                </form>
            </div>
        </>
    );
}