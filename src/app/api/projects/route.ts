import { NextRequest, NextResponse } from "next/server";
import { projectsRepository } from "@/data/projects/repository";
import { auth } from "@/lib/auth";
import { prisma } from "@/data/prisma/client";

// Enable CORS for external access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username");
    const onlyVisible = searchParams.get("onlyVisible") === "true";

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await projectsRepository.findByUsername(
      username,
      onlyVisible
    );

    if (!result) {
      return NextResponse.json([], { status: 200, headers: corsHeaders });
    }

    // Hydrate normalized data into array
    const projects = Object.values(result.projects).map((p) => ({
      ...p,
      tools: p.tools.map((id) => result.tools[id]),
      links: p.links.map((id) => result.links[id]),
      images: [], // Repository doesn't return images yet, returning empty array
    }));

    // Sort by createdAt desc (repository does this but Object.values might lose order, though usually numeric keys order is complex. 
    // Actually repository projects is Record<number, ...>. 
    // Best to sort again to be safe.
    projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(projects, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const body = await request.json();
    const { name, description, show, tools, links, images } = body;

    if (!name || !description) {
      return NextResponse.json({ error: "Name and description required" }, { status: 400, headers: corsHeaders });
    }

    const project = await prisma.projects.create({
      data: {
        username: session.user.username,
        name,
        description,
        show: show ?? true,
        tool: {
          create: tools?.map((t: { name: string; type: string; description?: string }) => ({
            name: t.name,
            type: t.type,
            description: t.description || "",
          })) || [],
        },
        link: {
          create: links?.map((l: { title: string; url: string }) => ({
            title: l.title,
            url: l.url,
          })) || [],
        },
        images: {
          create: images?.map((i: { url: string; alt?: string }, idx: number) => ({
            url: i.url,
            alt: i.alt || "",
            order: idx,
          })) || [],
        },
      },
      include: {
        tool: true,
        link: true,
        images: true,
      },
    });

    return NextResponse.json(project, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Projects POST error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const body = await request.json();
    const { id, name, description, show, tools, links, images } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400, headers: corsHeaders });
    }

    // Verify ownership
    const existing = await prisma.projects.findFirst({
      where: { id, username: session.user.username },
    });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404, headers: corsHeaders });
    }

    // Delete existing related items
    await prisma.tools.deleteMany({ where: { project_id: id } });
    await prisma.project_links.deleteMany({ where: { project_id: id } });
    await prisma.project_images.deleteMany({ where: { project_id: id } });

    // Update project with new data
    const project = await prisma.projects.update({
      where: { id },
      data: {
        name,
        description,
        show: show ?? true,
        tool: {
          create: tools?.map((t: { name: string; type: string; description?: string }) => ({
            name: t.name,
            type: t.type,
            description: t.description || "",
          })) || [],
        },
        link: {
          create: links?.map((l: { title: string; url: string }) => ({
            title: l.title,
            url: l.url,
          })) || [],
        },
        images: {
          create: images?.map((i: { url: string; alt?: string }, idx: number) => ({
            url: i.url,
            alt: i.alt || "",
            order: idx,
          })) || [],
        },
      },
      include: {
        tool: true,
        link: true,
        images: true,
      },
    });

    return NextResponse.json(project, { headers: corsHeaders });
  } catch (error) {
    console.error("Projects PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400, headers: corsHeaders });
    }

    // Verify ownership
    const existing = await prisma.projects.findFirst({
      where: { id: parseInt(id), username: session.user.username },
    });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404, headers: corsHeaders });
    }

    await prisma.projects.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "Project deleted" }, { headers: corsHeaders });
  } catch (error) {
    console.error("Projects DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}

