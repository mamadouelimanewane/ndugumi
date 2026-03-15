"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"

const mockCountries = [
  { id: 1, name: "Senegal", code: "SN", flag: "🇸🇳", status: "Active", createdAt: "2025-01-01" },
  { id: 2, name: "France", code: "FR", flag: "🇫🇷", status: "Active", createdAt: "2025-01-01" },
  { id: 3, name: "Côte d'Ivoire", code: "CI", flag: "🇨🇮", status: "Active", createdAt: "2025-06-01" },
]

export default function CountriesPage() {
  const [countries] = useState(mockCountries)
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-gray-700 flex items-center gap-2"><span>🌍</span> Pays</h1>
        <button className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg"><Plus size={14} /> Ajouter un pays</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{["N°", "Drapeau", "Nom", "Code", "Statut", "Créé le", "Action"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {countries.map((c, i) => (
              <tr key={c.id} className="hover:bg-gray-50/80">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 text-2xl">{c.flag}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-3 font-mono text-gray-600">{c.code}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3 text-xs text-gray-500">{c.createdAt}</td>
                <td className="px-4 py-3 flex gap-1">
                  <button className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"><Edit size={12} /></button>
                  <button className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 size={12} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
