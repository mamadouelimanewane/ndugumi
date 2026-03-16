"use client"

import { useSearchParams } from "next/navigation"
import { ShoppingBag, TrendingUp, Star, Wallet, Package, Bell, Settings, LogOut, ChefHat } from "lucide-react"

const mockStores: Record<string, { name: string; email: string }> = {
  "1": { name: "Marché Dior", email: "Marchedior@gmail.com" },
  "2": { name: "Le Marché des Professionnels", email: "ndugumipro@gmail.com" },
  "3": { name: "Service Traiteur", email: "ndugumitraiteur@gmail.com" },
  "4": { name: "France Mangasin test", email: "ndame.kital@lndugumi.com" },
  "5": { name: "MARCHE RUFISQUE1", email: "marcherufisque1@gmail.com" },
  "6": { name: "Marché Rufisque", email: "marcherufisque25@gmail.com" },
  "7": { name: "Marché Keur Massar", email: "marchekeurmassar@gmail.com" },
}

const stats = [
  { label: "Commandes aujourd'hui", value: "24", icon: ShoppingBag, color: "bg-blue-500", change: "+12%" },
  { label: "Chiffre d'affaires", value: "187 400 FCFA", icon: TrendingUp, color: "bg-green-500", change: "+8%" },
  { label: "Note moyenne", value: "4.7 ★", icon: Star, color: "bg-yellow-500", change: "stable" },
  { label: "Solde wallet", value: "93 544 FCFA", icon: Wallet, color: "bg-purple-500", change: "+5%" },
]

const recentOrders = [
  { id: "#1042", customer: "Amadou Diallo", items: 3, amount: "8 500", status: "En livraison", time: "14:32" },
  { id: "#1041", customer: "Fatou Sarr", items: 1, amount: "2 300", status: "Préparation", time: "14:18" },
  { id: "#1040", customer: "Moussa Ba", items: 5, amount: "15 700", status: "Livré", time: "13:55" },
  { id: "#1039", customer: "Aïssatou Fall", items: 2, amount: "6 100", status: "Livré", time: "13:20" },
]

const statusColors: Record<string, string> = {
  "En livraison": "bg-blue-100 text-blue-700",
  "Préparation": "bg-yellow-100 text-yellow-700",
  "Livré": "bg-green-100 text-green-700",
  "Annulé": "bg-red-100 text-red-700",
}

export default function MerchantDashboardPage() {
  const searchParams = useSearchParams()
  const storeId = searchParams.get("store") ?? "1"
  const store = mockStores[storeId] ?? { name: "Mon Magasin", email: "" }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-500 rounded-xl flex items-center justify-center">
              <ChefHat size={20} className="text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">{store.name}</div>
              <div className="text-xs text-gray-400">Backoffice Vendeur</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={18} />
            </button>
            <a href="/merchant/login" className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={18} />
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-gray-500 text-sm">Bienvenue sur votre espace de gestion · {store.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                <s.icon size={20} className="text-white" />
              </div>
              <div className="text-lg font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              <div className={`text-xs mt-1 font-medium ${s.change.startsWith("+") ? "text-green-500" : "text-gray-400"}`}>
                {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* Menu rapide */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Catalogue", icon: "🛒", href: "#" },
            { label: "Commandes", icon: "📦", href: "#" },
            { label: "Produits", icon: "🥩", href: "#" },
          ].map((m) => (
            <a
              key={m.label}
              href={m.href}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:bg-cyan-50 hover:border-cyan-200 transition-colors"
            >
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className="text-sm font-medium text-gray-700">{m.label}</div>
            </a>
          ))}
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Package size={18} className="text-gray-400" />
              <h2 className="font-semibold text-gray-800">Commandes récentes</h2>
            </div>
            <button className="text-xs text-cyan-500 hover:underline font-medium">Voir tout</button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                    {order.id.slice(1)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{order.customer}</div>
                    <div className="text-xs text-gray-400">{order.items} article{order.items > 1 ? "s" : ""} · {order.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-800">{order.amount} FCFA</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
