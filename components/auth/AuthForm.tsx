"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { loginSchema, registerSchema } from "@/lib/validations"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

interface AuthFormProps {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const schema = type === "login" ? loginSchema : registerSchema
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: (type === "login" ? { email: "", password: "" } : { name: "", email: "", password: "", confirmPassword: "" }) as any,
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    setIsLoading(true)
    try {
      if (type === "signup") {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        const result = await response.json()
        if (!response.ok || !result.success) {
          toast.error(result.error || "Something went wrong")
          setIsLoading(false)
          return
        }
      }

      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (signInResult?.error) {
        toast.error("Invalid email or password")
      } else {
        toast.success(type === "signup" ? "Account created!" : "Welcome back!")
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {type === "signup" && (
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-medium text-white/60 uppercase tracking-wider">
            Full Name
          </label>
          <input
            id="name"
            placeholder="John Doe"
            type="text"
            autoCapitalize="words"
            autoComplete="name"
            autoCorrect="off"
            disabled={isLoading}
            className="premium-input"
            {...form.register("name" as any)}
          />
          {(form.formState.errors as any).name && (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              {(form.formState.errors as any).name.message as string}
            </p>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-medium text-white/60 uppercase tracking-wider">
          Email
        </label>
        <input
          id="email"
          placeholder="you@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          className="premium-input"
          {...form.register("email" as any)}
        />
        {(form.formState.errors as any).email && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            {(form.formState.errors as any).email.message as string}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-xs font-medium text-white/60 uppercase tracking-wider">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete={type === "login" ? "current-password" : "new-password"}
          disabled={isLoading}
          className="premium-input"
          {...form.register("password" as any)}
        />
        {(form.formState.errors as any).password && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            {(form.formState.errors as any).password.message as string}
          </p>
        )}
      </div>

      {type === "signup" && (
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="text-xs font-medium text-white/60 uppercase tracking-wider">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            className="premium-input"
            {...form.register("confirmPassword" as any)}
          />
          {(form.formState.errors as any).confirmPassword && (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              {(form.formState.errors as any).confirmPassword.message as string}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {type === "login" ? "Signing in..." : "Creating account..."}
          </>
        ) : (
          type === "login" ? "Sign In" : "Create Account"
        )}
      </button>
    </form>
  )
}
