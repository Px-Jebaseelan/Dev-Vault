"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { projectSchema } from "@/lib/validations"
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

function FormField({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-white/50">
          {label}
        </label>
        {hint && <span className="text-[10px] text-white/25">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1 pt-0.5">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.1"/>
            <path d="M5.5 3.5v2.2M5.5 7h.01" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
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
      if (!response.ok) throw new Error("Something went wrong")
      toast.success(project ? "Project updated successfully" : "Project created successfully")
      router.push("/dashboard/projects")
      router.refresh()
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-2xl border border-white/[0.07] bg-[oklch(0.12_0.014_265)] p-6 space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-white/80 mb-0.5">Project Details</h3>
          <p className="text-xs text-white/30">Basic information about your project</p>
        </div>

        <FormField
          id="title"
          label="Project Title"
          error={form.formState.errors.title?.message}
        >
          <input
            id="title"
            placeholder="My Awesome Project"
            disabled={isLoading}
            className="premium-input"
            {...form.register("title")}
          />
        </FormField>

        <FormField
          id="description"
          label="Description"
          error={form.formState.errors.description?.message}
        >
          <textarea
            id="description"
            placeholder="A brief description of what this project does and why you built it..."
            disabled={isLoading}
            rows={3}
            className="premium-input resize-none"
            {...form.register("description")}
          />
        </FormField>

        <FormField
          id="techStack"
          label="Tech Stack"
          hint="comma-separated"
          error={form.formState.errors.techStack?.message}
        >
          <input
            id="techStack"
            placeholder="React, TypeScript, Node.js, PostgreSQL"
            disabled={isLoading}
            className="premium-input"
            {...form.register("techStack")}
          />
        </FormField>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[oklch(0.12_0.014_265)] p-6 space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-white/80 mb-0.5">Links</h3>
          <p className="text-xs text-white/30">Where people can find your project online</p>
        </div>

        <FormField
          id="githubUrl"
          label="GitHub URL"
          hint="optional"
          error={form.formState.errors.githubUrl?.message}
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C3.69 1 1 3.74 1 7.12c0 2.71 1.74 5.01 4.15 5.82.3.06.41-.13.41-.29V11.5c-1.68.37-2.03-.82-2.03-.82-.28-.71-.67-.9-.67-.9-.55-.38.04-.37.04-.37.61.04.93.63.93.63.54.94 1.41.67 1.76.51.05-.4.21-.67.38-.82-1.34-.15-2.74-.68-2.74-3.01 0-.66.24-1.21.62-1.63-.06-.15-.27-.78.06-1.62 0 0 .5-.16 1.65.62.48-.13.99-.2 1.5-.2s1.02.07 1.5.2c1.15-.78 1.65-.62 1.65-.62.33.84.12 1.47.06 1.62.39.42.62.96.62 1.63 0 2.34-1.4 2.85-2.75 3 .22.19.41.56.41 1.13v1.68c0 .16.11.35.41.29C11.26 12.13 13 9.83 13 7.12 13 3.74 10.31 1 7 1z" fill="currentColor"/>
              </svg>
            </span>
            <input
              id="githubUrl"
              placeholder="https://github.com/username/repo"
              disabled={isLoading}
              className="premium-input pl-9"
              {...form.register("githubUrl")}
            />
          </div>
        </FormField>

        <FormField
          id="liveUrl"
          label="Live URL"
          hint="optional"
          error={form.formState.errors.liveUrl?.message}
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5C7 1.5 9 4 9 7s-2 5.5-2 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              id="liveUrl"
              placeholder="https://myproject.vercel.app"
              disabled={isLoading}
              className="premium-input pl-9"
              {...form.register("liveUrl")}
            />
          </div>
        </FormField>
      </div>

      {/* ─── Actions ─────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isLoading}
          className="px-5 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all disabled:opacity-40"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 btn-primary py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Saving...
            </>
          ) : (
            project ? "Save Changes" : "Create Project"
          )}
        </button>
      </div>
    </form>
  )
}
