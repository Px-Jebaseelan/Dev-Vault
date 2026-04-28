import { ProjectForm } from "@/components/dashboard/ProjectForm"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function NewProjectPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
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
        <h1 className="text-3xl font-bold tracking-tight text-white">Add New Project</h1>
        <p className="text-white/40 mt-1 text-sm">
          Fill in the details to showcase a project in your vault.
        </p>
      </div>

      <ProjectForm />
    </div>
  )
}
