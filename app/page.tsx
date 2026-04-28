import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* ─── Navbar ────────────────────────────────────────────────────── */}
      <header className="px-6 md:px-10 h-16 flex items-center justify-between border-b border-white/[0.06] bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
              <path d="M2 3h4v4H2zM8 3h4v4H8zM2 9h4v4H2zM8 9h4v4H8z" fill="currentColor" opacity="0.9"/>
            </svg>
          </div>
          <span className="font-semibold text-lg tracking-tight gradient-text">DevVault</span>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium btn-primary px-5 py-2 rounded-lg text-white"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 relative">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-violet-600/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-violet-400/6 blur-3xl" />

        {/* Badge */}
        <div className="animate-fadeInUp mb-6 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-white/70 border border-violet-500/20">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          Now in public beta — Start free today
        </div>

        <h1 className="animate-fadeInUp-delay-1 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 max-w-4xl">
          Showcase your{" "}
          <span className="gradient-text">developer</span>{" "}
          journey
        </h1>

        <p className="animate-fadeInUp-delay-2 text-base md:text-xl text-white/50 max-w-xl mb-10 leading-relaxed">
          DevVault is the intelligent platform to organize, manage, and share
          your coding projects — crafted for developers who take their craft seriously.
        </p>

        <div className="animate-fadeInUp-delay-3 flex flex-col sm:flex-row gap-3 items-center">
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white"
          >
            Start building free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-white/60 hover:text-white glass border-white/10 hover:border-white/20 transition-all"
          >
            Sign in to dashboard
          </Link>
        </div>

        {/* ─── Feature grid ────────────────────────────────────────────── */}
        <div className="mt-28 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.8"/><rect x="10" y="1" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.4"/><rect x="1" y="10" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.4"/><rect x="10" y="10" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.8"/></svg>
              ),
              title: "Project Management",
              desc: "Organize all your projects in one beautifully structured workspace.",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" opacity="0.5"/><path d="M9 5v4l3 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              ),
              title: "Live Portfolio",
              desc: "A shareable public profile that updates automatically as you add projects.",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ),
              title: "Tech Stack Tags",
              desc: "Tag every project with your technologies for instant filtering and discovery.",
            },
          ].map((f) => (
            <div key={f.title} className="surface-card rounded-xl p-5 text-left group">
              <div className="inline-flex p-2.5 rounded-lg bg-violet-500/10 text-violet-400 mb-4 group-hover:bg-violet-500/20 transition-colors">
                {f.icon}
              </div>
              <p className="font-semibold text-sm text-white/90 mb-1">{f.title}</p>
              <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-6 text-center border-t border-white/[0.06]">
        <p className="text-xs text-white/25">
          © {new Date().getFullYear()} DevVault. Crafted with care for developers.
        </p>
      </footer>
    </div>
  )
}
