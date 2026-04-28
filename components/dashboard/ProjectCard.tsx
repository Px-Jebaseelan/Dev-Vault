"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  liveUrl: string | null
  githubUrl: string | null
}

export function ProjectCard({ project }: { project: Project }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Delete this project? This action cannot be undone.")) return
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/projects/${project.id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")
      toast.success("Project deleted")
      router.refresh()
    } catch {
      toast.error("Failed to delete project")
      setIsDeleting(false)
    }
  }

  return (
    <div className="surface-card rounded-2xl flex flex-col overflow-hidden group">
      {/* ─── Card top accent ─────────────────────────────────────── */}
      <div className="h-1 bg-gradient-to-r from-violet-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* ─── Content ─────────────────────────────────────────────── */}
      <div className="p-5 flex-1 space-y-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div className="h-9 w-9 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 font-bold text-sm shrink-0 group-hover:bg-violet-500/20 transition-colors">
            {project.title.charAt(0).toUpperCase()}
          </div>
          <div className="flex gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/8 transition-all"
                title="View on GitHub"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C3.69 1 1 3.74 1 7.12c0 2.71 1.74 5.01 4.15 5.82.3.06.41-.13.41-.29V11.5c-1.68.37-2.03-.82-2.03-.82-.28-.71-.67-.9-.67-.9-.55-.38.04-.37.04-.37.61.04.93.63.93.63.54.94 1.41.67 1.76.51.05-.4.21-.67.38-.82-1.34-.15-2.74-.68-2.74-3.01 0-.66.24-1.21.62-1.63-.06-.15-.27-.78.06-1.62 0 0 .5-.16 1.65.62.48-.13.99-.2 1.5-.2s1.02.07 1.5.2c1.15-.78 1.65-.62 1.65-.62.33.84.12 1.47.06 1.62.39.42.62.96.62 1.63 0 2.34-1.4 2.85-2.75 3 .22.19.41.56.41 1.13v1.68c0 .16.11.35.41.29C11.26 12.13 13 9.83 13 7.12 13 3.74 10.31 1 7 1z" fill="currentColor"/>
                </svg>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/8 transition-all"
                title="View live site"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5C7 1.5 9 4 9 7s-2 5.5-2 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Title + desc */}
        <div>
          <h3 className="font-semibold text-white text-base mb-1.5 group-hover:text-violet-300 transition-colors">{project.title}</h3>
          <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">{project.description}</p>
        </div>

        {/* Tech stack */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-white/50 border border-white/8"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-white/30">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ─── Footer actions ──────────────────────────────────────── */}
      <div className="px-5 py-3.5 border-t border-white/[0.05] flex gap-2">
        <Link
          href={`/dashboard/projects/${project.id}/edit`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/8 border border-white/8 hover:border-white/15 transition-all"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8.5 1.5a1.41 1.41 0 012 2L4 10H2V8L8.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/8 border border-transparent hover:border-red-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <>
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Deleting...
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 3h8M5 1h2M4.5 3v6.5c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  )
}
