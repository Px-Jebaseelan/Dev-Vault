import { ProfileForm } from "@/components/dashboard/ProfileForm"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, bio: true, avatarUrl: true, email: true },
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeInUp">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Profile Settings</h1>
        <p className="text-white/40 mt-1 text-sm">
          Manage your public developer profile and account details.
        </p>
      </div>
      <ProfileForm user={user} />
    </div>
  )
}
