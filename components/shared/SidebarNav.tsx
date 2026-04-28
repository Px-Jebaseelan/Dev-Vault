"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.7"/>
        <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.4"/>
        <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.4"/>
        <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/projects",
    label: "Projects",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 5.5C2 4.4 2.9 3.5 4 3.5h8c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-6z" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M5 7.5h6M5 9.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.7"/>
        <path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      </svg>
    ),
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1 text-sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-all
              ${isActive
                ? "active text-white bg-violet-500/10"
                : "text-white/45 hover:text-white/80 hover:bg-white/5"
              }`}
          >
            <span className={isActive ? "text-violet-400" : "text-current"}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
