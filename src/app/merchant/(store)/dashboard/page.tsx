"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ShoppingBag, TrendingUp, Star, Wallet, Clock, CheckCircle, XCircle, Truck, Loader2, ArrowUp, ArrowDown } from "lucide-react"

const stats = [
  { label: "Commandes du jour", value: "24", icon: ShoppingBag, color: "bg-blue-500", change: "+3 vs hier", up: true },
  { label: "Chiffre d'affaires", value: "187 400 FCFA", icon: TrendingUp, color: "bg-green-500", change: "+12%", up: true },
  { label: "Note moyenne", value: "4.7 / 5", icon: Star, color: "bg-amber-500", change: "stable", up: null },
  { label: "Solde portefeuille", value: "93 544 FCFA", icon: Wallet, color: "bg-purple-500", change: "+5 200", up: true },
]

const orderStats = [
  { label: "En attente", count: 3, icon: Clock, color: "text-yellow-500 bg-yellow-50 border-yellow-200" },
  { label: "En préparation", count: 5, icon: ShoppingBag, color: "text-blue-500 bg-blue-50 border-blue-200" },
  { label: "En livraison", count: 4, icon: Truck, color: "text-cyan-500 bg-cyan-50 border-cyan-200" },
  { label: "Livrées", count: 12, icon: CheckCircle, color: "text-green-500 bg-green-50 border-green-200" },
  { label: "Annulées", count: 1, icon: XCircle, color: "text-red-500 bg-red-50 border-red-200" },
]

const recentOrders = [
  { id: "#1042", customer: "Amadou Diallo", items: "Riz au poisson x1, Thiébou dieun x2", amount: "8 500", status: "En livraison", time: "14:32", statusColor: "bg-cyan-100 text-cyan-700" },
  { id: "#1041", customer: "Fatou Sarr", items: "Yassa poulet x1", amount: "3 500", status: "En préparation", time: "14:18", statusColor: "bg-blue-100 text-blue-700" },
  { id: "#1040", customer: "Moussa Ba", items: "Mafé x2, Jus bissap x3", amount: "12 000", status: "Livré", time: "13:55", statusColor: "bg-green-100 text-green-700" },
  { id: "#1039", customer: "Aïssatou Fall", items: "Thiébou yapp x1", amount: "6 500", status: "Livré", time: "13:20", statusColor: "bg-green-100 text-green-700" },
  { id: "#1038", customer: "Omar Ndiaye", items: "Riz sauté x2, Jus gingembre x2", amount: "9 200", status: "Annulé", time: "12:45", statusColor: "bg-red-100 text-red-700" },
]

const topProducts = [
  { name: "Riz au poisson", sales: 48, revenue: "240 000", trend: true },
  { name: "Yassa poulet", sales: 35, revenue: "122 500", trend: true },
  { name: "Thiébou dieun", sales: 29, revenue: "145 000", trend: false },
  { name: "Mafé bœuf", sales: 22, revenue: "110 000", trend: true },
]

function DashboardContent() {
  const searchParams = useSearchParams()
  const storeId = searchParams.get("store") ?? "1"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-sm text-gray-500 mt-0.5">Vue d&apos;ensemble de votre activité · Lundi 16 mars 2026</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
                <s.icon size={20} className="text-white" />
              </div>
              {s.up !== null && (
                <span className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? "text-green-600" : "text-red-500"}`}>
                  {s.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {s.change}
                </span>
              )}
            </div>
            <div className="text-lg font-bold text-gray-800">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Order status row */}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
        {orderStats.map((o) => (
          <div key={o.label} className={`bg-white rounded-xl border p-3 flex flex-col items-center gap-1 ${o.color}`}>
            <o.icon size={20} />
            <div className="text-xl font-bold">{o.count}</div>
            <div className="text-xs text-center font-medium">{o.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800">Commandes récentes</h2>
            <a href={`/merchant/orders?store=${storeId}`} className="text-xs text-cyan-500 hover:underline font-medium">Voir tout →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50/60 transition-colors">
                <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                  {order.id.slice(1)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800">{order.customer}</div>
                  <div className="text-xs text-gray-400 truncate">{order.items}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-gray-800">{order.amount} FCFA</div>
                  <div className="flex items-center gap-1.5 justify-end mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.statusColor}`}>{order.status}</span>
                    <span className="text-xs text-gray-400">{order.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800">Top produits</h2>
            <p className="text-xs text-gray-400 mt-0.5">Ce mois-ci</p>
          </div>
          <div className="divide-y divide-gray-50">
            {topProducts.map((p, i) => (
              <div key={p.name} className="px-5 py-3 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.sales} ventes</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-gray-700">{p.revenue}</div>
                  {p.trend ? <ArrowUp size={12} className="text-green-500 ml-auto" /> : <ArrowDown size={12} className="text-red-400 ml-auto" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MerchantDashboardPage() {
  return (
    <Suspense fallback={<div className="flex justify-center pt-20"><Loader2 size={28} className="text-cyan-500 animate-spin" /></div>}>
      <DashboardContent />
    </Suspense>
  )
}
