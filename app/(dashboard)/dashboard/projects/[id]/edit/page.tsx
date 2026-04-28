import { ProjectForm } from "@/components/dashboard/ProjectForm"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const { id } = await params
  const project = await prisma.project.findUnique({
    where: { id },
  })

  if (!project || project.userId !== session.user.id) {
    redirect("/dashboard/projects")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeInUp">
      {/* Back nav */}
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Projects
      </Link>

      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Edit Project</h1>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-wider">
            Editing
          </span>
        </div>
        <p className="text-white/40 text-sm">
          Updating &quot;{project.title}&quot; — changes are saved immediately.
        </p>
      </div>

      <ProjectForm project={project} />
    </div>
  )
}
