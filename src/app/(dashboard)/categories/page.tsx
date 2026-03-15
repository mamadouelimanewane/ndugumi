"use client"

import { useState } from "react"
import { Plus, Download, Info, Search, RefreshCw, Edit, Trash2 } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"

const mockCategories = [
  { id: 1, segment: "Epicerie, Epicerie,", name: "Faire Votre Marché", parent: "None", status: "Active", sequence: 3, image: "🧺", createdAt: "2025-01-20" },
  { id: 2, segment: "Epicerie, Epicerie,", name: "Daily Essentials", parent: "Faire Votre Marché", status: "Active", sequence: 3, image: "🧙", createdAt: "2025-01-20" },
  { id: 3, segment: "Epicerie, Epicerie,", name: "Prêt à cuisiner", parent: "None", status: "Active", sequence: 2, image: "🍱", createdAt: "2025-01-23" },
  { id: 4, segment: "Epicerie, Epicerie,", name: "Produits Halieutiques", parent: "None", status: "Active", sequence: 5, image: "🦀", createdAt: "2025-01-24" },
  { id: 5, segment: "Epicerie, Epicerie,", name: "Viande", parent: "None", status: "Active", sequence: 4, image: "🥩", createdAt: "2025-01-24" },
  { id: 6, segment: "Epicerie, Epicerie,", name: "Panier Ndougou Légumes", parent: "None", status: "Inactive", sequence: 3, image: "🦐", createdAt: "2025-01-24" },
  { id: 7, segment: "Epicerie, Epicerie,", name: "Poisson", parent: "None", status: "Active", sequence: 3, image: "🐟", createdAt: "2025-01-27" },
  { id: 8, segment: "Epicerie, Epicerie,", name: "Epices", parent: "None", status: "Active", sequence: 6, image: "🌶️", createdAt: "2025-01-27" },
  { id: 9, segment: "Epicerie, Epicerie,", name: "Céréales", parent: "None", status: "Active", sequence: 7, image: "🌾", createdAt: "2025-02-27" },
  { id: 10, segment: "Epicerie, Epicerie,", name: "Pêche du jour", parent: "Poisson", status: "Active", sequence: 2, image: "🐠", createdAt: "2025-03-21" },
]

export default function CategoriesPage() {
  const [search, setSearch] = useState("")

  const filtered = mockCategories.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span>📋</span>
          <h1 className="text-lg font-semibold text-gray-700">Catégories</h1>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center"><Download size={16} /></button>
          <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center"><Plus size={16} /></button>
          <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center"><Info size={16} /></button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <div className="flex gap-3">
          <input
            placeholder="Catégorie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-64"
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"><Search size={16} /></button>
          <button onClick={() => setSearch("")} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><RefreshCw size={16} /></button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="p-3 border-b border-gray-50 flex justify-end items-center gap-2 text-xs text-gray-400">
          Rechercher : <input className="border border-gray-200 rounded px-2 py-1 ml-1 text-xs w-32 focus:outline-none" />
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["N°", "Segment", "Nom", "Catégorie parente", "Statut", "Ordre", "Image", "Créé le", "Action"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((cat, i) => (
              <tr key={cat.id} className="hover:bg-gray-50/80">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{cat.segment}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{cat.name}</td>
                <td className="px-4 py-3 text-gray-500">{cat.parent}</td>
                <td className="px-4 py-3"><StatusBadge status={cat.status} /></td>
                <td className="px-4 py-3 text-gray-700">{cat.sequence}</td>
                <td className="px-4 py-3 text-2xl">{cat.image}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{cat.createdAt}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"><Edit size={12} /></button>
                    <button className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 text-xs text-gray-400 border-t">Affichage de 1 à {filtered.length} sur {mockCategories.length} entrées</div>
      </div>
    </div>
  )
}
