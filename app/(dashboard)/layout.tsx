import { ReactNode } from "react"
import { Navbar } from "@/components/shared/Navbar"
import Link from "next/link"
import { LayoutDashboard, FolderKanban, User } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-64 border-r border-slate-800 p-6 md:flex flex-col gap-4">
          <nav className="grid gap-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-indigo-400 hover:bg-slate-900"
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-indigo-400 hover:bg-slate-900"
            >
              <FolderKanban className="h-4 w-4" />
              Projects
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-indigo-400 hover:bg-slate-900"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
      </div>
    </div>
  )
}
