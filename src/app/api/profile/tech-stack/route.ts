import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/data/prisma/client";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.username) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.users.findUnique({
            where: { username: session.user.username },
            select: { techStack: true },
        });

        return NextResponse.json({ techStack: user?.techStack || [] });
    } catch (error) {
        console.error("Tech stack GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.username) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { techStack } = await request.json();

        if (!Array.isArray(techStack)) {
            return NextResponse.json({ error: "Invalid tech stack format" }, { status: 400 });
        }

        const user = await prisma.users.update({
            where: { username: session.user.username },
            data: { techStack },
            select: { techStack: true },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Tech stack PUT error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
