"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"

const mockSliders = [
  { id: 1, title: "Bienvenue sur NDUGUMi", image: "🖼️", link: "/stores", sequence: 1, status: "Active", createdAt: "2025-01-15" },
  { id: 2, title: "Produits Frais du Sénégal", image: "🖼️", link: "/categories", sequence: 2, status: "Active", createdAt: "2025-01-20" },
  { id: 3, title: "Livraison Rapide", image: "🖼️", link: null, sequence: 3, status: "Inactive", createdAt: "2025-02-01" },
]

export default function SliderPage() {
  const [sliders, setSliders] = useState(mockSliders)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span>🖼️</span>
          <h1 className="text-lg font-semibold text-gray-700">Slider Accueil</h1>
        </div>
        <button className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg">
          <Plus size={14} /> Add Banner
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {sliders.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center text-5xl">
              {s.image}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{s.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">Séquence : {s.sequence}</p>
                  {s.link && <p className="text-xs text-blue-500 mt-0.5">Lien : {s.link}</p>}
                </div>
                <StatusBadge status={s.status} />
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                <button className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"><Edit size={13} /></button>
                <button className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 size={13} /></button>
                <div className="ml-auto text-gray-300 cursor-grab"><GripVertical size={16} /></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["S.No", "Title", "Image", "Link", "Sequence", "Status", "Created At", "Action"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sliders.map((s, i) => (
              <tr key={s.id} className="hover:bg-gray-50/80">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{s.title}</td>
                <td className="px-4 py-3 text-2xl">{s.image}</td>
                <td className="px-4 py-3 text-xs text-blue-500">{s.link ?? "—"}</td>
                <td className="px-4 py-3 text-gray-700">{s.sequence}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3 text-xs text-gray-500">{s.createdAt}</td>
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
