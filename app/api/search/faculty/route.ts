import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { searchTerm } = await req.json();

    const faculties = await prisma.faculty.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: "insensitive",
            },
        },
        include: {
            _count: {
                select: { professors: true, students: true },
            },
        },
        orderBy: { id: "asc" },
    });

    return NextResponse.json(faculties);
}
