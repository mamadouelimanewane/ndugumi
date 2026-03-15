"use client"

import { useState } from "react"
import { Plus, Info, Search, RefreshCw, Edit, Trash2, Eye, BarChart2 } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"
import Link from "next/link"

const mockStores = [
  { id: 1, name: "Marché Dior", phone: "+787386464", email: "Marchedior@gmail.com", address: "", rating: 5.0, walletMoney: 0, status: "Inactive" },
  { id: 2, name: "Le Marché des Professionnels", phone: "772161490", email: "ndugumipro@gmail.com", address: "", rating: 5.0, walletMoney: 0, status: "Inactive" },
  { id: 3, name: "Service Traiteur", phone: "771365304", email: "ndugumitraiteur@gmail.com", address: "", rating: 4.7, walletMoney: 0, status: "Inactive" },
  { id: 4, name: "France Mangasin test", phone: "0682258808", email: "ndame.kital@lndugumi.com", address: "", rating: 0.3, walletMoney: 1866.50, status: "Active" },
  { id: 5, name: "MARCHE RUFISQUE1", phone: "761967539", email: "marcherufisque1@gmail.com", address: "", rating: 5.0, walletMoney: 0, status: "Inactive" },
  { id: 6, name: "Marché Rufisque", phone: "00221787386565", email: "marcherufisque25@gmail.com", address: "", rating: 5.0, walletMoney: 93544.00, status: "Active" },
  { id: 7, name: "Marché Keur Massar", phone: "221787386565", email: "marchekeurmassar@gmail.com", address: "", rating: 5.0, walletMoney: 220770.00, status: "Active" },
]

export default function StoresPage() {
  const [search, setSearch] = useState({ name: "", email: "", phone: "" })

  const filtered = mockStores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.name.toLowerCase()) &&
      s.email.toLowerCase().includes(search.email.toLowerCase()) &&
      s.phone.includes(search.phone)
  )

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">📋</span>
          <h1 className="text-lg font-semibold text-gray-700">Liste des magasins</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/stores/new">
            <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-colors">
              <Plus size={16} />
            </button>
          </Link>
          <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors">
            <Info size={16} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-end">
          <input
            placeholder="Nom"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
          />
          <input
            placeholder="Email"
            value={search.email}
            onChange={(e) => setSearch({ ...search, email: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
          />
          <input
            placeholder="Téléphone"
            value={search.phone}
            onChange={(e) => setSearch({ ...search, phone: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-40"
          />
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-40 text-gray-500">
            <option value="">Zone de service</option>
            <option>Dakar</option>
            <option>Rufisque</option>
          </select>
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Search size={16} />
          </button>
          <button
            onClick={() => setSearch({ name: "", email: "", phone: "" })}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="p-3 border-b border-gray-50 text-right text-xs text-gray-400">
          Rechercher : <input className="border border-gray-200 rounded px-2 py-1 ml-1 text-xs w-32 focus:outline-none" />
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["N°", "Coordonnées", "Adresse", "URL de connexion", "Connexion directe", "Note", "Solde (FCFA)", "Action", "Statistiques commandes"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((store, i) => (
              <tr key={store.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">Nom : {store.name}</div>
                  <div className="text-gray-500 text-xs">Tél. : {store.phone}</div>
                  <div className="text-gray-400 text-xs">Email : {store.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">🏪</div>
                </td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1 bg-cyan-500 text-white text-xs rounded-lg hover:bg-cyan-600 transition-colors">
                    URL connexion
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="px-2 py-1 bg-cyan-500 text-white text-xs rounded hover:bg-cyan-600">Connexion</button>
                    <button className="px-2 py-1 bg-gray-400 text-white text-xs rounded text-[10px]">Incognito seul.</button>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{store.rating}</td>
                <td className="px-4 py-3 text-gray-700">{store.walletMoney.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <StatusBadge status={store.status} />
                    <button className="p-1 text-orange-500 hover:bg-orange-50 rounded"><DollarSign size={14} /></button>
                    <button className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit size={14} /></button>
                    <button className="p-1 text-green-500 hover:bg-green-50 rounded"><Eye size={14} /></button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    <BarChart2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 text-xs text-gray-400 border-t border-gray-50">
          Affichage de 1 à {filtered.length} sur {filtered.length} entrées
        </div>
      </div>
    </div>
  )
}

function DollarSign({ size }: { size: number }) {
  return <span style={{ fontSize: size }}>$</span>
}
