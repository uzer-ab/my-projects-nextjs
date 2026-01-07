import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

type Params = { filename: string };
type Props = { params: Promise<Params> };

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { filename } = await params;

        // Sanitize filename to prevent directory traversal
        const sanitizedFilename = path.basename(filename);

        if (!sanitizedFilename.endsWith(".pdf")) {
            return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), "src", "data", "resumes", sanitizedFilename);

        const fileBuffer = await readFile(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="${sanitizedFilename}"`,
            },
        });
    } catch (error) {
        console.error("Resume serve error:", error);
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
}
