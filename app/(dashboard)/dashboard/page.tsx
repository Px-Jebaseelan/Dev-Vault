import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function DashboardOverview() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      _count: {
        select: { projects: true },
      },
    },
  })

  if (!user) return null

  const recentProjects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 4,
  })

  const firstName = user.name?.split(" ")[0] ?? "there"
  const hourNow = new Date().getHours()
  const greeting = hourNow < 12 ? "Good morning" : hourNow < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="space-y-10 animate-fadeInUp max-w-5xl">
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-sm text-white/35 mb-1 font-medium">{greeting} 👋</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {firstName}&apos;s Vault
          </h1>
          <p className="text-white/40 mt-1 text-sm">Here&apos;s what&apos;s happening with your portfolio.</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 self-start sm:self-auto"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New Project
        </Link>
      </div>

      {/* ─── Stats ───────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Projects */}
        <div className="surface-card rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Total Projects</p>
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 6C2 4.9 2.9 4 4 4h7c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6z" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M5 7.5h5M5 9.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-white tabular-nums">{user._count.projects}</p>
          <p className="text-xs text-white/30 mt-1">
            {user._count.projects === 0 ? "No projects yet" : user._count.projects === 1 ? "project in vault" : "projects in vault"}
          </p>
        </div>

        {/* Member Since */}
        <div className="surface-card rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Member Since</p>
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="2" y="3" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M5 2v2M10 2v2M2 7h11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">
            {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </p>
          <p className="text-xs text-white/30 mt-1">account created</p>
        </div>

        {/* Quick CTA */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-violet-600/20 to-indigo-600/10 border border-violet-500/20 relative overflow-hidden group hover:border-violet-500/40 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-300/60">Quick Action</p>
          </div>
          <p className="text-base font-semibold text-white mb-1">Add your first project</p>
          <p className="text-xs text-white/40 mb-4 leading-relaxed">Start building your portfolio by adding a project.</p>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 hover:text-violet-200 transition-colors"
          >
            Get started
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ─── Recent Projects ──────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Recent Projects</h2>
          <Link
            href="/dashboard/projects"
            className="text-xs text-white/35 hover:text-violet-400 transition-colors flex items-center gap-1"
          >
            View all
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 6h6M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center py-14 text-center">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9C3 7.35 4.35 6 6 6h12c1.65 0 3 1.35 3 3v8c0 1.65-1.35 3-3 3H6c-1.65 0-3-1.35-3-3V9z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-white/60 mb-1">No projects yet</p>
            <p className="text-xs text-white/30 mb-4 max-w-xs">
              Your vault is empty. Add your first project to get started.
            </p>
            <Link
              href="/dashboard/projects/new"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-white"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Add Project
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}/edit`}
                className="surface-card rounded-xl p-4 group block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold group-hover:bg-violet-500/20 transition-colors shrink-0">
                    {project.title.charAt(0).toUpperCase()}
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/20 group-hover:text-violet-400 transition-colors mt-1">
                    <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-white/90 truncate mb-1">{project.title}</p>
                <p className="text-xs text-white/35 line-clamp-2 leading-relaxed">{project.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
