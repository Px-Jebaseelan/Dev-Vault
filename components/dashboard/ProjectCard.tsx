"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Globe, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
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
    if (!confirm("Are you sure you want to delete this project?")) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete")
      }

      toast.success("Project deleted successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete project")
      setIsDeleting(false)
    }
  }

  return (
    <Card className="flex flex-col bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4 text-sm">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-indigo-400"
            >
              <Code className="h-4 w-4" /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-indigo-400"
            >
              <Globe className="h-4 w-4" /> Live
            </a>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-slate-800 pt-4 flex gap-2">
        <Link href={`/dashboard/projects/${project.id}/edit`} className="flex-1">
          <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </Link>
        <Button
          variant="destructive"
          className="flex-1"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash className="h-4 w-4 mr-2" /> {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  )
}
