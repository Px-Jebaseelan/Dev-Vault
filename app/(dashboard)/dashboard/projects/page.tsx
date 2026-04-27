import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProjectCard } from "@/components/dashboard/ProjectCard"

export default async function ProjectsPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return null
  }

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-slate-400 mt-2">Manage your portfolio projects.</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Plus className="h-4 w-4" /> Add Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-800 rounded-lg bg-slate-900/50">
          <div className="rounded-full bg-slate-800 p-3 mb-4">
            <Plus className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium mb-1">No projects created</h3>
          <p className="text-slate-400 text-center mb-4 max-w-sm">
            You haven't created any projects yet. Add a project to show it off in your portfolio.
          </p>
          <Link href="/dashboard/projects/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Add New Project
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
