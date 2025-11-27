import prisma from "@/lib/prisma";
import type { DayOfWeek } from "../../generated/prisma/client";
import { redirect } from "next/navigation";

export async function createSection(formData: FormData) {
    'use server';
    const section_number = formData.get('section_number') as string;
    const semester = formData.get('semester') as string;
    const day_of_week = formData.get('day_of_week') as DayOfWeek;
    const capacity = parseInt(formData.get('capacity') as string);
    const course_id = parseInt(formData.get('course_id') as string);
    const professor_id = parseInt(formData.get('professor_id') as string);

    const startTime = new Date();
    const [startHours, startMinutes] = (formData.get('start_time') as string).split(':').map(Number);
    startTime.setHours(startHours, startMinutes, 0, 0);

    const endTime = new Date();
    const [endHours, endMinutes] = (formData.get('end_time') as string).split(':').map(Number);
    endTime.setHours(endHours, endMinutes, 0, 0);

    console.log({
        section_number,
        semester,
        day_of_week,
        start_time: startTime,
        end_time: endTime,
        capacity,
        course_id,
        professor_id,
    });

    const section = await prisma.section.create({
        data: {
            section_number,
            semester,
            day_of_week,
            start_time: startTime,
            end_time: endTime,
            capacity,
            course: { connect: { id: course_id } },
            professor: { connect: { id: professor_id } },
        }
    });

    console.log('Created section:', section);
    redirect('/kmitl');
}

export default function Page() {
    const courseOptions = prisma.course.findMany().then(courses =>
        courses.map(course => (
            <option key={course.id} value={course.id}>
                {course.course_code} - {course.course_name}
            </option>
        ))
    );

    const professorOptions = prisma.professor.findMany().then(professors =>
        professors.map(professor => (
            <option key={professor.id} value={professor.id}>
                {professor.first_name} {professor.last_name}
            </option>
        ))
    );

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Create Section Page</h1>
                {/* form section_number, semester, day_of_week, start_time, end_time, capacity, course_id, professor_id */}
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={createSection}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="section_number">
                                Section Number
                            </label>
                            <input
                                id="section_number"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="section_number"
                                placeholder="001"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
                                Semester
                            </label>
                            <input
                                id="semester"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="semester"
                                placeholder="2/2568"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day_of_week">
                                Day of Week
                            </label>
                            <select
                                id="day_of_week"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="day_of_week"
                            >
                                <option value="MON">Monday</option>
                                <option value="TUE">Tuesday</option>
                                <option value="WED">Wednesday</option>
                                <option value="THU">Thursday</option>
                                <option value="FRI">Friday</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_time">
                                Start Time
                            </label>
                            <input
                                id="start_time"
                                type="time"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="start_time"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end_time">
                                End Time
                            </label>
                            <input
                                id="end_time"
                                type="time"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="end_time"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                                Capacity
                            </label>
                            <input
                                id="capacity"
                                type="number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="capacity"
                                placeholder="30"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_id">
                                Course ID
                            </label>
                            <select
                                id="course_id"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="course_id"
                            >
                                {courseOptions}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="professor_id">
                                Professor ID
                            </label>
                            <select
                                id="professor_id"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="professor_id"
                            >
                                {professorOptions}
                            </select>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Create Section
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}