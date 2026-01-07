import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProjectForm } from "@/components/dashboard/ProjectForm";

export default async function NewProjectPage() {
    const session = await auth();

    if (!session?.user?.username) {
        redirect("/auth/login");
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <ProjectForm username={session.user.username} />
            </div>
        </div>
    );
}
