"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { profileSchema } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
  user: {
    name: string
    bio: string | null
    avatarUrl: string | null
    email: string
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const defaultValues: Partial<ProfileFormValues> = {
    name: user.name || "",
    bio: user.bio || "",
    avatarUrl: user.avatarUrl || "",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      toast.success("Profile updated successfully")
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email} disabled className="bg-slate-800 text-slate-400" />
          <p className="text-xs text-slate-500">Your email address cannot be changed.</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" disabled={isLoading} {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Input id="bio" placeholder="Full Stack Developer..." disabled={isLoading} {...form.register("bio")} />
          {form.formState.errors.bio && (
            <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="avatarUrl">Avatar URL (optional)</Label>
          <Input id="avatarUrl" placeholder="https://..." disabled={isLoading} {...form.register("avatarUrl")} />
          {form.formState.errors.avatarUrl && (
            <p className="text-sm text-red-500">{form.formState.errors.avatarUrl.message}</p>
          )}
        </div>
      </div>
      <Button disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
        {isLoading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  )
}
