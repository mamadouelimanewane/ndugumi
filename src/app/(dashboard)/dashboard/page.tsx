import {
  Users, Truck, Globe, Map, FileText, DollarSign, Tag,
  Store, FolderOpen, Package, ShoppingCart,
} from "lucide-react"
import StatCard from "@/components/ui/StatCard"

const siteStats = [
  { label: "Utilisateurs actifs",        value: "20,887",     iconBg: "bg-green-500",  icon: <Users size={20} />,       href: "/users" },
  { label: "Livreurs actifs",            value: "148",        iconBg: "bg-blue-500",   icon: <Truck size={20} />,       href: "/drivers" },
  { label: "Pays de service",            value: "3",          iconBg: "bg-orange-500", icon: <Globe size={20} />,       href: "/countries" },
  { label: "Zones de service",           value: "3",          iconBg: "bg-orange-400", icon: <Map size={20} />,         href: "/service-areas" },
  { label: "Documents expirant bientôt", value: "1",          iconBg: "bg-red-500",    icon: <FileText size={20} />,    href: "/drivers/documents" },
  { label: "Revenus totaux",             value: "413 666.92", iconBg: "bg-cyan-500",   icon: <DollarSign size={20} />,  href: "/reports/earnings" },
  { label: "Remises totales",            value: "0",          iconBg: "bg-red-400",    icon: <Tag size={20} />,         href: "/promo-code" },
]

const epicerieStats = [
  { label: "Total magasins",   value: "14",         iconBg: "bg-green-500",  icon: <Store size={20} />,       href: "/stores" },
  { label: "Total catégories", value: "27",         iconBg: "bg-cyan-500",   icon: <FolderOpen size={20} />,  href: "/categories" },
  { label: "Total produits",   value: "2 546",      iconBg: "bg-teal-500",   icon: <Package size={20} />,     href: "/stores" },
  { label: "Total commandes",  value: "3 253",      iconBg: "bg-orange-500", icon: <ShoppingCart size={20} />, href: "/orders" },
  { label: "Revenus totaux",   value: "413 666.92", iconBg: "bg-cyan-500",   icon: <DollarSign size={20} />,  href: "/reports/earnings" },
  { label: "Remises totales",  value: "0",          iconBg: "bg-red-400",    icon: <Tag size={20} />,         href: "/promo-code" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Site Statistics */}
      <section>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-700">Statistiques du site</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {siteStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* Epicerie Statistics */}
      <section>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-700">Statistiques Épicerie</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {epicerieStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>
    </div>
  )
}
