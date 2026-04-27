import { ProjectForm } from "@/components/dashboard/ProjectForm"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function NewProjectPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-slate-400 mt-2">Fill in the details to add a new project to your portfolio.</p>
      </div>
      <ProjectForm />
    </div>
  )
}
