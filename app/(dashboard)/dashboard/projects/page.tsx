import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
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
    <div className="space-y-8 animate-fadeInUp max-w-5xl">
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-white/40 mt-1 text-sm">
            {projects.length === 0
              ? "Start building your portfolio"
              : `${projects.length} project${projects.length !== 1 ? "s" : ""} in your vault`}
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 self-start sm:self-auto"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Project
        </Link>
      </div>

      {/* ─── Content ─────────────────────────────────────────────────── */}
      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="h-16 w-16 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M4 12C4 9.79 5.79 8 8 8h16c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V12z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M10 16h12M10 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="text-base font-semibold text-white/80 mb-2">Your vault is empty</h3>
          <p className="text-sm text-white/35 mb-6 max-w-sm leading-relaxed">
            Add your first project to start building your developer portfolio. It only takes a minute.
          </p>
          <Link
            href="/dashboard/projects/new"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Your First Project
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
