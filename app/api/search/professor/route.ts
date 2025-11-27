import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { searchTerm, filter } = await req.json();

    const professors = await prisma.professor.findMany({
        where: filter === "Full Name"
            ? {
                  OR: [
                      { first_name: { contains: searchTerm, mode: "insensitive" } },
                      { last_name: { contains: searchTerm, mode: "insensitive" } },
                  ],
              }
            : {
                  faculty: {
                      name: {
                          contains: searchTerm,
                          mode: "insensitive",
                      },
                  },
              },
        include: { faculty: true },
        orderBy: { id: "asc" },
    });

    return NextResponse.json(professors);
}
