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
            select: {
                name: true,
                username: true,
                title: true,
                bio: true,
                description: true,
                techStack: true,
                resumeUrl: true,
                githubUrl: true,
                linkedinUrl: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Profile GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.username) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const allowedFields = ["name", "title", "bio", "description", "resumeUrl", "githubUrl", "linkedinUrl"];

        // Filter to only allowed fields
        const updateData: Record<string, string> = {};
        for (const field of allowedFields) {
            if (field in body) {
                updateData[field] = body[field];
            }
        }

        const user = await prisma.users.update({
            where: { username: session.user.username },
            data: updateData,
            select: {
                name: true,
                username: true,
                title: true,
                bio: true,
                description: true,
                resumeUrl: true,
                githubUrl: true,
                linkedinUrl: true,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Profile PUT error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
