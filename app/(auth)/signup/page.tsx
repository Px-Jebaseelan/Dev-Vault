import { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "@/components/auth/AuthForm"

export const metadata: Metadata = {
  title: "Sign Up — DevVault",
  description: "Create your free DevVault account",
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* ─── Left panel ──────────────────────────────────────────────── */}
      <div className="relative hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_-20%_-20%,oklch(0.68_0.2_265/25%),transparent)]" />
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

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-3xl font-bold text-white/90 leading-snug mb-3">
              Start showcasing<br />your work today.
            </p>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Set up your developer portfolio in minutes. No design skills needed.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {[
              "Unlimited project showcase",
              "Tech stack tagging & filtering",
              "GitHub & live URL linking",
              "Shareable public profile",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-violet-500/15 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="oklch(0.68 0.2 265)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 glass rounded-xl p-5">
          <p className="text-sm text-white/70 leading-relaxed mb-3">
            "Building my portfolio took minutes instead of days. This is exactly what every developer needs."
          </p>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500/50 to-violet-500/50 flex items-center justify-center text-xs font-semibold text-white">
              AC
            </div>
            <div>
              <p className="text-xs font-medium text-white/80">Alex Chen</p>
              <p className="text-xs text-white/35">Frontend Engineer at Stripe</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right panel (form) ──────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px] space-y-7 animate-fadeInUp">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
            <p className="text-sm text-white/45">Free forever. No credit card required.</p>
          </div>

          <AuthForm type="signup" />

          <p className="text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
