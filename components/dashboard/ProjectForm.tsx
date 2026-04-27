"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { projectSchema } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: {
    id: string
    title: string
    description: string
    techStack: string[]
    liveUrl: string | null
    githubUrl: string | null
  }
}

export function ProjectForm({ project }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const defaultValues: Partial<ProjectFormValues> = {
    title: project?.title || "",
    description: project?.description || "",
    techStack: project?.techStack ? project.techStack.join(", ") : "",
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
  }

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  })

  async function onSubmit(data: ProjectFormValues) {
    setIsLoading(true)

    try {
      const url = project ? `/api/projects/${project.id}` : "/api/projects"
      const method = project ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      toast.success(project ? "Project updated" : "Project created")
      router.push("/dashboard/projects")
      router.refresh()
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-slate-900 p-6 rounded-lg border border-slate-800">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" disabled={isLoading} {...form.register("title")} />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" disabled={isLoading} {...form.register("description")} />
          {form.formState.errors.description && (
            <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
          <Input id="techStack" placeholder="React, Node.js, PostgreSQL" disabled={isLoading} {...form.register("techStack")} />
          {form.formState.errors.techStack && (
            <p className="text-sm text-red-500">{form.formState.errors.techStack.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="liveUrl">Live URL (optional)</Label>
          <Input id="liveUrl" placeholder="https://..." disabled={isLoading} {...form.register("liveUrl")} />
          {form.formState.errors.liveUrl && (
            <p className="text-sm text-red-500">{form.formState.errors.liveUrl.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
          <Input id="githubUrl" placeholder="https://github.com/..." disabled={isLoading} {...form.register("githubUrl")} />
          {form.formState.errors.githubUrl && (
            <p className="text-sm text-red-500">{form.formState.errors.githubUrl.message}</p>
          )}
        </div>
      </div>
      <Button disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
        {isLoading ? "Saving..." : project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  )
}
