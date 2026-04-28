import Link from "next/link"
import { auth, signOut } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export async function Navbar() {
  const session = await auth()

  return (
    <header className="px-6 h-14 flex items-center justify-between border-b border-white/[0.06] bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center transition-transform group-hover:scale-110">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
            <path d="M2 3h4v4H2zM8 3h4v4H8zM2 9h4v4H2zM8 9h4v4H8z" fill="currentColor" opacity="0.9"/>
          </svg>
        </div>
        <span className="font-semibold text-base gradient-text">DevVault</span>
      </Link>

      {/* Right side */}
      <nav className="flex items-center gap-3">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 glass rounded-lg px-2.5 py-1.5 hover:bg-white/8 transition-all outline-none">
              <Avatar className="h-6 w-6">
                <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xs font-semibold">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-white/80 font-medium hidden sm:block">{session.user.name}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
                <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-[oklch(0.14_0.016_265)] border-white/10 shadow-xl shadow-black/30"
              align="end"
            >
              {/* User info header — plain div, no label context needed */}
              <div className="px-3 py-2.5 border-b border-white/[0.06] mb-1">
                <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
                <p className="text-xs text-white/40 truncate">{session.user.email}</p>
              </div>

              <DropdownMenuGroup>
                <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                  <Link href="/dashboard" className="w-full flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="currentColor" opacity="0.7"/><rect x="7.5" y="1" width="5.5" height="5.5" rx="1" fill="currentColor" opacity="0.4"/><rect x="1" y="7.5" width="5.5" height="5.5" rx="1" fill="currentColor" opacity="0.4"/><rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" fill="currentColor" opacity="0.7"/></svg>
                    Overview
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                  <Link href="/dashboard/projects" className="w-full flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 4.5C1.5 3.4 2.4 2.5 3.5 2.5h7c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-5z" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7"/><path d="M4 6.5h6M4 8.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/></svg>
                    Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                  <Link href="/dashboard/profile" className="w-full flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.7"/><path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/></svg>
                    Profile
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-white/[0.06]" />

              <DropdownMenuGroup>
                <DropdownMenuItem className="text-red-400/80 hover:text-red-400 focus:text-red-400 hover:bg-red-500/8 focus:bg-red-500/8 cursor-pointer">
                  <form
                    action={async () => {
                      "use server"
                      await signOut({ redirectTo: "/" })
                    }}
                    className="w-full"
                  >
                    <button type="submit" className="w-full text-left flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9.5 9.5L12 7l-2.5-2.5M12 7H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Sign out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="btn-primary text-sm font-medium px-4 py-2 rounded-lg text-white"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}
