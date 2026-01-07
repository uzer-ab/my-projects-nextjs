import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/data/prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.username) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("resume") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        if (file.type !== "application/pdf") {
            return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
        }

        const username = session.user.username;
        const resumeDir = path.join(process.cwd(), "src", "data", "resumes");
        const fileName = `${username}.pdf`;
        const filePath = path.join(resumeDir, fileName);

        // Ensure directory exists
        await mkdir(resumeDir, { recursive: true });

        // Write file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Update database with relative path
        const resumeUrl = `/data/resumes/${fileName}`;
        await prisma.users.update({
            where: { username },
            data: { resumeUrl },
        });

        return NextResponse.json({
            message: "Resume uploaded successfully",
            resumeUrl
        });
    } catch (error) {
        console.error("Resume upload error:", error);
        return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const session = await auth();
        if (!session?.user?.username) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Clear resume URL in database
        await prisma.users.update({
            where: { username: session.user.username },
            data: { resumeUrl: null },
        });

        return NextResponse.json({ message: "Resume removed" });
    } catch (error) {
        console.error("Resume delete error:", error);
        return NextResponse.json({ error: "Failed to remove resume" }, { status: 500 });
    }
}
