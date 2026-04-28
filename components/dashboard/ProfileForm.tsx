"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { profileSchema } from "@/lib/validations"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl || "")

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
      if (!response.ok) throw new Error("Something went wrong")
      toast.success("Profile updated successfully")
      router.refresh()
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* ─── Avatar preview ────────────────────────────────────────── */}
      <div className="rounded-2xl border border-white/[0.07] bg-[oklch(0.12_0.014_265)] p-6">
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 ring-2 ring-violet-500/20">
            <AvatarImage src={avatarPreview} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-violet-500/30 to-indigo-500/30 text-white text-xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-white/80">{user.name}</p>
            <p className="text-xs text-white/35 mt-0.5">{user.email}</p>
            <p className="text-xs text-white/25 mt-2">Update your avatar URL below to change your photo</p>
          </div>
        </div>
      </div>

      {/* ─── Account info ──────────────────────────────────────────── */}
      <div className="rounded-2xl border border-white/[0.07] bg-[oklch(0.12_0.014_265)] p-6 space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-white/80 mb-0.5">Account Information</h3>
          <p className="text-xs text-white/30">Update your personal details</p>
        </div>

        {/* Email (read-only) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Email Address
          </label>
          <div className="relative">
            <input
              value={user.email}
              disabled
              className="premium-input pr-20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-white/25 bg-white/5 px-2 py-0.5 rounded">
              Locked
            </span>
          </div>
          <p className="text-[11px] text-white/25">Your email address cannot be changed.</p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Display Name
          </label>
          <input
            id="name"
            placeholder="Your full name"
            disabled={isLoading}
            className="premium-input"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.1"/><path d="M5.5 3.5v2.2M5.5 7h.01" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Bio
          </label>
          <input
            id="bio"
            placeholder="Full Stack Developer passionate about open source..."
            disabled={isLoading}
            className="premium-input"
            {...form.register("bio")}
          />
          {form.formState.errors.bio && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.1"/><path d="M5.5 3.5v2.2M5.5 7h.01" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
              {form.formState.errors.bio.message}
            </p>
          )}
        </div>

        {/* Avatar URL */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <label htmlFor="avatarUrl" className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Avatar URL
            </label>
            <span className="text-[10px] text-white/25">optional</span>
          </div>
          <input
            id="avatarUrl"
            placeholder="https://avatars.githubusercontent.com/u/..."
            disabled={isLoading}
            className="premium-input"
            {...form.register("avatarUrl")}
            onChange={(e) => {
              form.register("avatarUrl").onChange(e)
              setAvatarPreview(e.target.value)
            }}
          />
          {form.formState.errors.avatarUrl && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.1"/><path d="M5.5 3.5v2.2M5.5 7h.01" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
              {form.formState.errors.avatarUrl.message}
            </p>
          )}
        </div>
      </div>

      {/* ─── Submit ──────────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Saving changes...
          </>
        ) : (
          "Save Profile"
        )}
      </button>
    </form>
  )
}
