"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard, Settings, Tag, Clock, Store, FileText, ShoppingCart,
  Image, Truck, Car, Users, Megaphone, Wallet, CreditCard, BarChart2,
  BarChart, ChevronDown, ChevronRight, LogOut, UserCog, Globe, Map,
  Weight, Bookmark, Bell, DollarSign, Receipt, MapPin, Package, BrainCircuit
} from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href?: string
  icon?: React.ReactNode
  children?: NavItem[]
}

const navigation: { section: string; items: NavItem[] }[] = [
  {
    section: "",
    items: [
      { label: "Tableau de bord", href: "/dashboard", icon: <LayoutDashboard size={16} /> },
    ],
  },
  {
    section: "STRATÉGIE & IA",
    items: [
      { label: "Intelligence IA", href: "/analytics", icon: <BrainCircuit size={16} /> },
      { label: "Marketing Hub", href: "/marketing", icon: <Megaphone size={16} /> },
    ],
  },
  {
    section: "CONFIGURATION DE BASE",
    items: [
      {
        label: "Configuration", icon: <Settings size={16} />,
        children: [
          { label: "Pays", href: "/countries", icon: <Globe size={14} /> },
          { label: "Documents", href: "/documents", icon: <FileText size={14} /> },
          { label: "Type de véhicule", href: "/vehicles", icon: <Car size={14} /> },
          { label: "Zone de service", href: "/service-areas", icon: <Map size={14} /> },
          { label: "Catégories", href: "/categories", icon: <Tag size={14} /> },
          { label: "Unité de poids", href: "/weight-units", icon: <Weight size={14} /> },
          { label: "Marqueurs carte", href: "/map-markers", icon: <MapPin size={14} /> },
        ],
      },
      {
        label: "Tarification", icon: <CreditCard size={16} />,
        children: [
          { label: "Règles tarifaires", href: "/price-card/fare-rules" },
          { label: "Tarif dynamique", href: "/price-card/surge" },
        ],
      },
      { label: "Codes promo", href: "/promo-code", icon: <Tag size={16} /> },
      { label: "Créneaux horaires", href: "/service-time-slots", icon: <Clock size={16} /> },
    ],
  },
  {
    section: "GESTION ÉPICERIE",
    items: [
      { label: "Magasins", href: "/stores", icon: <Store size={16} /> },
      { label: "Factures commandes", href: "/invoices", icon: <Receipt size={16} /> },
      { label: "Commandes", href: "/orders", icon: <ShoppingCart size={16} /> },
      { label: "Slider accueil", href: "/slider", icon: <Image size={16} /> },
    ],
  },
  {
    section: "GESTION LIVREURS",
    items: [
      {
        label: "Livreurs", icon: <Truck size={16} />,
        children: [
          { label: "Tous les livreurs", href: "/drivers" },
          { label: "Par type de véhicule", href: "/drivers/vehicle-based" },
          { label: "Approbation en attente", href: "/drivers/pending" },
          { label: "Livreurs rejetés", href: "/drivers/rejected" },
          { label: "Expiration documents", href: "/drivers/documents" },
        ],
      },
      {
        label: "Véhicules", icon: <Car size={16} />,
        children: [
          { label: "Tous les véhicules", href: "/vehicles/list" },
          { label: "Types de véhicules", href: "/vehicles" },
        ],
      },
      {
        label: "Carte", icon: <Map size={16} />,
        children: [
          { label: "Carte des livreurs", href: "/map/driver" },
          { label: "Heat Map", href: "/map/heatmap" },
        ],
      },
    ],
  },
  {
    section: "GESTION UTILISATEURS",
    items: [
      { label: "Utilisateurs", href: "/users", icon: <Users size={16} /> },
    ],
  },
  {
    section: "AUTRES",
    items: [
      {
        label: "Gestion du contenu", icon: <Bookmark size={16} />,
        children: [
          { label: "Pages", href: "/content/pages" },
          { label: "FAQ", href: "/content/faqs" },
          { label: "Chaînes application", href: "/content/app-strings" },
          { label: "Chaînes modules", href: "/content/module-strings" },
          { label: "Options de paiement", href: "/content/payment-options" },
        ],
      },
      { label: "Notifications promo", href: "/notifications", icon: <Bell size={16} /> },
      { label: "Recharge portefeuille", href: "/wallet", icon: <Wallet size={16} /> },
    ],
  },
  {
    section: "GESTION TRANSACTIONS",
    items: [
      {
        label: "Demandes de retrait", icon: <DollarSign size={16} />,
        children: [
          { label: "Retrait livreurs", href: "/cashout/drivers" },
          { label: "Retrait magasins", href: "/cashout/stores" },
        ],
      },
    ],
  },
  {
    section: "RAPPORTS & GRAPHIQUES",
    items: [
      {
        label: "Revenus", icon: <BarChart2 size={16} />,
        children: [
          { label: "Gains livreurs", href: "/reports/earnings/drivers" },
          { label: "Gains magasins", href: "/reports/earnings/stores" },
        ],
      },
      { label: "Temps en ligne livreurs", href: "/reports/driver-online-time", icon: <Clock size={16} /> },
      {
        label: "Transactions portefeuille", icon: <BarChart size={16} />,
        children: [
          { label: "Toutes les transactions", href: "/reports/transactions" },
          { label: "Portefeuille utilisateurs", href: "/reports/transactions/user" },
          { label: "Portefeuille livreurs", href: "/reports/transactions/driver" },
          { label: "Portefeuille commerces", href: "/reports/transactions/business" },
          { label: "Rapport de solde", href: "/reports/transactions/balance" },
        ],
      },
    ],
  },
  {
    section: "PARAMÈTRES",
    items: [
      {
        label: "Sous-admins", icon: <UserCog size={16} />,
        children: [
          { label: "Tous les admins", href: "/settings/sub-admin" },
          { label: "Ajouter un admin", href: "/settings/sub-admin/new" },
          { label: "Rôles & Permissions", href: "/sub-admin/roles" },
        ],
      },
      {
        label: "Paramètres & Config.", icon: <Settings size={16} />,
        children: [
          { label: "Configuration générale", href: "/settings/configuration" },
          { label: "Config. requêtes", href: "/settings/configuration/request" },
          { label: "Config. livreurs", href: "/settings/configuration/driver" },
          { label: "Config. géolocalisation", href: "/settings/configuration/map" },
          { label: "Config. email", href: "/settings/configuration/email" },
          { label: "Modèles email", href: "/settings/configuration/email-templates" },
          { label: "Types de service", href: "/settings/configuration/service-type" },
          { label: "URLs application", href: "/settings/configuration/app-url" },
          { label: "Push notifications", href: "/settings/configuration/push-notification" },
          { label: "Motifs d'annulation", href: "/settings/configuration/cancel-reasons" },
          { label: "Méthodes de paiement", href: "/settings/configuration/payment-method" },
          { label: "Plans d'abonnement", href: "/settings/configuration/membership" },
          { label: "Profil", href: "/settings/profile" },
        ],
      },
    ],
  },
]

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + "/") : false

  if (item.children) {
    const hasActiveChild = item.children.some(
      (c) => c.href && (pathname === c.href || pathname.startsWith(c.href + "/"))
    )
    const expanded = open || hasActiveChild

    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors",
            depth > 0 ? "pl-8" : "",
            hasActiveChild ? "text-green-600 bg-green-50" : "text-gray-700 hover:bg-gray-50"
          )}
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.label}
          </span>
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {expanded && (
          <div className="ml-2 border-l border-gray-100 mt-1">
            {item.children.map((child) => (
              <NavLink key={child.label} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors",
        depth > 0 ? "pl-8" : "",
        isActive
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-700 hover:bg-gray-50"
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navigation.map((group) => (
          <div key={group.section} className="mb-1">
            {group.section && (
              <p className="px-4 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {group.section}
              </p>
            )}
            {group.items.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom icons */}
      <div className="border-t border-gray-100 p-3 flex items-center justify-around">
        <Link href="/settings/configuration" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
          <Settings size={18} />
        </Link>
        <Link href="/settings/profile" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
          <Users size={18} />
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-50"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  )
}
