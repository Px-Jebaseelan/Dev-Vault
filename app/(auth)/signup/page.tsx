import { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "@/components/auth/AuthForm"

export const metadata: Metadata = {
  title: "Sign Up - DevVault",
  description: "Create a DevVault account",
}

export default function SignUpPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="relative z-20 flex items-center text-lg font-medium text-indigo-400">
          <Link href="/">DevVault</Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-slate-300">
              "Building my portfolio took minutes instead of days. The perfect tool for developers."
            </p>
            <footer className="text-sm text-slate-400">Alex Chen</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 flex items-center justify-center h-screen px-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground text-slate-400">
              Enter your details below to create your account
            </p>
          </div>
          <AuthForm type="signup" />
          <p className="px-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-indigo-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
