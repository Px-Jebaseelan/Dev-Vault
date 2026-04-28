import { ReactNode } from "react"
import { Navbar } from "@/components/shared/Navbar"
import { SidebarNav } from "@/components/shared/SidebarNav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* ─── Sidebar ─────────────────────────────────────────────── */}
        <aside className="hidden w-56 border-r border-white/[0.05] md:flex flex-col gap-6 p-4 shrink-0">
          {/* Section label */}
          <div className="px-3 pt-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-3">
              Navigation
            </p>
            <SidebarNav />
          </div>

          {/* Bottom section */}
          <div className="mt-auto px-3 pb-2">
            <div className="glass rounded-xl p-3">
              <p className="text-[11px] font-semibold text-white/70 mb-1">DevVault Pro</p>
              <p className="text-[10px] text-white/35 leading-relaxed mb-2.5">
                Unlock analytics, custom domains, and more.
              </p>
              <button className="w-full text-[11px] font-semibold py-1.5 rounded-lg bg-gradient-to-r from-violet-600/80 to-indigo-600/80 text-white hover:from-violet-600 hover:to-indigo-600 transition-all">
                Coming Soon
              </button>
            </div>
          </div>
        </aside>

        {/* ─── Main content ─────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
