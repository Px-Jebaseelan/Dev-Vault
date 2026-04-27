import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 h-16 flex items-center justify-between border-b border-slate-800">
        <div className="font-bold text-xl tracking-tight text-indigo-400">DevVault</div>
        <nav className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Sign Up</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Showcase Your <span className="text-indigo-400">Developer</span> Journey
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10">
          DevVault is the premier platform to organize, manage, and share your personal coding projects. Build your portfolio in minutes.
        </p>
        <div className="flex gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
              Get Started for Free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              Login to Dashboard
            </Button>
          </Link>
        </div>
      </main>
      <footer className="py-6 text-center text-slate-500 border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} DevVault. All rights reserved.</p>
      </footer>
    </div>
  )
}
