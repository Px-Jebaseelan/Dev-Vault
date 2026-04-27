import { ProjectForm } from "@/components/dashboard/ProjectForm"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/login")
  }

  const { id } = await params
  const project = await prisma.project.findUnique({
    where: { id }
  })

  if (!project || project.userId !== session.user.id) {
    redirect("/dashboard/projects")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-slate-400 mt-2">Update the details of your project.</p>
      </div>
      <ProjectForm project={project} />
    </div>
  )
}
