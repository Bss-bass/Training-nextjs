import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { searchTerm } = await req.json();

    const courses = await prisma.course.findMany({
        where: {
            course_name: {
                contains: searchTerm,
                mode: "insensitive",
            },
        },
        orderBy: { course_code: "asc" },
    });

    return NextResponse.json(courses);
}
