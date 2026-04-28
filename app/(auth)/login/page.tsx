import { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "@/components/auth/AuthForm"

export const metadata: Metadata = {
  title: "Sign In — DevVault",
  description: "Sign in to your DevVault account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* ─── Left panel ──────────────────────────────────────────────── */}
      <div className="relative hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-12 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_-20%_-20%,oklch(0.68_0.2_265/25%),transparent)]" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)", backgroundSize: "60px 60px"}}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="text-white">
              <path d="M2 3h4v4H2zM8 3h4v4H8zM2 9h4v4H2zM8 9h4v4H8z" fill="currentColor" opacity="0.9"/>
            </svg>
          </div>
          <span className="font-semibold text-lg gradient-text">DevVault</span>
        </div>

        {/* Middle content */}
        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-3xl font-bold text-white/90 leading-snug mb-3">
              Your projects,<br />beautifully organized.
            </p>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Join thousands of developers showcasing their best work with DevVault.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-8">
            {[["2k+", "Developers"], ["5k+", "Projects"], ["100%", "Free"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-xl font-bold gradient-text">{val}</p>
                <p className="text-xs text-white/40 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 glass rounded-xl p-5">
          <p className="text-sm text-white/70 leading-relaxed mb-3">
            "DevVault has completely transformed how I showcase my projects to potential employers. The UI is stunning."
          </p>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500/50 to-indigo-500/50 flex items-center justify-center text-xs font-semibold text-white">
              SD
            </div>
            <div>
              <p className="text-xs font-medium text-white/80">Sofia Davis</p>
              <p className="text-xs text-white/35">Full Stack Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right panel (form) ──────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px] space-y-7 animate-fadeInUp">
          {/* Header */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
            <p className="text-sm text-white/45">Sign in to continue to your dashboard</p>
          </div>

          <AuthForm type="login" />

          <p className="text-center text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
