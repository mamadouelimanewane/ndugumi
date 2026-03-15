import Link from "next/link"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  iconBg: string
  icon: React.ReactNode
  href?: string
}

export default function StatCard({ label, value, iconBg, icon, href }: StatCardProps) {
  const inner = (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 transition-shadow hover:shadow-md">
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md", iconBg)}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href} className="block hover:no-underline">{inner}</Link>
  }
  return inner
}
