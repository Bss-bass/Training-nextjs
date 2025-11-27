import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { searchTerm, filter, id } = await req.json();

    const whereClause = id ? { id: id } : null;

    const students = await prisma.student.findMany({
        where: filter === "Full Name"
            ? {
                  OR: [
                      { first_name: { contains: searchTerm, mode: "insensitive" } },
                      { last_name: { contains: searchTerm, mode: "insensitive" } },
                    ],
                }
            : filter === "Email" ?
                {
                    profile: {
                        email: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                }
            : {
                  faculty: {
                      name: {
                          contains: searchTerm,
                          mode: "insensitive",
                      },
                  },
              },
        include: { faculty: true, profile: true, enrolled_sections: { include: { course: true } } },
        orderBy: { student_id: "asc" },
    });

    if (whereClause) {
        return NextResponse.json(students.filter(student => student.id === id));
    }

    return NextResponse.json(students);
}
