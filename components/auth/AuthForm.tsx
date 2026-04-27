"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { loginSchema, registerSchema } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
        toast.success(type === "signup" ? "Account created!" : "Logged in successfully!")
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {type === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                {...form.register("name" as any)}
              />
              {(form.formState.errors as any).name && (
                <p className="text-sm text-red-500">{(form.formState.errors as any).name.message as string}</p>
              )}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register("email" as any)}
            />
            {(form.formState.errors as any).email && (
              <p className="text-sm text-red-500">{(form.formState.errors as any).email.message as string}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={type === "login" ? "current-password" : "new-password"}
              disabled={isLoading}
              {...form.register("password" as any)}
            />
            {(form.formState.errors as any).password && (
              <p className="text-sm text-red-500">{(form.formState.errors as any).password.message as string}</p>
            )}
          </div>
          {type === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                {...form.register("confirmPassword" as any)}
              />
              {(form.formState.errors as any).confirmPassword && (
                <p className="text-sm text-red-500">{(form.formState.errors as any).confirmPassword.message as string}</p>
              )}
            </div>
          )}
          <Button disabled={isLoading} className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            {isLoading ? (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-white"></span>
            ) : null}
            {type === "login" ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  )
}
