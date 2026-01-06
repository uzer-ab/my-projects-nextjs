import { NextRequest, NextResponse } from "next/server";
import { projectsRepository } from "@/data/projects/repository";

// Enable CORS for external access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
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
      return NextResponse.json(
        { error: "User or projects not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(result, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
